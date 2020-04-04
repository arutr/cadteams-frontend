import React from 'react';
import PropTypes from 'prop-types';
import NextLink from 'next/link';
import classNames from 'classnames';

import styles from './Link.module.scss';

/**
 * Link component
 * @param href Route path
 * @param children Link text
 * @param icon Left icon for the link - this also controls whether the link is underlined!
 * @param external Is this an external link? If so, create a standard anchor tag
 * @constructor
 */
function Link({
  href, children, icon, external,
}) {
  return external
    ? <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>
    : (
      <NextLink href={href}>
        {icon ? (
          <span className={classNames(styles.link, icon && `icon icon__${icon}`)}>
            {children}
          </span>
        ) : (
          <a>{children}</a>
        )}
      </NextLink>
    );
}

Link.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.string,
  children: PropTypes.node,
  external: PropTypes.bool,
};

Link.defaultProps = {
  href: '',
  icon: '',
  children: null,
  external: false,
};

export default Link;
