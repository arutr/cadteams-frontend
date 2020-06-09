import { countries } from 'countries-list';
import Link from 'next/link';
import React, { useState } from 'react';
import { Amplitude, LogOnMount } from 'react-amplitude-hooks';
import Dialog, { DialogProps } from 'src/components/Dialog';
import Designs from 'src/components/Portfolio/Designs';
import Identity from 'src/components/Portfolio/Identity';
import PortfolioFooter from 'src/components/Portfolio/PortfolioFooter';
import Skills from 'src/components/Portfolio/Skills';
import UniqueSkills from 'src/components/Portfolio/UniqueSkills';
import { useAuth } from 'src/contexts/AuthProvider';
import User from '../../api/User';
import { AnchorButton } from '../Button';
import { Heading2 } from '../Heading';
import Modal from '../Modal';
import styles from './Portfolio.module.scss';

export interface PortfolioProps {
  user: User;
  demo?: boolean;
  isProfile?: boolean;
}

function LandingPageFooter({ user }: PortfolioProps) {
  return (
    <footer className={styles.card}>
      <Heading2 marginTop="0" bold condensed>Like what you&apos;re seeing?</Heading2>
      <p>
        Get in touch with specialists like {user?.username} on <b>CAD</b>teams today.
        Create a <strong>free</strong> account and explore what CADteams has to offer!
      </p>
      <Link href="/sign-up" passHref>
        <AnchorButton block>
          Create a free account
        </AnchorButton>
      </Link>
    </footer>
  );
}

export type PortfolioSectionProps = {
  setDialog: ({ type, message }: DialogProps) => void,
} & PortfolioProps;

function Portfolio(props: PortfolioProps) {
  const { demo, isProfile } = props;
  const [dialog, setDialog] = useState<DialogProps>();
  const { user: authUser } = useAuth();
  return (
    <div className={styles.wrapper}>
      {dialog?.message && <Dialog {...dialog} />}
      <header className={styles.header}>
        <Identity {...props} setDialog={setDialog} />
        {(demo || isProfile || authUser.type === 'enterprise') && (
          <Skills {...props} setDialog={setDialog} />
        )}
      </header>
      <Designs {...props} setDialog={setDialog} />
      {(demo || isProfile || authUser.type === 'enterprise') && (
        <UniqueSkills {...props} setDialog={setDialog} />
      )}
      {demo && <LandingPageFooter {...props} />}
      {!demo && (isProfile || authUser.type === 'enterprise') && (
        <PortfolioFooter {...props} setDialog={setDialog} />
      )}
    </div>
  );
}

type ModalProps = {
  onClose: () => void,
} & PortfolioProps;

export function PortfolioModal(props: ModalProps) {
  const { onClose, user } = props;
  const Component = (
    <Modal onClose={onClose} className={styles.modal}>
      <Portfolio {...props} />
    </Modal>
  );

  if (user?.id) {
    return (
      <Amplitude
        eventProperties={{
          portfolio: {
            id: user.id,
            country: countries[user?.country]?.name.toLowerCase(),
            designCount: user?.designs?.length,
            experience: user?.experience,
            languages: user?.languages?.map(({ label }) => label.toLowerCase().trim()),
            profilePicture: !!user?.profilePicture,
            sectors: user?.sectors?.map(({ label }) => label.toLowerCase().trim()),
            specialization: user?.specialization?.toLowerCase().trim(),
            tools: user?.tools?.map(({ label }) => label.toLowerCase().trim()),
          },
        }}
      >
        <LogOnMount eventType="view portfolio" />
        {Component}
      </Amplitude>
    );
  }

  return Component;
}

export default Portfolio;
