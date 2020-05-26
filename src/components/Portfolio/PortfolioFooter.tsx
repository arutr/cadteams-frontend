import classNames from 'classnames';
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import Button from 'src/components/Button';
import { Error, Input } from 'src/components/Form';
import { Heading2 } from 'src/components/Heading';
import Icon from 'src/components/Icon';
import { EditableTextArea, Placeholder } from 'src/components/Portfolio/Editable';
import EditButton from 'src/components/Portfolio/EditButton';
import { PortfolioSectionProps } from 'src/components/Portfolio/index';
import styles from 'src/components/Portfolio/Portfolio.module.scss';
import { useAuth } from 'src/contexts/AuthProvider';
import ProfileUpdateProvider from 'src/contexts/ProfileUpdateContext';

interface UpdateFormValues {
  description: string;
}

function DescriptionUpdateForm({ isProfile, user }: PortfolioSectionProps) {
  const { register } = useFormContext<UpdateFormValues>();
  const placeholder = `A short description of your ${user?.type === 'individual'
    ? 'professional experience'
    : 'company'}.`;

  return (
    <form className={styles.card}>
      <Heading2 bold condensed marginTop={0}>
        About {user?.type === 'individual' ? 'Yourself' : 'Your Company'}
      </Heading2>
      {isProfile && <EditButton />}
      <p style={{ flex: 1 }}>
        <EditableTextArea
          defaultValue={user?.description}
          placeholder={placeholder}
          name="description"
          ref={register}
        >
          <Placeholder
            isProfile={isProfile}
            publicValue="N/A"
            profileValue={placeholder}
            value={user?.description}
          />
        </EditableTextArea>
      </p>
    </form>
  );
}

interface ContactInformationFormValues {
  phone: string;
}

function ContactInformationForm({ user, setDialog }: PortfolioSectionProps) {
  const { updateUser } = useAuth();
  const { register, errors, handleSubmit } = useFormContext<ContactInformationFormValues>();
  const onSubmit = handleSubmit((values) => {
    setDialog(null);
    updateUser(values).catch((error) => {
      setDialog({
        type: 'error',
        message: `An unexpected error has occurred whilst updating contact information. Please try
        again later.`,
      });

      if (PHASE_DEVELOPMENT_SERVER) {
        throw error;
      }
    });
  });

  return (
    <>
      <p>
        These details will be shared with other <b>CAD</b>teams members.
      </p>
      <form onSubmit={onSubmit}>
        <Input
          className={styles.fieldset}
          label={<Icon large name="phone" title="Phone number" />}
          defaultValue={user?.phone}
          placeholder="+44 1234 567890"
          id="phone"
          type="tel"
          ref={register({
            minLength: {
              value: 11,
              message: 'Please enter a valid UK phone number.',
            },
            maxLength: {
              value: 13,
              message: 'Please enter a valid UK phone number.',
            },
          })}
        />
        <Error className={styles.error} filler={false} errors={errors} name="phone" />
        <Button block>Update</Button>
      </form>
    </>
  );
}

export default function PortfolioFooter(props: PortfolioSectionProps) {
  const { setDialog, isProfile } = props;

  return (
    <ProfileUpdateProvider<UpdateFormValues> setDialog={setDialog}>
      <footer className={styles.row}>
        <DescriptionUpdateForm {...props} />
        <section className={classNames(styles.card, styles['contact-information'])}>
          <Heading2 bold condensed marginTop={0}>Contact Information</Heading2>
          {isProfile && <ContactInformationForm {...props} />}
        </section>
      </footer>
    </ProfileUpdateProvider>
  );
}
