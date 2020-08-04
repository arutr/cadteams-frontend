import Axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { LogOnMount } from 'react-amplitude-hooks';
import Media from 'src/api/Media';
import User from 'src/api/User';
import { DialogType } from 'src/components/Dialog';
import Filters from 'src/components/Explore/Filters';
import Tile from 'src/components/Explore/GalleryTile';
import { Heading1 } from 'src/components/Heading';
import { ModalProvider } from 'src/components/Modal';
import PageTitle from 'src/components/PageTitle';
import { PortfolioModal } from 'src/components/Portfolio';
import DialogProvider, { useDialog } from 'src/contexts/DialogContext';
import useSWR from 'swr';
import styles from './explore.module.scss';

export interface GalleryEntry {
  id: number;
  preview: Media;
  specialization: string;
  username: string;
  profilePicture: Media;
  verified: boolean;
  instantBooking: boolean;
  dailyRate: number;
  rating: number;
}

export interface FiltersForm {
  sectors?: string[];
  specialization?: string[];
  verified: boolean;
  instantBooking?: boolean;
}

const fetcher = (endpoint, params) => (
  Axios
    .get<GalleryEntry[]>(endpoint, { params })
    .then(({ data }) => data)
);

interface Props {
  filters: FiltersForm;
}

function Explore(props: Props) {
  const { filters } = props;
  const { data: users, error } = useSWR<GalleryEntry[]>(['/users/individuals', filters], fetcher);
  const { setDialog } = useDialog();
  const {
    pathname,
    push,
    query,
  } = useRouter();
  const [portfolioUser, setPortfolioUser] = useState<User>(null);
  const fetchUser = (id) => (
    Axios
      .get(`/users/individuals/${id}`)
      .then(({ data }) => setPortfolioUser(data))
      .catch(() => {
        setDialog({
          type: DialogType.Error,
          message: 'An unexpected error has occurred. Please try again later.',
        });
      })
  );
  useEffect(() => {
    const { portfolio } = query;

    if (portfolio && !portfolioUser) {
      fetchUser(portfolio);
    } else if (!portfolio && portfolioUser) {
      setPortfolioUser(null);
    }
  }, [query]);

  return (
    <>
      <div className={styles.grid}>
        {!users && !error && (
          <span className="placeholder">
            Loading top talent, please wait...
          </span>
        )}
        {error && (
          <span className="placeholder">
            Failed to find specialists. Please try again later.
          </span>
        )}
        {users && !users.length && (
          <span className="placeholder">
            No match for your criteria. Sorry about that!
          </span>
        )}
        {users?.map((entry) => <Tile key={entry.id} entry={entry} />)}
      </div>
      {portfolioUser && (
        <PortfolioModal
          onClose={() => {
            setPortfolioUser(null);
            const previousQuery = query;
            delete previousQuery.portfolio;
            push({ pathname, query: previousQuery });
          }}
          user={portfolioUser}
        />
      )}
    </>
  );
}

export default function () {
  const [filters, setFilters] = useState<FiltersForm>();

  return (
    <ModalProvider className={styles.explore}>
      <LogOnMount eventType="view page" />
      <PageTitle>Explore</PageTitle>
      <Filters setFilters={setFilters} />
      <section className={styles.gallery}>
        <Heading1 marginBottom="2rem">Specialist Gallery</Heading1>
        <DialogProvider>
          <Explore filters={filters} />
        </DialogProvider>
      </section>
    </ModalProvider>
  );
}
