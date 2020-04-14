import React from 'react';
import PropTypes from 'prop-types';
import styles from './Navigation.module.scss';
import Link from '../Link';

function Navigation({ children }) {
  const ul = (
    <ul>
      {children.map((child, index) => (
        <li key={index}>{child}</li>
      ))}
    </ul>
  );

  return (
    <header className={styles.header}>
      <nav>
        <Link href="/">
          <img src="/images/logo.svg" alt="CADteams" />
        </Link>
        {ul}
        <details>
          <summary className="icon" />
          {ul}
        </details>
      </nav>
    </header>
  );
}

Navigation.propTypes = {
  children: PropTypes.node,
};

Navigation.defaultProps = {
  children: null,
};

export default Navigation;
