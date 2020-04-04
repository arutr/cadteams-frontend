import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './Button.module.scss';

function Button({ block, large, children }) {
  return (
    <button
      type="button"
      className={classNames(styles.button, block && styles.block, large && styles.large)}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  block: PropTypes.bool,
  children: PropTypes.node,
  large: PropTypes.bool,
};

Button.defaultProps = {
  block: false,
  children: null,
  large: false,
};

export default Button;
