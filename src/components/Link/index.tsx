import React from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import NextLink from 'next/link';
import classNames from 'classnames';
import styles from './Link.module.scss';

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
          style={{ textDecoration: 'none' }}
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
