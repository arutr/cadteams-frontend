import classNames from 'classnames';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Error, Fieldset, Form } from 'src/components/Form';
import { Heading2 } from 'src/components/Heading';
import Icon from 'src/components/Icon';
import Label from 'src/components/Label';
import Link from 'src/components/Link';
import { EditableInput, Placeholder } from 'src/components/Portfolio/Editable';
import EditButton from 'src/components/Portfolio/EditButton';
import { PortfolioProps } from 'src/components/Portfolio/index';
import styles from 'src/components/Portfolio/Portfolio.module.scss';
import ProfileUpdateProvider from 'src/contexts/ProfileUpdateContext';
import validator from 'validator';

interface FormValues {
  phone: string;
  contactEmail: string;
}

function ContactInformation({ user }: PortfolioProps) {
  const { register, errors } = useFormContext<FormValues>();

  return (
    <section className={classNames(
      styles.card,
      styles.contactInformation,
      styles.chin,
    )}
    >
      <Heading2 bold condensed marginTop="0">Contact Information</Heading2>
      {user?.type === 'individual' && (
        <p className={styles.disclaimer}>
          These details will be shared with companies registered on <b>CAD</b>teams who may wish to
          get in touch with you.
        </p>
      )}
      {user?.type === 'enterprise' && (
        <p className={styles.disclaimer}>
          These details will be shared with <b>CAD</b>teams members present in
          <Link href="/app/contacts"><Icon large name="handshake" /> Contacts</Link>.
        </p>
      )}
      <Form>
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
                || validator.isMobilePhone(value, 'any', { strictMode: true })
                || 'Please enter a valid phone number, including the country code (e.g. +44)'
              ),
            })}
          >
            <Placeholder
              isProfile
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
              isProfile
              publicValue="No e-mail address specified"
              profileValue="Contact e-mail address"
              value={<a href={`mailto:${user?.contactEmail}`}>{user?.contactEmail}</a>}
            />
          </EditableInput>
          <Error className={styles.error} filler={false} errors={errors} name="contactEmail" />
        </Fieldset>
      </Form>
      <EditButton bottom />
    </section>
  );
}

export default function (props: PortfolioProps) {
  return (
    <ProfileUpdateProvider>
      <ContactInformation {...props} />
    </ProfileUpdateProvider>
  );
}
