import React from 'react';
import classNames from 'classnames';

import styles from './Button.module.scss';

interface Props {
  block?: boolean;
  children?: any;
  className?: string;
  large?: boolean;
  onClick?: (event) => void;
  type?: 'submit' | 'button';
}

function Button({
  block, large, children, onClick, className, type,
}: Props) {
  return (
    <button
      type={type ?? 'submit'}
      className={classNames(styles.button, className, block && styles.block, large && styles.large)}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

type AnchorProps = {
  external?: boolean;
  href?: string;
} & Props;

export const AnchorButton = React.forwardRef<HTMLAnchorElement, AnchorProps>(({
  block, children, external, href, large, onClick, className,
}: AnchorProps, ref) => (
  <a
    href={href}
    ref={ref}
    rel={external && 'noopener'}
    role="button"
    className={classNames(styles.button, className, block && styles.block, large && styles.large)}
    tabIndex={0}
    target={external && '_blank'}
    onClick={onClick}
    onKeyDown={onClick}
  >
    {children}
  </a>
));

export default Button;
