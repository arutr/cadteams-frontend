import React from 'react';
import { LogOnMount } from 'react-amplitude-hooks';
import PageTitle from 'src/components/PageTitle';
import { Heading1 } from 'src/components/Heading';
import { useAuth } from 'src/contexts/AuthProvider';
import { getFirstName } from 'src/utils/misc';

function AppIndex() {
  const { user } = useAuth();

  return (
    <main>
      <LogOnMount eventType="view page" />
      <PageTitle>Dashboard</PageTitle>
      <Heading1>
        Welcome, {getFirstName(user?.username)}!
      </Heading1>
    </main>
  );
}

export default AppIndex;
