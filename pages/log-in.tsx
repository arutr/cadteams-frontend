import classNames from 'classnames';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import NextLink from 'next/link';
import { LoginForm } from '../src/api/Auth';
import { useAuth } from '../src/components/AuthProvider';
import Button, { AnchorButton } from '../src/components/Button';
import { Error, Input } from '../src/components/Form';
import { Heading1 } from '../src/components/Heading';
import Link from '../src/components/Link';
import MediaObject from '../src/components/MediaObject';
import PageTitle from '../src/components/PageTitle';
import { FacebookLoginButton } from '../src/components/SocialLogin';
import AuthLayout from '../src/layouts/AuthLayout';
import styles from '../src/layouts/AuthLayout.module.scss';

function LogIn() {
  const [serverError, setServerError] = useState<string>();
  const {
    register, handleSubmit, errors,
  } = useForm<LoginForm>();

  const { handleSocialLogin, logIn, redirectToApp } = useAuth();
  const onSubmit = handleSubmit(async (values) => {
    setServerError(null);
    try {
      await logIn(values).then(redirectToApp);
    } catch (error) {
      if (error.response) {
        setServerError(error.response?.data?.message[0]?.messages[0]?.message);
      } else {
        setServerError('Unknown error has occurred. Please refresh the page.');
      }
    }
  });

  return (
    <AuthLayout aside={(
      <MediaObject
        src="/images/auth/design2.jpg"
        alt="Pont de Sèvres Towers"
        height="75vh"
      >
        <p>Pont de Sèvres Towers</p>
        <Link
          icon="share"
          href="https://www.archdaily.com/224252/citylights-dominique-perrault-architecture"
          external
        >
          Citylights / Dominique Perrault Architecture
        </Link>
      </MediaObject>
    )}
    >
      <PageTitle>Log In</PageTitle>
      <Heading1 marginBottom="0">
        Log In
      </Heading1>
      <form onSubmit={onSubmit}>
        {serverError && (
          <div className={classNames(styles.error, 'icon icon__white icon__error')}>
            {serverError}
          </div>
        )}
        <Input
          label="E-mail Address:"
          placeholder="your@email.com"
          id="email"
          type="email"
          ref={register({ required: 'Please enter your e-mail address.' })}
        />
        <Error errors={errors} name="email" />
        <Input
          label="Password:"
          placeholder="y0urPa55w0rd"
          id="password"
          type="password"
          ref={register({ required: 'Please enter a password.' })}
        />
        <Error errors={errors} name="password" />
        <Link external as="a" href="mailto:hello@cadteams.com">Forgot your password?</Link>
        <Button type="submit" block>Submit</Button>
      </form>
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
      <div style={{ marginTop: 'auto' }}>
        <p>Haven&apos;t registered a <b>CAD</b>teams account yet?</p>
        <p>Create one now, <strong>it&apos;s free</strong>!</p>
        <NextLink href="/sign-up" passHref>
          <AnchorButton block>Create a free account</AnchorButton>
        </NextLink>
      </div>
    </AuthLayout>
  );
}

export default LogIn;

/*
<GoogleLoginButton
  provider="google"
  appId={process.env.GOOGLE_CLIENT_ID}
  onLoginSuccess={(data) => handleSocialLogin(data, setServerError)}
  onLoginFailure={setServerError}
/>
 */
