import React from 'react';
import PropTypes from 'prop-types';
import { LogOnMount } from 'react-amplitude-hooks';
import styles from './AuthLayout.module.scss';

export default function AuthLayout({ children, aside }) {
  return (
    <main className={styles.wrapper}>
      <LogOnMount eventType="view page" />
      <section className={styles.content}>
        {children}
        <div className={styles.background} />
      </section>
      <aside>
        {aside}
      </aside>
    </main>
  );
}

AuthLayout.propTypes = {
  aside: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
};
