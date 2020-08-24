import React, { useState } from 'react';
import { LogOnMount } from 'react-amplitude-hooks';
import { useForm } from 'react-hook-form';
import Button from 'src/components/Button';
import Dialog, { DialogProps, DialogType } from 'src/components/Dialog';
import { Error, Form, Input } from 'src/components/Form';
import Checkbox from 'src/components/Form/Checkbox';
import { Heading1, Heading2 } from 'src/components/Heading';
import PageTitle from 'src/components/PageTitle';
import { useAuth } from 'src/contexts/AuthProvider';
import { getErrorMessage } from 'src/utils/api';
import styles from './settings.module.scss';

interface NotificationsForm {
  notifications: Notification[];
}

function Notifications() {
  const { user, updateUser } = useAuth();
  const { register, handleSubmit } = useForm<NotificationsForm>();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [dialog, setDialog] = useState<DialogProps>(null);
  const onSubmit = handleSubmit(async (values) => {
    setSubmitting(true);

    try {
      await updateUser(values);
      setDialog({
        type: DialogType.Success,
        children: 'Your notification preferences have been updated.',
      });
    } catch (error) {
      setDialog({
        type: DialogType.Error,
        children: getErrorMessage(error),
      });
    }

    setSubmitting(false);
  });

  return (
    <section>
      <Heading2>Notifications</Heading2>
      {dialog && <Dialog {...dialog} />}
      <p>I wish to receive e-mail notifications regarding:</p>
      <Form onSubmit={onSubmit}>
        <Checkbox
          id="notifications[0].email"
          ref={register}
          defaultChecked={user?.notifications[0]?.email ?? true}
        >
          Connection invites (receiving, accepting)
        </Checkbox>
        <input type="hidden" name="notifications[0].type" value="connection" ref={register} />
        <Button loading={submitting} type="submit" block>
          {submitting ? 'Processing...' : 'Submit'}
        </Button>
      </Form>
    </section>
  );
}

interface ChangePasswordForm {
  currentPassword: string;
  password: string;
  passwordConfirmation: string;
}

function ChangePassword() {
  const {
    register, handleSubmit, errors, watch, reset,
  } = useForm<ChangePasswordForm>();
  const { updateUser } = useAuth();
  const watchPassword = watch('password');
  const validatePassword = (value) => (
    !value.match(/^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*)$/)
    || `A valid password is at least 8 characters long, and consists of lowercase letters, uppercase
    letter(s), and number(s).`
  );
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [dialog, setDialog] = useState<DialogProps>(null);
  const onSubmit = handleSubmit(async (values) => {
    setSubmitting(true);

    try {
      await updateUser(values);
      setDialog({
        type: DialogType.Success,
        children: 'Your password has been updated.',
      });
    } catch (error) {
      setDialog({
        type: DialogType.Error,
        children: getErrorMessage(error),
      });
    }

    reset();
    setSubmitting(false);
  });

  return (
    <section>
      <Heading2>Change Password</Heading2>
      {dialog && <Dialog {...dialog} />}
      <Form onSubmit={onSubmit}>
        <Input
          label="Current password:"
          placeholder="y0urPa55w0rd"
          id="currentPassword"
          type="password"
          autoComplete="current-password"
          ref={register({
            required: 'Please enter your current password.',
          })}
        />
        <Error errors={errors} name="currentPassword" />
        <Input
          label="New password:"
          placeholder="y0urPa55w0rd"
          id="password"
          type="password"
          autoComplete="new-password"
          ref={register({
            required: 'Please enter a password.',
            validate: validatePassword,
          })}
        />
        <Error errors={errors} name="password" />
        <Input
          label="Confirm new password:"
          placeholder="y0urPa55w0rd"
          id="passwordConfirmation"
          type="password"
          autoComplete="new-password"
          ref={register({
            required: 'Please confirm your new password.',
            validate: (value) => (
              value === watchPassword || 'Please re-enter your new password.'
            ),
          })}
        />
        <Error errors={errors} name="passwordConfirmation" />
        <Button loading={submitting} type="submit" block>
          {submitting ? 'Processing...' : 'Change password'}
        </Button>
      </Form>
    </section>
  );
}

export default function SettingsPage() {
  const { user } = useAuth();
  return (
    <main>
      <LogOnMount eventType="view page" />
      <PageTitle>Settings</PageTitle>
      <Heading1>Settings</Heading1>
      <div className={styles.wrapper}>
        {user?.provider === 'local' && <ChangePassword />}
        <Notifications />
      </div>
    </main>
  );
}
