import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './Button.module.scss';

function Button({
  block, large, children, onClick,
}) {
  return (
    <button
      type="button"
      className={classNames(styles.button, block && styles.block, large && styles.large)}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  block: PropTypes.bool,
  children: PropTypes.node,
  large: PropTypes.bool,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  block: false,
  children: null,
  large: false,
  onClick: null,
};

export default Button;
