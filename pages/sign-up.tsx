import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Dialog from 'src/components/Dialog';
import Icon from 'src/components/Icon';
import { RegistrationForm } from 'src/api/Auth';
import { useAuth } from 'src/contexts/AuthProvider';
import { Heading1 } from 'src/components/Heading';
import {
  Checkbox, Error, Form, Input, Radio,
} from 'src/components/Form';
import { FacebookLoginButton } from 'src/components/SocialLogin';
import PageTitle from '../src/components/PageTitle';
import MediaObject from '../src/components/MediaObject';
import Link from '../src/components/Link';
import Button from '../src/components/Button';
import AuthLayout from '../src/layouts/AuthLayout';
import styles from '../src/layouts/AuthLayout.module.scss';

function SignUp() {
  const [serverError, setServerError] = useState<string>();
  const {
    register, handleSubmit, errors, watch,
  } = useForm<RegistrationForm>();
  const watchType = watch('type', 'individual');
  const { handleSocialLogin, registerAccount, redirectToApp } = useAuth();

  const onSubmit = handleSubmit(async (values) => {
    setServerError(null);
    try {
      await registerAccount(values).then(redirectToApp);
    } catch (error) {
      const message = error.response?.data?.message?.[0]?.messages?.[0]?.message
        || 'Unknown error has occurred. Please refresh the page.';
      setServerError(message);
    }
  });

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
          <Dialog type="error">{serverError}</Dialog>
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
        <Checkbox id="newsletter" ref={register}>
          <strong>Yes!</strong> Sign me up to <b>CAD</b>teams Magazine to hear about latest news
          and offers from <b>CAD</b>teams.
        </Checkbox>
        <p>
          By signing up, I accept the <b>CAD</b>teams&nbsp;
          <Link
            external
            href="https://drive.google.com/uc?id=1MuNKTTASbRC7NhVGxbMNxtwDDdhxrOe9"
          >
            Terms and Conditions
          </Link>
          &nbsp;and acknowledge the&nbsp;
          <Link
            external
            href="https://drive.google.com/uc?id=1MuNKTTASbRC7NhVGxbMNxtwDDdhxrOe9"
          >
            Privacy Policy
          </Link>.
        </p>
        <Button type="submit" block>Create a free account</Button>
      </Form>
      {watchType === 'individual' && (
        <>
          <div className={styles.separator}>
            <hr />
            <strong>OR</strong>
            <hr />
          </div>
          <FacebookLoginButton
            provider="facebook"
            appId={process.env.FACEBOOK_APP_ID}
            onLoginSuccess={(data) => handleSocialLogin(data, setServerError)}
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
