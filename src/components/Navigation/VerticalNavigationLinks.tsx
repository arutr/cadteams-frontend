import classNames from 'classnames';
import Router from 'next/router';
import React from 'react';
import Icon from 'src/components/Icon';
import { useAuth } from 'src/contexts/AuthProvider';
import { getApiResource } from 'src/utils/api';
import Link from '../Link';
import MediaObject from '../MediaObject';
import styles from './VerticalNavigationLinks.module.scss';

function ActiveTab({
  children, className, href, ...props
}: React.HTMLProps<HTMLAnchorElement>) {
  const style = Router.pathname === href ? styles.active : null;
  return <Link className={classNames(style, className)} href={href} {...props}>{children}</Link>;
}

export default function VerticalNavigationLinks() {
  const { logOut, user } = useAuth();
  const profilePicture = user?.profilePicture;

  return (
    <>
      {user?.type === 'individual' && (
        <ActiveTab href="/app/calendar" disabled>
          <Icon large name="calendar" /> Calendar
        </ActiveTab>
      )}
      <ActiveTab href="/app/contacts" disabled>
        <Icon large name="handshake" /> Contacts
      </ActiveTab>
      <ActiveTab href="/app" disabled>
        <Icon large name="dashboard" /> Dashboard
      </ActiveTab>
      <ActiveTab href="/app/documents" disabled>
        <Icon large name="file" /> Documents
      </ActiveTab>
      <ActiveTab href="/app/explore">
        <Icon large name="shop" /> Explore
      </ActiveTab>
      <ActiveTab href="/app/projects" disabled>
        <Icon large name="plan" /> Projects
      </ActiveTab>
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
      <ActiveTab href="/app/profile">
        <Icon large name="user" /> Profile
      </ActiveTab>
      <ActiveTab href="/app/settings" disabled>
        <Icon large name="gear" /> Settings
      </ActiveTab>
      <Link onClick={logOut}>
        <Icon large name="sign-out" /> Sign Out
      </Link>
    </>
  );
}
