import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './Heading.module.scss';

function BaseHeading({
  bold, children, condensed, level,
}) {
  const Level = level;
  return (
    <Level className={classNames(bold && styles.bold, condensed && styles.condensed)}>
      {children}
    </Level>
  );
}

export const Heading1 = (props) => BaseHeading({ ...props, level: 'h1' });
export const Heading2 = (props) => BaseHeading({ ...props, level: 'h2' });
export const Heading3 = (props) => BaseHeading({ ...props, level: 'h3' });
export const Heading4 = (props) => BaseHeading({ ...props, level: 'h4' });
export const Heading5 = (props) => BaseHeading({ ...props, level: 'h5' });
export const Heading6 = (props) => BaseHeading({ ...props, level: 'h6' });

BaseHeading.propTypes = {
  bold: PropTypes.bool,
  children: PropTypes.node,
  condensed: PropTypes.bool,
  level: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
};

BaseHeading.defaultProps = {
  bold: false,
  children: null,
  condensed: false,
  level: 'h1',
};
