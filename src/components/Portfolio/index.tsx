import Link from 'next/link';
import React, { useState } from 'react';
import Dialog, { DialogProps } from 'src/components/Dialog';
import Designs from 'src/components/Portfolio/Designs';
import Identity from 'src/components/Portfolio/Identity';
import PortfolioFooter from 'src/components/Portfolio/PortfolioFooter';
import Skills from 'src/components/Portfolio/Skills';
import UniqueSkills from 'src/components/Portfolio/UniqueSkills';
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

function NewsletterFooter({ user }: PortfolioProps) {
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

function Portfolio({ demo, ...props }: PortfolioProps) {
  const [dialog, setDialog] = useState<DialogProps>();
  return (
    <div className={styles.wrapper}>
      {dialog?.message && <Dialog {...dialog} />}
      <header className={styles.header}>
        <Identity {...props} setDialog={setDialog} />
        <Skills {...props} setDialog={setDialog} />
      </header>
      <Designs {...props} setDialog={setDialog} />
      <UniqueSkills {...props} setDialog={setDialog} />
      {demo ? (
        <NewsletterFooter {...props} />
      ) : (
        <PortfolioFooter {...props} setDialog={setDialog} />
      )}
    </div>
  );
}

type ModalProps = {
  onClose: () => void,
} & PortfolioProps;

export function PortfolioModal({ onClose, ...props }: ModalProps) {
  return (
    <Modal onClose={onClose} className={styles.modal}>
      <Portfolio {...props} />
    </Modal>
  );
}

export default Portfolio;
