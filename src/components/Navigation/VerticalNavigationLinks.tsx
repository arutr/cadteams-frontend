import classNames from 'classnames';
import Router from 'next/router';
import React from 'react';
import Icon from 'src/components/Icon';
import Label from 'src/components/Label';
import { useAuth } from 'src/contexts/AuthProvider';
import { getApiResource } from 'src/utils/api';
import useSWR from 'swr';
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
  const { data: pendingCount } = useSWR<number>((
    user?.type === 'individual' && '/connections/count?status=pending'
  ));

  return (
    <>
      <ActiveTab href="/app/bookings">
        <Icon large name="calendar-confirmed" /> Bookings
      </ActiveTab>
      {user?.type === 'individual' && (
        <ActiveTab href="/app/calendar">
          <Icon large name="calendar" /> Calendar
        </ActiveTab>
      )}
      <span>
        <ActiveTab href="/app/contacts">
          <Icon large name="handshake" /> Contacts&ensp;
        </ActiveTab>
        {!!pendingCount && (
          <Label className={styles.indicator} small>{pendingCount}</Label>
        )}
      </span>
      <ActiveTab href="/app/explore">
        <Icon large name="shop" /> Explore
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
      <ActiveTab href="/app/settings">
        <Icon large name="gear" /> Settings
      </ActiveTab>
      <Link onClick={logOut}>
        <Icon large name="sign-out" /> Sign Out
      </Link>
    </>
  );
}
