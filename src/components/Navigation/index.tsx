import dynamic from 'next/dynamic';
import Router from 'next/router';
import React from 'react';
import { useAuth } from '../AuthProvider';
// import { AnchorButton } from '../Button';
import styles from './Navigation.module.scss';
import Link from '../Link';

function Navigation() {
  const { isAuthenticated, logOut } = useAuth();
  let Links;

  if (!isAuthenticated()) {
    Links = (
      <ul>
        <Link external href="https://eepurl.com/gXt3-L" icon="edit">Sign Up</Link>
        <Link external href="https://eepurl.com/gXt3-L" icon="sign-in">Log In</Link>
      </ul>
    );
  } else if (Router.pathname.includes('/app')) {
    Links = (
      <ul>
        <Link as="li" icon="sign-out" onClick={logOut}>Log Out</Link>
      </ul>
    );
  } else {
    Links = (
      <ul>
        <Link as="li" icon="user-blank" href="/app">User</Link>
      </ul>
    );
  }

  return (
    <header className={styles.header}>
      <nav>
        <Link href={isAuthenticated() ? '/app' : '/'} hoverEffect={false}>
          <img src="/images/logo.svg" alt="CADteams" />
        </Link>
        {Links}
        <details>
          <summary className="icon" />
          {Links}
        </details>
      </nav>
    </header>
  );
}

export default dynamic(() => Promise.resolve(Navigation), { ssr: false });
