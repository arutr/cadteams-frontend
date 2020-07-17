import Axios from 'axios';
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants';
import React, { useState } from 'react';
import { LogOnMount } from 'react-amplitude-hooks';
import Media from 'src/api/Media';
import { Individual, Label as ApiLabel } from 'src/api/User';
import Dialog, { DialogProps, DialogType } from 'src/components/Dialog';
import { Heading1, Heading3 } from 'src/components/Heading';
import Label, { LabelContainer } from 'src/components/Label';
import MediaObject from 'src/components/MediaObject';
import { ModalProvider } from 'src/components/Modal';
import PageTitle from 'src/components/PageTitle';
import { PortfolioModal } from 'src/components/Portfolio';
import getApiResource from 'src/utils/api';
import useSWR from 'swr';
import styles from './explore.module.scss';

interface Entry {
  id: number;
  preview: Media;
  sectors: ApiLabel[];
  username: string;
}

const fetcher = (endpoint) => Axios.get<Entry[]>(endpoint).then(({ data }) => data);

export default function Explore() {
  const { data: users } = useSWR<Entry[]>('/users/individuals', fetcher);
  const [portfolioUser, setPortfolioUser] = useState<Individual>(null);
  const [dialog, setDialog] = useState<DialogProps>();
  const fetchUser = (id) => () => {
    Axios
      .get(`/users/individuals/${id}`)
      .then(({ data }) => setPortfolioUser(data))
      .catch((error) => {
        setDialog({
          type: DialogType.Error,
          message: 'An unexpected error has occurred. Please try again later.',
        });

        if (PHASE_DEVELOPMENT_SERVER) {
          throw error;
        }
      });
  };

  return (
    <ModalProvider className={styles.explore}>
      <LogOnMount eventType="view page" />
      <PageTitle>Explore</PageTitle>
      <Heading1>Specialist Gallery</Heading1>
      {dialog && (
        <Dialog type={dialog.type}>{dialog.message}</Dialog>
      )}
      <section className={styles.grid}>
        {users?.map((entry) => {
          const preview = getApiResource(
            entry.preview?.formats?.small?.url,
            entry.preview.url,
          );

          return (
            <MediaObject
              className={styles.entry}
              captionAlign="left"
              key={entry.id}
              onClick={fetchUser(entry.id)}
              src={preview}
            >
              <p>{entry.username}</p>
              {entry.sectors?.length ? (
                <LabelContainer>
                  {entry.sectors.map(({ id, label }) => (
                    <Label key={id}>{label}</Label>
                  ))}
                </LabelContainer>
              ) : null}
            </MediaObject>
          );
        }) ?? (
          <Heading3 bold condensed>Loading...</Heading3>
        )}
      </section>
      {portfolioUser && (
        <PortfolioModal
          onClose={() => setPortfolioUser(null)}
          user={portfolioUser}
        />
      )}
    </ModalProvider>
  );
}
