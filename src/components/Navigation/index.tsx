import React, { useState } from 'react';
import classNames from 'classnames';
import dynamic from 'next/dynamic';
import Router from 'next/router';
import { useAuth } from 'src/contexts/AuthProvider';
import getApiResource from '../../utils/api';
import Icon from '../Icon';
import MediaObject from '../MediaObject';
import styles from './Navigation.module.scss';
import Link from '../Link';
import VerticalNavigationLinks from './VerticalNavigationLinks';

export function HorizontalNavigationLinks() {
  const { isAuthenticated, logOut, user } = useAuth();

  if (!isAuthenticated()) {
    return (
      <>
        <Link as="li" href="/sign-up"><Icon name="edit" /> Sign Up</Link>
        <Link as="li" href="/log-in"><Icon name="sign-in" /> Log In</Link>
      </>
    );
  }

  if (Router.pathname.startsWith('/app')) {
    return (
      <>
        <Link as="li" onClick={logOut}><Icon name="sign-out" /> Log Out</Link>
      </>
    );
  }

  return (
    <>
      <Link as="li" href="/app" hoverEffect={false}>
        <MediaObject
          captionAlign="left"
          src={getApiResource(user?.profilePicture?.formats?.thumbnail?.url)
          ?? '/icons/user-blank.svg'}
          vertical
          imageWidth="3rem"
        >
          {user?.username}
        </MediaObject>
      </Link>
    </>
  );
}

interface Props {
  horizontal?: boolean;
}

function Navigation({ horizontal }: Props) {
  const { isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);
  const links = horizontal ? <HorizontalNavigationLinks /> : <VerticalNavigationLinks />;

  const toggleMenu = () => setOpen(!open);

  return (
    <header className={horizontal ? styles.horizontal : styles.vertical}>
      <nav>
        <Link href={isAuthenticated() ? '/app' : '/'} hoverEffect={false} className={styles.logo}>
          <img src="/images/logo.svg" alt="CADteams" />
        </Link>
        <Icon className={styles.toggle} name={open ? 'close' : 'menu'} onClick={toggleMenu} />
        <ul className={classNames(styles.links, open && styles.open)}>
          {links}
        </ul>
      </nav>
    </header>
  );
}

export default dynamic(() => Promise.resolve(Navigation), { ssr: false });
