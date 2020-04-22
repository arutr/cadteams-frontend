import React from 'react';
import PropTypes from 'prop-types';

import styles from './Label.module.scss';

function Label({ children }) {
  return (
    <span className={styles.label}>
      {children}
    </span>
  );
}

export function LabelContainer({ children }) {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
}

Label.propTypes = {
  children: PropTypes.node,
};
LabelContainer.propTypes = Label.propTypes;

Label.defaultProps = {
  children: null,
};
LabelContainer.defaultProps = Label.defaultProps;

export default Label;
