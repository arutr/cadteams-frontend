import React from 'react';
import { LogOnMount } from 'react-amplitude-hooks';
import { Heading1 } from 'src/components/Heading';
import PageTitle from 'src/components/PageTitle';
import { useAuth } from 'src/contexts/AuthProvider';
import styles from './profile.module.scss';
import Portfolio from '../../src/components/Portfolio';

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <main className={styles.profile}>
      <LogOnMount eventType="view page" />
      <PageTitle>Profile</PageTitle>
      <Heading1>Profile</Heading1>
      <Portfolio user={user} isProfile />
    </main>
  );
}
