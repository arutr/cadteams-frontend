import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import NextLink from 'next/link';
import { LoginForm } from 'src/api/Auth';
import Dialog from 'src/components/Dialog';
import Icon from 'src/components/Icon';
import { useAuth } from 'src/contexts/AuthProvider';
import { Error, Form, Input } from 'src/components/Form';
import { Heading1 } from 'src/components/Heading';
import { FacebookLoginButton } from 'src/components/SocialLogin';
import Button, { AnchorButton } from '../src/components/Button';
import Link from '../src/components/Link';
import MediaObject from '../src/components/MediaObject';
import PageTitle from '../src/components/PageTitle';
import AuthLayout from '../src/layouts/AuthLayout';
import styles from '../src/layouts/AuthLayout.module.scss';

function LogIn() {
  const [serverError, setServerError] = useState<string>();
  const { register, handleSubmit, errors } = useForm<LoginForm>();
  const { handleSocialLogin, logIn, redirectToApp } = useAuth();
  const onSubmit = handleSubmit(async (values) => {
    setServerError(null);
    try {
      await logIn(values).then(redirectToApp);
    } catch (error) {
      if (error.response?.data?.message[0]?.messages) {
        setServerError(error.response.data.message[0]?.messages[0]?.message);
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
          href="https://www.archdaily.com/224252/citylights-dominique-perrault-architecture"
          external
        >
          <Icon name="share" /> Citylights / Dominique Perrault Architecture
        </Link>
      </MediaObject>
    )}
    >
      <PageTitle>Log In</PageTitle>
      <Heading1 marginBottom="0">
        Log In
      </Heading1>
      <Form onSubmit={onSubmit}>
        {serverError && (
          <Dialog type="error" message={serverError} />
        )}
        <Input
          label="E-mail Address:"
          placeholder="your@email.com"
          id="email"
          type="email"
          autoComplete="username"
          ref={register({ required: 'Please enter your e-mail address.' })}
        />
        <Error errors={errors} name="email" />
        <Input
          label="Password:"
          placeholder="y0urPa55w0rd"
          id="password"
          type="password"
          autoComplete="current-password"
          ref={register({ required: 'Please enter a password.' })}
        />
        <Error errors={errors} name="password" />
        <Link external as="a" href="mailto:hello@cadteams.com">Forgot your password?</Link>
        <Button type="submit" block>Submit</Button>
      </Form>
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
