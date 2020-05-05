import React from 'react';
import PropTypes from 'prop-types';
import NextLink from 'next/link';
import classNames from 'classnames';

import styles from './Link.module.scss';

/**
 * Link component
 * @param as Render link as a given HTML element
 * @param href Route path
 * @param children Link text
 * @param icon Left icon for the link - this also controls whether the link is underlined!
 * @param external Is this an external link? If so, create a standard anchor tag
 * @param onClick Click event handler
 * @param className Additional HTML class(es)
 * @constructor
 */
function Link({
  as, href, children, icon, external, onClick, className, hoverEffect,
}) {
  const classes = classNames(
    styles.link,
    className,
    hoverEffect && styles['hover-effect'],
    icon && `icon icon__${icon}`,
  );

  if (external) {
    const As = as ?? 'a';
    return (
      <As
        href={href}
        className={classes}
        target="_blank"
        rel="noopener"
      >
        {children}
      </As>
    );
  }

  if (href) {
    const As = as ?? 'span';
    return (
      <NextLink href={href}>
        <As
          className={classes}
          onClick={onClick}
          role="link"
          tabIndex={0}
          onKeyPress={onClick}
        >
          {children}
        </As>
      </NextLink>
    );
  }

  const As = as ?? 'a';
  return (
    <As
      className={classes}
      onClick={onClick}
      role="link"
      tabIndex={0}
      onKeyPress={onClick}
    >
      {children}
    </As>
  );
}

Link.propTypes = {
  as: PropTypes.node,
  children: PropTypes.node,
  className: PropTypes.string,
  external: PropTypes.bool,
  href: PropTypes.string,
  icon: PropTypes.string,
  hoverEffect: PropTypes.bool,
  onClick: PropTypes.func,
};

Link.defaultProps = {
  as: null,
  href: '',
  icon: '',
  children: null,
  external: false,
  onClick: null,
  hoverEffect: true,
  className: null,
};

export default Link;
