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
 * @param onClick Click event handler
 * @param className Additional HTML class(es)
 * @constructor
 */
function Link({
  href, children, icon, external, onClick, className,
}) {
  return external
    ? (
      <a
        href={href}
        className={classNames(styles.link, className, icon && `icon icon__${icon}`)}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ) : (
      <NextLink href={href}>
        {icon ? (
          <span
            className={classNames(styles.link, className, icon && `icon icon__${icon}`)}
            onClick={onClick}
            role="link"
            tabIndex={0}
            onKeyPress={onClick}
          >
            {children}
          </span>
        ) : (
          <a
            className={className}
            onClick={onClick}
            role="link"
            tabIndex={0}
            onKeyPress={onClick}
          >
            {children}
          </a>
        )}
      </NextLink>
    );
}

Link.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.string,
  children: PropTypes.node,
  external: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

Link.defaultProps = {
  href: '',
  icon: '',
  children: null,
  external: false,
  onClick: null,
  className: null,
};

export default Link;
