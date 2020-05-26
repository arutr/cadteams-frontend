import React from 'react';
import { useRouter } from 'next/router';
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
 * @param hoverEffect Use anchor transition effects
 * @constructor
 */
function Link({
  as, href, children, disabled, external, onClick, className, hoverEffect,
}) {
  const { pathname } = useRouter();
  const classes = classNames(
    styles.link,
    className,
    disabled && styles.disabled,
    href && pathname.includes(href) && styles.active,
    hoverEffect && styles['hover-effect'],
  );

  if (external) {
    const As = as ?? 'a';
    return (
      <As
        href={href}
        className={classes}
        disabled={disabled}
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
          disabled={disabled}
          onClick={onClick}
          role="link"
          tabIndex={0}
          onKeyDown={onClick}
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
      disabled={disabled}
      onClick={onClick}
      role="link"
      tabIndex={0}
      onKeyDown={onClick}
    >
      {children}
    </As>
  );
}

Link.propTypes = {
  as: PropTypes.node,
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  external: PropTypes.bool,
  hoverEffect: PropTypes.bool,
  href: PropTypes.string,
  onClick: PropTypes.func,
};

Link.defaultProps = {
  as: null,
  className: null,
  children: null,
  disabled: false,
  external: false,
  hoverEffect: true,
  href: '',
  onClick: null,
};

export default Link;
