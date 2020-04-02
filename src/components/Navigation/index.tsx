import React from 'react';
import PropTypes from 'prop-types';
import styles from './Navigation.module.scss';

function Navigation({ children }) {
  return (
    <nav className={styles.nav}>
      <div className={styles.wrapper}>
        <img src="/logo.svg" alt="CADteams" />
        <ul>
          {children.map((child) => (
            <li key={child.id}>{child}</li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

Navigation.propTypes = {
  children: PropTypes.node,
};

Navigation.defaultProps = {
  children: null,
};

export default Navigation;
