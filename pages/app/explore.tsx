import classNames from 'classnames';
import React, { useState } from 'react';
import { LogOnMount } from 'react-amplitude-hooks';
import Media from 'src/api/Media';
import { industries, specializations } from 'src/api/User';
import Tile from 'src/components/Explore/GalleryTile';
import Filters, { FilterSectionType } from 'src/components/Filters';
import { Heading1 } from 'src/components/Heading';
import Icon from 'src/components/Icon';
import { ModalProvider } from 'src/components/Modal';
import PageTitle from 'src/components/PageTitle';
import PortfolioQueryModal from 'src/components/Portfolio/PortfolioQueryModal';
import DialogProvider from 'src/contexts/DialogContext';
import layout from 'src/layouts/FilterLayout.module.scss';
import useSWR from 'swr';
import styles from './explore.module.scss';

const filterSections = [
  {
    title: 'Industries',
    name: 'sectors',
    type: 'checkbox' as FilterSectionType,
    options: industries,
  },
  {
    title: 'Specialisation',
    name: 'specialization',
    type: 'checkbox' as FilterSectionType,
    options: specializations,
  },
  {
    title: 'Perks',
    type: 'checkbox' as FilterSectionType,
    options: [
      {
        label: (
          <span title="Specialists that have successfully passed the CADteams verification process">
            Verified by <b>CAD</b>teams <Icon name="verified" />
          </span>
        ),
        name: 'verified',
      },
      {
        label: (<>Instant Booking <Icon name="time-quick" /></>),
        name: 'instantBooking',
      },
    ],
  },
];

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

export interface ExploreFilters {
  sectors?: string[];
  specialization?: string[];
  verified: boolean;
  instantBooking?: boolean;
}

interface Props {
  filters: ExploreFilters;
}

function Explore(props: Props) {
  const { filters } = props;
  const { data: users, error } = useSWR<GalleryEntry[]>(['/users/individuals', filters]);

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
      <PortfolioQueryModal />
    </>
  );
}

export default function ExplorePage() {
  const [filters, setFilters] = useState<ExploreFilters>();

  return (
    <ModalProvider className={classNames(layout.wrapper, layout.withFilter)}>
      <LogOnMount eventType="view page" />
      <PageTitle>Explore</PageTitle>
      <Filters sections={filterSections} setFilters={setFilters} />
      <section className={layout.content}>
        <Heading1 marginBottom="2rem">Specialist Gallery</Heading1>
        <DialogProvider>
          <Explore filters={filters} />
        </DialogProvider>
      </section>
    </ModalProvider>
  );
}
