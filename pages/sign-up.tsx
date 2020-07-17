import React, { useState } from 'react';
import { useAmplitude } from 'react-amplitude-hooks';
import { useForm } from 'react-hook-form';
import { RegistrationForm } from 'src/api/Auth';
import Dialog, { DialogType } from 'src/components/Dialog';
import {
  Checkbox, Error, Form, Input, Radio,
} from 'src/components/Form';
import { Heading1 } from 'src/components/Heading';
import Icon from 'src/components/Icon';
import { FacebookLoginButton } from 'src/components/SocialLogin';
import { useAuth } from 'src/contexts/AuthProvider';
import { getErrorMessage } from 'src/utils/api';
import Button from '../src/components/Button';
import Link from '../src/components/Link';
import MediaObject from '../src/components/MediaObject';
import PageTitle from '../src/components/PageTitle';
import AuthLayout from '../src/layouts/AuthLayout';
import authStyles from '../src/layouts/AuthLayout.module.scss';
import styles from './sign-up.module.scss';

function SignUp() {
  const { logEvent } = useAmplitude();
  const [serverError, setServerError] = useState<string>();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const {
    register, handleSubmit, errors, watch,
  } = useForm<RegistrationForm>();
  const watchType = watch('type', 'individual');
  const { handleSocialLogin, registerAccount, redirectToApp } = useAuth();

  const onSubmit = handleSubmit(async (values) => {
    setServerError(null);
    setSubmitting(true);

    try {
      await registerAccount(values);
      logEvent('sign up', {
        provider: 'local',
      }, async () => {
        await redirectToApp();
      });
    } catch (error) {
      setServerError(getErrorMessage(error));
      setSubmitting(false);
    }
  });
  const onSocialLogin = async (data) => {
    try {
      await handleSocialLogin(data);
      logEvent('sign up', {
        provider: data.provider,
      }, async () => {
        await redirectToApp();
      });
    } catch (error) {
      setServerError(getErrorMessage(error));
    }
  };

  return (
    <AuthLayout aside={(
      <MediaObject
        src="/images/auth/design1.jpg"
        alt="Weill Cornell Medical College Belfer Research Building"
        height="75vh"
      >
        <p>Weill Cornell Medical College Belfer Research Building</p>
        <Link
          href="https://www.archdaily.com/480963/weill-cornell-medical-college-ennead-architects"
          external
        >
          <Icon name="share" /> Todd Schliemann / Ennead Architects
        </Link>
      </MediaObject>
    )}
    >
      <PageTitle>Sign Up</PageTitle>
      <Heading1>
        Join <b>CAD</b>teams
      </Heading1>
      <p>
        Register an account on <b>CAD</b>teams to explore the best of what the top talented
        BIM/CAD specialists have to offer.
      </p>
      <Form onSubmit={onSubmit}>
        {serverError && (
          <Dialog type={DialogType.Error}>{serverError}</Dialog>
        )}
        <Radio id="type" labels={['Individual', 'Enterprise']} legend="I am an..." ref={register} />
        <Input
          label="Full Name:"
          placeholder="John Smith"
          id="username"
          ref={register({
            required: 'Please enter a name.',
            minLength: {
              value: 2,
              message: 'Please enter a name.',
            },
            pattern: {
              value: /^([a-zA-Z-'/&]+ *)+$/,
              message: 'Please enter a valid name.',
            },
          })}
        />
        <Error errors={errors} name="username" />
        {watchType === 'enterprise' && (
          <>
            <Input
              label="Company:"
              placeholder="CADteams Ltd"
              id="company"
              ref={register({
                required: 'Please enter a company name.',
                minLength: {
                  value: 2,
                  message: 'Please enter a company name.',
                },
                pattern: {
                  value: /^([a-zA-Z0-9-'/&]+ *)+$/,
                  message: 'Please enter a valid company name.',
                },
              })}
            />
            <Error errors={errors} name="company" />
          </>
        )}
        <Input
          label="E-mail Address:"
          placeholder="your@email.com"
          id="email"
          type="email"
          autoComplete="username"
          ref={register({ required: 'Please enter an e-mail address.' })}
        />
        <Error errors={errors} name="email" />
        <Input
          label="Password:"
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
        <Checkbox className={styles.newsletter} id="newsletter" ref={register}>
          <strong>Yes!</strong> Sign me up to <b>CAD</b>teams Magazine to hear about latest news
          and offers from <b>CAD</b>teams (optional).
        </Checkbox>
        <p>
          By signing up, you accept <b>CAD</b>teams&nbsp;
          <Link external href="/terms-and-conditions.pdf">
            Terms and Conditions
          </Link>
          &nbsp;and acknowledge the&nbsp;
          <Link external href="/terms-and-conditions.pdf">
            Privacy Policy
          </Link>.
        </p>
        <Button disabled={submitting} type="submit" block>
          {submitting ? 'Processing...' : 'Create a free account'}
        </Button>
      </Form>
      {watchType === 'individual' && (
        <>
          <div className={authStyles.separator}>
            <hr />
            <strong>OR</strong>
            <hr />
          </div>
          <FacebookLoginButton
            provider="facebook"
            appId={process.env.FACEBOOK_APP_ID}
            onLoginSuccess={onSocialLogin}
            onLoginFailure={() => setServerError(`Social media authentication failed. Refresh the
          page to try again.`)}
            scope="public_profile,email"
          />
        </>
      )}
    </AuthLayout>
  );
}

export default SignUp;
