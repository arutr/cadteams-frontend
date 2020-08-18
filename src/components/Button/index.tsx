import Link from 'next/link';
import React from 'react';
import classNames from 'classnames';

import styles from './Button.module.scss';

export interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  block?: boolean;
  color?: 'error' | 'success';
  large?: boolean;
  loading?: boolean;
}

function Button({
  block, disabled, large, loading, children, className, color, type = 'submit', ...props
}: ButtonProps) {
  return (
    <button
      type={type as any}
      disabled={loading || disabled}
      className={classNames(
        styles.button,
        block && styles.block,
        large && styles.large,
        (loading && !disabled) && styles.loading,
        styles[color],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

interface AnchorProps extends React.HTMLProps<HTMLAnchorElement> {
  block?: boolean;
  external?: boolean;
  href?: any;
  large?: boolean;
}

export const AnchorButton = React.forwardRef<HTMLAnchorElement, AnchorProps>(({
  block, children, external, href, large, onClick, className,
}: AnchorProps, ref) => {
  const Anchor = (
    <a
      href={external ? href : null}
      ref={ref}
      rel={external && 'noopener'}
      role="button"
      className={classNames(styles.button, className, block && styles.block, large && styles.large)}
      tabIndex={0}
      target={external && '_blank'}
      onClick={onClick}
      onKeyDown={onClick as any}
    >
      {children}
    </a>
  );

  if (external) {
    return Anchor;
  }

  return (
    <Link href={href}>
      {Anchor}
    </Link>
  );
});

export default Button;
