import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import dynamic from 'next/dynamic';
import Router, { useRouter } from 'next/router';
import { useAuth } from 'src/contexts/AuthProvider';
import getApiResource from '../../utils/api';
import Icon from '../Icon';
import MediaObject from '../MediaObject';
import styles from './Navigation.module.scss';
import Link from '../Link';
import AppNavigationLinks from './VerticalNavigationLinks';

export function GuestNavigationLinks() {
  const { isAuthenticated, logOut, user } = useAuth();

  if (!isAuthenticated()) {
    return (
      <>
        <Link href="/sign-up"><Icon name="edit" /> Sign Up</Link>
        <Link href="/log-in"><Icon name="sign-in" /> Log In</Link>
      </>
    );
  }

  if (Router.pathname.startsWith('/app')) {
    return (
      <>
        <Link onClick={logOut}><Icon name="sign-out" /> Log Out</Link>
      </>
    );
  }

  const profilePicture = user?.profilePicture;

  return (
    <>
      <Link href="/app/profile" hoverEffect={false}>
        <MediaObject
          captionAlign="left"
          className={styles.avatar}
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
  const { isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);
  const links = guest ? <GuestNavigationLinks /> : <AppNavigationLinks />;

  const toggleMenu = () => setOpen(!open);

  useEffect(() => {
    const handleChange = () => setOpen(false);
    router.events.on('routeChangeStart', handleChange);

    return () => router.events.off('routeChangeStart', handleChange);
  });

  return (
    <header className={guest ? styles.horizontal : styles.vertical}>
      <nav>
        <Link
          href={isAuthenticated() ? '/app/profile' : '/'}
          hoverEffect={false}
          className={styles.logo}
        >
          <img src="/images/logo.svg" alt="CADteams" />
        </Link>
        <Icon className={styles.toggle} name={open ? 'close' : 'menu'} onClick={toggleMenu} />
        <div className={classNames(styles.links, open && styles.open)}>
          {links}
        </div>
      </nav>
    </header>
  );
}

export default dynamic(() => Promise.resolve(Navigation), { ssr: false });
