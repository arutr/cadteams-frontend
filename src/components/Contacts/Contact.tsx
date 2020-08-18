import Axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react';
import Connection from 'src/api/Connection';
import Button, { AnchorButton } from 'src/components/Button';
import { Heading2, Heading3 } from 'src/components/Heading';
import Icon from 'src/components/Icon';
import Label, { LabelContainer } from 'src/components/Label';
import MediaObject from 'src/components/MediaObject';
import { getApiResource } from 'src/utils/api';
import { currencyFormat } from 'src/utils/misc';
import { UrlObject } from "url";
import styles from './Contact.module.scss';

interface HocProps {
  connection: Connection;
  onInviteResponse: (id) => void;
}

interface Props extends HocProps {
  avatar: string;
  onAccept: () => Promise<void>;
  onReject: () => Promise<void>;
  onRemove: () => void;
}

function withContact(props: HocProps, Component: React.ComponentType<Props>) {
  const {
    connection: { acquaintance, user, id },
    onInviteResponse,
  } = props;
  const entry = acquaintance ?? user;
  const avatar = getApiResource(
    entry.profilePicture?.formats?.thumbnail?.url,
    entry.profilePicture?.url,
  ) ?? '/icons/user-blank.svg';
  const onAccept = () => (
    Axios
      .put(`/connections/${id}`, { status: 'connected' })
      .then(() => onInviteResponse(id))
      .catch(() => alert('Failed to respond to a connection invite. Please try again later.'))
  );
  const onReject = () => (
    Axios
      .delete(`/connections/${id}`)
      .then(() => onInviteResponse(id))
      .catch(() => alert('Failed to respond to a connection invite. Please try again later.'))
  );
  const onRemove = () => {
    if (window.confirm(`Are you sure you want to remove your connection with ${entry.username}?`)) {
      onReject();
    }
  };

  return (
    <Component
      avatar={avatar}
      onAccept={onAccept}
      onReject={onReject}
      onRemove={onRemove}
      {...props}
    />
  );
}

export const EnterpriseContact = (hocProps: HocProps) => withContact(hocProps, (props: Props) => {
  const {
    connection: {
      user: entry, message, status,
    },
    avatar,
    onAccept,
    onReject,
    onRemove,
  } = props;

  return (
    <article className={styles.entry}>
      <MediaObject className={styles.avatar} src={avatar} width="8rem" />
      <div className={styles.identity}>
        <Heading2 bold condensed marginTop="0" marginBottom="0">{entry.username}</Heading2>
        <Heading3 marginTop="0">{entry.company}</Heading3>
      </div>
      {status === 'connected' && (
        <div className={styles.details}>
          <span>
            <Icon name="phone" />&ensp;
            <a href={`tel:${entry.phone}`}>{entry.phone}</a>
          </span>
          <span>
            <Icon name="email" />&ensp;
            <a href={`mailto:${entry.contactEmail}`}>{entry.contactEmail}</a>
          </span>
          <div className={styles.options}>
            <Button
              type="button"
              color="error"
              style={{ flex: '1 30%' }}
              onClick={onRemove}
            >
              Remove
            </Button>
          </div>
        </div>
      )}
      {status === 'pending' && (
        <>
          <p className={styles.message}>
            {message}
          </p>
          <div className={styles.decision}>
            <Button type="button" color="success" onClick={onAccept}>Accept</Button>
            <Button type="button" color="error" onClick={onReject}>Reject</Button>
          </div>
        </>
      )}
    </article>
  );
});

export const IndividualContact = (hocProps: HocProps) => withContact(hocProps, (props: Props) => {
  const {
    connection: {
      acquaintance: entry, message, status,
    },
    avatar,
    onReject,
    onRemove,
  } = props;
  const { pathname, query } = useRouter();

  return (
    <article className={styles.entry}>
      <MediaObject className={styles.avatar} src={avatar} width="8rem" />
      <div className={styles.identity}>
        <Heading2 bold condensed marginTop="0" marginBottom="0">{entry.username}</Heading2>
        <Heading3 marginTop="0" marginBottom="0">{entry.specialization}</Heading3>
        <LabelContainer className={styles.labels}>
          {!!entry.dailyRate && (
            <Label title="Daily rate">{`${currencyFormat.format(entry.dailyRate)}/day`}</Label>
          )}
        </LabelContainer>
      </div>
      {status === 'connected' && (
        <div className={styles.details}>
          {entry.phone && (
            <span>
              <Icon name="phone" />&ensp;
              <a href={`tel:${entry.phone}`}>{entry.phone}</a>
            </span>
          )}
          {entry.contactEmail && (
            <span>
              <Icon name="email" />&ensp;
              <a href={`mailto:${entry.contactEmail}`}>{entry.contactEmail}</a>
            </span>
          )}
          <div className={styles.options}>
            <AnchorButton
              type="button"
              href={{
                query: {
                  ...query,
                  portfolio: entry.id,
                },
                pathname,
              } as UrlObject}
              style={{ flex: '2 70%' }}
            >
              <Icon name="view" /> View Profile
            </AnchorButton>
            <Button
              type="button"
              color="error"
              style={{ flex: '1 30%' }}
              onClick={onRemove}
            >
              Remove
            </Button>
          </div>
        </div>
      )}
      {status === 'pending' && (
        <>
          <p className={styles.message}>
            {message}
          </p>
          <div className={styles.decision}>
            <Button type="button" color="error" onClick={onReject}>Cancel invite</Button>
          </div>
        </>
      )}
    </article>
  );
});
