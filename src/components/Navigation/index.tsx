import classNames from 'classnames';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { AnchorButton } from 'src/components/Button';
import Label from 'src/components/Label';
import { useAuth } from 'src/contexts/AuthProvider';
import { getApiResource } from 'src/utils/api';
import Icon from '../Icon';
import Link from '../Link';
import MediaObject from '../MediaObject';
import styles from './Navigation.module.scss';
import AppNavigationLinks from './VerticalNavigationLinks';

export function GuestNavigationLinks() {
  const { isAuthenticated, user } = useAuth();
  const links = (
    <>
      <div className={styles.users}>
        <Link href="/individuals">Specialists</Link>
        <Link href="/enterprise">Enterprise</Link>
        <Link underlined={false} external href="https://medium.com/cadteams-magazine">Blog</Link>
      </div>
      <span className={styles.separator} />
    </>
  );

  if (!isAuthenticated()) {
    return (
      <>
        {links}
        <Link className={styles['log-in']} href="/log-in">
          <Icon name="sign-in" /> Log In
        </Link>
        <AnchorButton className={styles['sign-up']} href="/sign-up">
          Sign Up
        </AnchorButton>
      </>
    );
  }

  const profilePicture = user?.profilePicture;

  return (
    <>
      {links}
      <Link href="/app/profile" hoverEffect={false}>
        <MediaObject
          captionAlign="left"
          className={classNames(styles.avatar, !profilePicture && styles.blank)}
          src={getApiResource(profilePicture?.formats?.thumbnail?.url, profilePicture?.url)
          ?? '/icons/user-blank.svg'}
          vertical
        >
          {user?.username}
        </MediaObject>
      </Link>
    </>
  );
}

interface Props {
  guest?: boolean;
}

function Navigation({ guest }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(!open);
  const handleChange = () => setOpen(false);

  useEffect(() => {
    router.events.on('routeChangeStart', handleChange);

    return () => router.events.off('routeChangeStart', handleChange);
  });

  return (
    <header className={guest ? styles.horizontal : styles.vertical}>
      <nav>
        <Link
          href={guest ? '/' : '/app/profile'}
          hoverEffect={false}
          className={styles.logo}
        >
          <img src="/images/logo.svg" alt="CADteams" />
          <Label className={styles.beta} small>Beta</Label>
        </Link>
        <Icon className={styles.toggle} name={open ? 'close' : 'menu'} onClick={toggleMenu} />
        <div className={classNames(styles.links, open && styles.open)}>
          {guest ? <GuestNavigationLinks /> : <AppNavigationLinks />}
        </div>
      </nav>
    </header>
  );
}

export default dynamic(() => Promise.resolve(Navigation), { ssr: false });
