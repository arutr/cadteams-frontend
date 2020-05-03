import React from 'react';
import PropTypes from 'prop-types';
import styles from './AuthLayout.module.scss';

export default function AuthLayout({ children, aside }) {
  return (
    <main className={styles.main}>
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
