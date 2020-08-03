import classNames from 'classnames';
import React, { HTMLAttributes } from 'react';
import styles from './Label.module.scss';

interface LabelProps extends HTMLAttributes<Element> {
  color?: 'purple' | 'red' | 'green';
  inverted?: boolean;
  onRemoveLabel?: () => void;
  small?: boolean;
}

function Label({
  children,
  className,
  color,
  inverted,
  onRemoveLabel,
  small,
  ...props
}: LabelProps) {
  return (
    <span
      className={classNames(
        styles.label,
        styles[color],
        small && styles.small,
        inverted && styles.inverted,
        className,
      )}
      {...props}
    >
      {children}
      {onRemoveLabel && (
        <span
          className={styles.remove}
          role="button"
          tabIndex={0}
          onKeyDown={onRemoveLabel}
          onClick={onRemoveLabel}
        >
          X
        </span>
      )}
    </span>
  );
}

export function LabelContainer({
  children, className, ...props
}: React.HTMLProps<HTMLDivElement>) {
  return (
    <div className={classNames(styles.container, className)} {...props}>
      {children}
    </div>
  );
}

export default Label;
