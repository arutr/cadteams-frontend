import classNames from 'classnames';
import React, { useState } from 'react';
import { useAmplitude } from 'react-amplitude-hooks';
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
      {isProfile && <EditButton bottom />}
    </form>
  );
}

interface ContactInformationFormValues {
  phone: string;
}

function ContactInformationForm({ isProfile, user }: PortfolioSectionProps) {
  const { instrument } = useAmplitude((inheritedProps) => ({
    portfolio: {
      ...inheritedProps.portfolio,
      email: !!user?.contactEmail,
      phone: !!user?.phone,
    },
  }));
  const [revealed, setRevealed] = useState<boolean>(isProfile);
  const { register, errors } = useFormContext<ContactInformationFormValues>();

  return (
    <>
      {isProfile && user?.type === 'individual' && (
        <p className={styles.disclaimer}>
          These details will be shared with companies registered on <b>CAD</b>teams who may wish to
          get in touch with you.
        </p>
      )}
      {isProfile && user?.type === 'enterprise' && (
        <p className={styles.disclaimer}>
          These details will be shared with <b>CAD</b>teams members present in
          <Link href="/app/contacts" disabled><Icon large name="handshake" /> Contacts</Link>
          <Label className={styles['coming-soon']} small>Coming soon</Label>.
        </p>
      )}
      {!isProfile && revealed && (
        <p className={styles.disclaimer}>
          You can get in touch with <strong>{user?.username}</strong> via:
        </p>
      )}
      <Form>
        {revealed ? (
          <>
            <Fieldset className={styles.fieldset}>
              <Icon className={styles.icon} large name="phone" title="Phone number" />
              <EditableInput
                defaultValue={user?.phone}
                placeholder="+441234567890"
                name="phone"
                type="tel"
                ref={register({
                  validate: (value) => (
                    !value.length
                    || validator.isMobilePhone(value)
                    || 'Please enter a valid phone number.'
                  ),
                })}
              >
                <Placeholder
                  isProfile={isProfile}
                  publicValue="N/A"
                  profileValue="Contact phone number"
                  value={<a href={`tel:${user?.phone}`}>{user?.phone}</a>}
                />
              </EditableInput>
              <Error className={styles.error} filler={false} errors={errors} name="phone" />
            </Fieldset>
            <Fieldset className={styles.fieldset}>
              <Icon className={styles.icon} large name="email" title="E-mail address" />
              <EditableInput
                defaultValue={user?.contactEmail}
                placeholder="your@email.com"
                name="contactEmail"
                type="email"
                ref={register({
                  validate: (value) => (
                    !value.length
                    || validator.isEmail(value)
                    || 'Please enter a valid e-mail address.'
                  ),
                })}
              >
                <Placeholder
                  isProfile={isProfile}
                  publicValue="N/A"
                  profileValue="Contact e-mail address"
                  value={<a href={`mailto:${user?.contactEmail}`}>{user?.contactEmail}</a>}
                />
              </EditableInput>
              <Error className={styles.error} filler={false} errors={errors} name="contactEmail" />
            </Fieldset>
          </>
        ) : (
          <>
            <p className={styles.disclaimer}>
              Get in touch with {getFirstName(user?.username)} if you wish to discuss this
              portfolio further!
            </p>
            <Button
              onClick={instrument('reveal contact information', () => setRevealed(true))}
              block
            >
              <Icon name="view" /> Reveal Contact Information
            </Button>
          </>
        )}
      </Form>
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
          <Heading2 bold condensed marginTop={0}>
            {isProfile ? 'Contact Information' : 'Like what you\'re seeing?'}
          </Heading2>
          <ContactInformationForm {...props} />
          {isProfile && <EditButton bottom />}
        </section>
      </ProfileUpdateProvider>
    </footer>
  );
}
