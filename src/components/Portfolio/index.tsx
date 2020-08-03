import { countries } from 'countries-list';
import Link from 'next/link';
import React from 'react';
import { Amplitude, LogOnMount } from 'react-amplitude-hooks';
import About from 'src/components/Portfolio/About';
import Designs from 'src/components/Portfolio/Designs';
import ExperienceEducation from 'src/components/Portfolio/ExperienceEducation';
import Identity from 'src/components/Portfolio/Identity';
import ContactInformation from 'src/components/Portfolio/ContactInformation';
import Skills from 'src/components/Portfolio/Skills';
import Status from 'src/components/Portfolio/Status';
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

function Conversion({ user }: PortfolioProps) {
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

function Portfolio(props: PortfolioProps) {
  const { demo, isProfile, user } = props;
  const { user: authUser } = useAuth();
  const isEnterpriseViewer = authUser?.type === 'enterprise';

  return (
    <div className={styles.wrapper}>
      <DialogProvider>
        {user?.type === 'individual' && isProfile && <Status />}
        <header className={styles.row}>
          <Identity {...props} />
          <Skills {...props} />
        </header>
        <Designs {...props} />
        <div className={styles.row}>
          <About {...props} />
          {(demo || isProfile || isEnterpriseViewer) && (
            <ExperienceEducation {...props} />
          )}
          {user?.type !== 'individual' && (
            <ContactInformation {...props} />
          )}
        </div>
        <div className={styles.row}>
          {(demo || isProfile || isEnterpriseViewer) && (
            <UniqueSkills {...props} />
          )}
          {!demo && user?.type === 'individual' && (isProfile || isEnterpriseViewer) && (
            <ContactInformation {...props} />
          )}
          {demo && <Conversion {...props} />}
        </div>
      </DialogProvider>
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
