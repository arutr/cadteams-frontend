import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './Label.module.scss';

function Label({
  children,
  className,
  removeLabel,
  small,
}) {
  return (
    <span className={classNames(styles.label, className, small && styles.small)}>
      {children}
      {removeLabel && (
        <span
          className={styles.remove}
          role="button"
          tabIndex={0}
          onKeyDown={removeLabel}
          onClick={removeLabel}
        >
          X
        </span>
      )}
    </span>
  );
}

Label.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  removeLabel: PropTypes.func,
  small: PropTypes.bool,
};

Label.defaultProps = {
  children: null,
  className: null,
  removeLabel: null,
  small: false,
};

export function LabelContainer({ children }) {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
}

LabelContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Label;
