import React from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import NextLink from 'next/link';
import classNames from 'classnames';
import styles from './Link.module.scss';

function Link({
  href, children, disabled, external, inverted, onClick, className, hoverEffect, underlined,
}) {
  const { pathname } = useRouter();
  const classes = classNames(
    styles.link,
    className,
    disabled && styles.disabled,
    pathname === href && styles.active,
    hoverEffect && styles['hover-effect'],
    inverted && styles.inverted,
    !underlined && styles['not-underlined'],
  );

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener"
      >
        {children}
      </a>
    );
  }

  if (href) {
    return (
      <NextLink href={href}>
        <a
          className={classes}
          onClick={onClick}
          role="link"
          tabIndex={0}
          onKeyDown={onClick}
        >
          {children}
        </a>
      </NextLink>
    );
  }

  return (
    <span
      className={classes}
      onClick={onClick}
      role="link"
      tabIndex={0}
      onKeyDown={onClick}
    >
      {children}
    </span>
  );
}

Link.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  external: PropTypes.bool,
  hoverEffect: PropTypes.bool,
  inverted: PropTypes.bool,
  underlined: PropTypes.bool,
  href: PropTypes.string,
  onClick: PropTypes.func,
};

Link.defaultProps = {
  className: null,
  children: null,
  disabled: false,
  external: false,
  hoverEffect: true,
  inverted: false,
  underlined: false,
  href: '',
  onClick: null,
};

export default Link;
