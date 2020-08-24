import Axios from 'axios';
import classNames from 'classnames';
import React, { useState } from 'react';
import { useAmplitude } from 'react-amplitude-hooks';
import { useFormContext } from 'react-hook-form';
import Button from 'src/components/Button';
import { Error, Form } from 'src/components/Form';
import { Heading2 } from 'src/components/Heading';
import { PortfolioProps } from 'src/components/Portfolio/index';
import cardStyles from 'src/components/Card/Card.module.scss';
import { useAuth } from 'src/contexts/AuthProvider';
import ProfileUpdateProvider from 'src/contexts/ProfileUpdateContext';
import { getErrorMessage } from 'src/utils/api';
import { getFirstName } from 'src/utils/misc';
import useSWR from 'swr';

interface FormValues {
  message: string;
}

type Status = null | 'sending' | 'sent';

function Connect({ user }: PortfolioProps) {
  const { logEvent } = useAmplitude((inheritedProps) => ({
    portfolio: {
      ...inheritedProps.portfolio,
    },
  }));
  const {
    register, handleSubmit, errors, setError, clearErrors,
  } = useFormContext<FormValues>();
  const { data: connection } = useSWR(() => `/connections/exists/${user?.id}`);
  const [sendingStatus, setSendingStatus] = useState<Status>();
  const { user: authUser } = useAuth();
  const firstName = getFirstName(user?.username);
  const onSubmit = handleSubmit(async ({ message }) => {
    clearErrors('message');
    setSendingStatus('sending');

    try {
      await Axios.post('/connections', {
        user: authUser?.id,
        acquaintance: user?.id,
        message,
      });
      setSendingStatus('sent');
      logEvent('send connection invite');
    } catch (error) {
      setSendingStatus(null);
      setError('message', {
        type: 'error',
        message: getErrorMessage(error),
      });
    }
  });

  return (
    <section className={classNames(cardStyles.card)}>
      <Heading2 bold condensed marginTop="0">Connect</Heading2>
      <p>
        Like {getFirstName(user?.username)}'s portfolio? Connect with them by briefly introducing
        yourself below.
      </p>
      <Form onSubmit={onSubmit}>
        <textarea
          disabled={sendingStatus === 'sent' || connection}
          name="message"
          rows={8}
          placeholder={`Hi ${firstName}! Let's connect.`}
          ref={register({ required: 'Please introduce yourself.' })}
        />
        <Error filler={false} name="message" errors={errors} />
        <Button
          block
          loading={!!sendingStatus}
          disabled={connection || sendingStatus === 'sent'}
        >
          {!connection && !sendingStatus && `Send invite to ${firstName}`}
          {sendingStatus === 'sending' && 'Sending...'}
          {(sendingStatus === 'sent' || connection?.status === 'pending') && (
            `Invite sent to ${firstName}`
          )}
          {connection?.status === 'connected' && `Connected with  ${firstName}`}
        </Button>
      </Form>
    </section>
  );
}

export default function ConnectSection(props: PortfolioProps) {
  return (
    <ProfileUpdateProvider>
      <Connect {...props} />
    </ProfileUpdateProvider>
  );
}
