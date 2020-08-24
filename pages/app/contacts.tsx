import Connection, { ConnectionStatus } from 'src/api/Connection';
import { EnterpriseContact, IndividualContact } from 'src/components/Contacts/Contact';
import PortfolioQueryModal from 'src/components/Portfolio/PortfolioQueryModal';
import useSWR, { mutate } from 'swr';
import classNames from 'classnames';
import React, { useState } from 'react';
import { LogOnMount } from 'react-amplitude-hooks';
import { useForm } from 'react-hook-form';
import { RadioSlider } from 'src/components/Form';
import { Heading1 } from 'src/components/Heading';
import Icon from 'src/components/Icon';
import Link from 'src/components/Link';
import { ModalProvider } from 'src/components/Modal';
import PageTitle from 'src/components/PageTitle';
import { useAuth } from 'src/contexts/AuthProvider';
import DialogProvider from 'src/contexts/DialogContext';
import layout from 'src/layouts/FilterLayout.module.scss';

interface ContactsFilters {
  status: ConnectionStatus;
}

function Contacts() {
  const { user } = useAuth();
  const [filters, setFilters] = useState<ContactsFilters>({ status: 'connected' });
  const { register, handleSubmit } = useForm<{ status: string; }>();
  const entriesApiKey = ['/connections', filters];
  const { data: entries, error } = useSWR<Connection[]>(entriesApiKey);
  const inactiveTabCountApiKey = filters.status === 'connected'
    ? '/connections/count?status=pending'
    : '/connections/count?status=connected';
  const { data: inactiveTabCount } = useSWR<number>(
    inactiveTabCountApiKey,
    undefined,
    { initialData: 0 },
  );
  const tabCount = (status) => (filters.status === status
    ? (entries?.length ?? 0)
    : inactiveTabCount
  );
  const onTabInput = handleSubmit(({ status }: { status: ConnectionStatus }) => (
    setFilters({ status })));
  const onInviteResponse = (id) => {
    mutate(entriesApiKey, entries.filter((entry) => entry.id !== id));
    mutate(inactiveTabCountApiKey);
  };

  return (
    <>
      <RadioSlider
        name="status"
        labels={[
          {
            name: `Connected (${tabCount('connected')})`,
            value: 'connected',
          },
          {
            name: `Pending (${tabCount('pending')})`,
            value: 'pending',
          },
        ]}
        onInput={onTabInput}
        ref={register}
      />
      <br />
      {!entries && !error && (
        <span className="placeholder">
          Loading your contacts, please wait...
        </span>
      )}
      {error && (
        <span className="placeholder">
          Failed to load your contacts. Please try again later.
        </span>
      )}
      {entries && !entries.length && user?.type === 'enterprise' && filters.status === 'connected'
      && (
        <span className="placeholder">
          No match for your criteria. Expand your connections by visiting the&nbsp;
          <Link underlined href="/app/explore"><Icon name="shop" />Explore</Link> page!
        </span>
      )}
      {entries && !entries.length && user?.type === 'enterprise' && filters.status === 'pending'
      && (
        <span className="placeholder">
          No pending connection invites. Send out some more by visiting the&nbsp;
          <Link underlined href="/app/explore"><Icon name="shop" />Explore</Link> page!
        </span>
      )}
      {entries && !entries.length && user?.type === 'individual' && filters.status === 'connected'
      && (
        <span className="placeholder">
          You haven't connected with a company yet. Ensure
          your <Link underlined href="/app/profile"><Icon name="user" />Profile</Link> is complete
          and verified to increase your chances of getting noticed!
        </span>
      )}
      {entries && !entries.length && user?.type === 'individual' && filters.status === 'pending'
      && (
        <span className="placeholder">
          No pending connection invites.
        </span>
      )}
      {!!entries?.length && user?.type === 'individual' && entries.map((entry, index) => (
        <EnterpriseContact key={index} connection={entry} onInviteResponse={onInviteResponse} />
      ))}
      {!!entries?.length && user?.type === 'enterprise' && entries.map((entry, index) => (
        <IndividualContact key={index} connection={entry} onInviteResponse={onInviteResponse} />
      ))}
    </>
  );
}

export default function ContactsPage() {
  return (
    <ModalProvider className={classNames(layout.wrapper)}>
      <LogOnMount eventType="view page" />
      <PageTitle>Contacts</PageTitle>
      <section className={layout.content}>
        <Heading1 marginBottom="1rem">Contacts</Heading1>
        <DialogProvider>
          <Contacts />
          <PortfolioQueryModal />
        </DialogProvider>
      </section>
    </ModalProvider>
  );
}
