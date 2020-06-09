import React from 'react';
import { LogOnMount } from 'react-amplitude-hooks';
import PageTitle from 'src/components/PageTitle';
import { Heading1 } from 'src/components/Heading';

function AppIndex() {
  return (
    <main>
      <LogOnMount eventType="view page" />
      <PageTitle>Dashboard</PageTitle>
      <Heading1>
        Welcome!
      </Heading1>
    </main>
  );
}

export default AppIndex;
