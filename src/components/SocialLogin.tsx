import React from 'react';
import SocialLogin from 'react-social-login';
import Icon from 'src/components/Icon';
import styles from '../layouts/AuthLayout.module.scss';
import Button from './Button';

interface Props {
  triggerLogin: () => void;
}

function FacebookLogin({ triggerLogin }: Props) {
  return (
    <Button onClick={triggerLogin} block className={styles.button__facebook}>
      <Icon name="facebook" inverted /> Continue with Facebook
    </Button>
  );
}

export const FacebookLoginButton = SocialLogin(FacebookLogin);
