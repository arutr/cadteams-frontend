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
import User from 'src/api/User';
import DialogProvider from 'src/contexts/DialogContext';
import { AnchorButton } from '../Button';
import { Heading2 } from '../Heading';
import Modal from '../Modal';
import styles from './Portfolio.module.scss';

export interface PortfolioProps {
  user: User;
  demo?: boolean;
  isProfile?: boolean;
  inModal?: boolean;
}

function LandingPageFooter({ user }: PortfolioProps) {
  return (
    <footer className={styles.card}>
      <Heading2 marginTop="0" bold condensed>Like What You're Seeing?</Heading2>
      <p>
        Get in touch with specialists like {user?.username} today.
        Create a <strong>free</strong> account and explore what <b>CAD</b>teams has to offer!
      </p>
      <Link href="/sign-up" passHref>
        <AnchorButton block>
          Create a free account
        </AnchorButton>
      </Link>
    </footer>
  );
}

export interface PortfolioSectionProps extends PortfolioProps {
  setDialog?: ({ type, message }: DialogProps) => void,
}

function Portfolio(props: PortfolioProps) {
  const { demo, isProfile } = props;
  const [dialog, setDialog] = useState<DialogProps>();
  const { user: authUser } = useAuth();
  const isNotIndividual = authUser?.type !== 'individual';

  return (
    <div className={styles.wrapper}>
      {dialog?.message && <Dialog {...dialog} />}
      <header className={styles.header}>
        <Identity {...props} setDialog={setDialog} />
        {(demo || isProfile || isNotIndividual) && (
          <Skills {...props} setDialog={setDialog} />
        )}
      </header>
      <Designs {...props} setDialog={setDialog} />
      {(demo || isProfile || isNotIndividual) && (
        <UniqueSkills {...props} setDialog={setDialog} />
      )}
      {demo && <LandingPageFooter {...props} />}
      {!demo && (isProfile || isNotIndividual) && (
        <PortfolioFooter {...props} setDialog={setDialog} />
      )}
    </div>
  );
}

interface ModalProps extends PortfolioProps {
  onClose: () => void,
  user: User,
}

export function PortfolioModal(props: ModalProps) {
  const { onClose, user } = props;
  const Component = (
    <Modal onClose={onClose} className={styles.modal}>
      <Portfolio {...props} inModal />
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
