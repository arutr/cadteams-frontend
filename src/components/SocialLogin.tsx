import React from 'react';
import SocialLogin from 'react-social-login';
import styles from '../layouts/AuthLayout.module.scss';
import Button from './Button';

interface Props {
  triggerLogin: () => void;
}

function FacebookLogin({ triggerLogin }: Props) {
  return (
    <Button onClick={triggerLogin} block className={styles.button__facebook}>
      <span className="icon icon__white icon__facebook" /> Continue with Facebook
    </Button>
  );
}

function GoogleLogin({ triggerLogin }: Props) {
  return (
    <Button onClick={triggerLogin} block className={styles.button__google}>
      <span className="icon icon__google" /> Sign in with Google
    </Button>
  );
}

export const FacebookLoginButton = SocialLogin(FacebookLogin);
export const GoogleLoginButton = SocialLogin(GoogleLogin);
