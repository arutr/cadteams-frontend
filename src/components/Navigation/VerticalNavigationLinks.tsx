import Router from 'next/router';
import React from 'react';
import Icon from 'src/components/Icon';
import { useAuth } from 'src/contexts/AuthProvider';
import { getApiResource } from 'src/utils/api';
import Link from '../Link';
import MediaObject from '../MediaObject';
import styles from './VerticalNavigationLinks.module.scss';

function tabActiveStyle(tab) {
  return Router.pathname.startsWith(`/app/${tab}`) ? styles.active : null;
}

export default function VerticalNavigationLinks() {
  const { logOut, user } = useAuth();
  const profilePicture = user?.profilePicture;

  return (
    <>
      <Link className={tabActiveStyle('contacts')} href="/app/contacts" disabled>
        <Icon large name="handshake" /> Contacts
      </Link>
      <Link className={tabActiveStyle('explore')} href="/app/explore" disabled>
        <Icon large name="shop" /> Explore
      </Link>
      <Link className={tabActiveStyle('jobs')} href="/app/jobs" disabled>
        <Icon large name="plan" /> Projects
      </Link>
      <div className={styles.separator} />
      <MediaObject
        captionAlign="left"
        className={styles.avatar}
        src={getApiResource(profilePicture?.formats?.thumbnail?.url, profilePicture?.url)
        ?? '/icons/user-blank.svg'}
        vertical
        width="11rem"
      >
        {user?.username}
      </MediaObject>
      <Link className={tabActiveStyle('profile')} href="/app/profile">
        <Icon large name="user" /> Profile
      </Link>
      <Link className={tabActiveStyle('settings')} href="/app/settings" disabled>
        <Icon large name="gear" /> Settings
      </Link>
      <Link onClick={logOut}>
        <Icon large name="sign-out" /> Sign Out
      </Link>
    </>
  );
}
