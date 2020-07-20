import classNames from 'classnames';
import React, { HTMLAttributes } from 'react';
import styles from './Label.module.scss';

interface LabelProps extends HTMLAttributes<Element> {
  inverted?: boolean;
  onRemoveLabel?: () => void;
  small?: boolean;
}

function Label({
  children,
  className,
  inverted,
  onRemoveLabel,
  small,
  ...props
}: LabelProps) {
  return (
    <span
      className={classNames(
        styles.label,
        className,
        small && styles.small,
        inverted && styles.inverted,
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

export function LabelContainer({ children, ...props }: HTMLAttributes<Element>) {
  return (
    <div className={styles.container} {...props}>
      {children}
    </div>
  );
}

export default Label;
