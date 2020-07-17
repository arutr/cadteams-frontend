import Axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { LoginForm } from 'src/api/Auth';
import { DialogType } from 'src/components/Dialog';
import { Error, Form, Input } from 'src/components/Form';
import { Heading1 } from 'src/components/Heading';
import Icon from 'src/components/Icon';
import DialogProvider, { DialogConsumer } from 'src/contexts/DialogContext';
import { getErrorMessage } from 'src/utils/api';
import Button from '../src/components/Button';
import Link from '../src/components/Link';
import MediaObject from '../src/components/MediaObject';
import PageTitle from '../src/components/PageTitle';
import AuthLayout from '../src/layouts/AuthLayout';

function ForgotPassword() {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const { register, handleSubmit, errors } = useForm<LoginForm>();
  const onSubmit = (setDialog) => handleSubmit(async ({ email }) => {
    setSubmitting(true);

    try {
      await Axios.post('/auth/forgot-password', {
        email,
      });
      setDialog({
        type: DialogType.Success,
        message: (
          <>
            Password reset form has been sent to the e-mail address provided.
          </>
        ),
      });
    } catch (error) {
      setDialog({
        type: DialogType.Error,
        message: getErrorMessage(error),
      });
    }

    setSubmitting(false);
  });

  return (
    <AuthLayout aside={(
      <MediaObject
        src="/images/auth/design3.jpg"
        alt="AIRBUS Spain Central Offices"
        height="75vh"
      >
        <p>AIRBUS Spain Central Offices</p>
        <Link
          href="https://www.archdaily.com/796896/central-offices-airbus-spain-pablo-notari-oviedo-plus-sumar-urbanismo-plus-arquitectura-conurma-ingenieros-consultores"
          external
        >
          <Icon name="share" /> Pablo Notari Oviedo / CONURMA / SUMAR
        </Link>
      </MediaObject>
    )}
    >
      <PageTitle>Forgot Password</PageTitle>
      <Heading1>
        Forgot Password
      </Heading1>
      <DialogProvider>
        <p>
          If you have forgotten the password to your <b>CAD</b>teams account, please enter the
          e-mail address used to register the account:
        </p>
        <DialogConsumer>
          {({ setDialog }) => (
            <Form onSubmit={onSubmit(setDialog)}>
              <Input
                label="E-mail Address:"
                placeholder="your@email.com"
                id="email"
                type="email"
                autoComplete="username"
                ref={register({ required: 'Please enter your e-mail address.' })}
              />
              <Error errors={errors} name="email" />
              <Button disabled={submitting} type="submit" block>
                {submitting ? 'Processing...' : 'Submit'}
              </Button>
            </Form>
          )}
        </DialogConsumer>
      </DialogProvider>
    </AuthLayout>
  );
}

export default ForgotPassword;
