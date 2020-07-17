import Axios from 'axios';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { DialogType } from 'src/components/Dialog';
import { Error, Form, Input } from 'src/components/Form';
import { Heading1 } from 'src/components/Heading';
import Icon from 'src/components/Icon';
import { useAuth } from 'src/contexts/AuthProvider';
import DialogProvider, { DialogConsumer } from 'src/contexts/DialogContext';
import { getErrorMessage } from 'src/utils/api';
import Button from '../src/components/Button';
import Link from '../src/components/Link';
import MediaObject from '../src/components/MediaObject';
import PageTitle from '../src/components/PageTitle';
import AuthLayout from '../src/layouts/AuthLayout';

interface Form {
  password: string;
  passwordConfirmation: string;
}

function ResetPassword() {
  const { query, push } = useRouter();
  const { code } = query;

  if (!code) {
    push('/log-in');
    return null;
  }

  const { redirectToApp, storeAuthPayload } = useAuth();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const {
    register, handleSubmit, errors, watch,
  } = useForm<Form>();
  const watchPassword = watch('password');
  const onSubmit = (setDialog) => handleSubmit(async ({ password, passwordConfirmation }) => {
    setSubmitting(true);

    try {
      const { data } = await Axios.post('/auth/reset-password', {
        code,
        password,
        passwordConfirmation,
      });
      storeAuthPayload(data);
      redirectToApp();
    } catch (error) {
      setDialog({
        type: DialogType.Error,
        message: getErrorMessage(error),
      });
      setSubmitting(false);
    }
  });

  return (
    <AuthLayout aside={(
      <MediaObject
        src="/images/auth/design4.jpg"
        alt="Modulo Rebouças"
      >
        <p>Modulo Rebouças</p>
        <Link
          href="https://www.archdaily.com/793637/reboucas-office-building-dal-pian-arquitetos"
          external
        >
          <Icon name="share" /> Dal Pian Arquitetos
        </Link>
      </MediaObject>
    )}
    >
      <PageTitle>Reset Password</PageTitle>
      <Heading1>
        Reset Password
      </Heading1>
      <DialogProvider>
        <p>
          Please enter a new password for your <b>CAD</b>teams account:
        </p>
        <DialogConsumer>
          {({ setDialog }) => (
            <Form onSubmit={onSubmit(setDialog)}>
              <Input
                label="New password:"
                placeholder="y0urPa55w0rd"
                id="password"
                type="password"
                autoComplete="new-password"
                ref={register({
                  required: 'Please enter a password.',
                  validate: (value) => (
                    !value.match(/^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*)$/)
                    || `A valid password is at least 8 characters long, and consists of lowercase
              letters, uppercase letter(s), and number(s).`
                  ),
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
              <Button disabled={submitting} type="submit" block>
                {submitting ? 'Processing...' : 'Reset password'}
              </Button>
            </Form>
          )}
        </DialogConsumer>
      </DialogProvider>
    </AuthLayout>
  );
}

export default dynamic(() => Promise.resolve(ResetPassword), { ssr: false });
