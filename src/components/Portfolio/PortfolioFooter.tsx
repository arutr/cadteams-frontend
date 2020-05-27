import classNames from 'classnames';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Error } from 'src/components/Form';
import { Heading2 } from 'src/components/Heading';
import Icon from 'src/components/Icon';
import { EditableInput, EditableTextArea, Placeholder } from 'src/components/Portfolio/Editable';
import EditButton from 'src/components/Portfolio/EditButton';
import { PortfolioSectionProps } from 'src/components/Portfolio/index';
import styles from 'src/components/Portfolio/Portfolio.module.scss';
import ProfileUpdateProvider from 'src/contexts/ProfileUpdateContext';
import validator from 'validator';

interface DescriptionUpdateFormValues {
  description: string;
}

function DescriptionUpdateForm({ isProfile, user }: PortfolioSectionProps) {
  const { register } = useFormContext<DescriptionUpdateFormValues>();
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

function ContactInformationForm({ isProfile, user }: PortfolioSectionProps) {
  const { register, errors } = useFormContext<ContactInformationFormValues>();

  return (
    <>
      <p>
        These details will be shared with other <b>CAD</b>teams members.
      </p>
      <form>
        <Icon className={styles.icon} large name="phone" title="Phone number" />
        <EditableInput
          defaultValue={user?.phone}
          placeholder="+44 1234 567890"
          name="phone"
          type="tel"
          ref={register({
            validate: (value) => (
              !value.length
              || validator.isMobilePhone(value, 'en-GB')
              || 'Please enter a valid UK phone number.'
            ),
          })}
        >
          <Placeholder
            isProfile={isProfile}
            publicValue=""
            profileValue="Contact phone number"
            value={<a href={`tel:${user?.phone}`}>{user?.phone}</a>}
          />
        </EditableInput>
        <Error className={styles.error} filler={false} errors={errors} name="phone" />
      </form>
    </>
  );
}

export default function PortfolioFooter(props: PortfolioSectionProps) {
  const { setDialog, isProfile } = props;

  return (
    <footer className={styles.row}>
      <ProfileUpdateProvider<DescriptionUpdateFormValues> setDialog={setDialog}>
        <DescriptionUpdateForm {...props} />
      </ProfileUpdateProvider>
      <ProfileUpdateProvider<ContactInformationFormValues> setDialog={setDialog}>
        <section className={classNames(styles.card, styles['contact-information'])}>
          <Heading2 bold condensed marginTop={0}>Contact Information</Heading2>
          {isProfile && (
            <>
              <EditButton />
              <ContactInformationForm {...props} />
            </>
          )}
        </section>
      </ProfileUpdateProvider>
    </footer>
  );
}
