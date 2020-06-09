import classNames from 'classnames';
import React from 'react';
import Icon from 'src/components/Icon';
import styles from './Dialog.module.scss';

export interface DialogProps {
  children?: any;
  message?: string;
  small?: boolean;
  type: string;
}

export default function Dialog({
  children, type = 'info', small, message,
}: DialogProps) {
  const icon = {
    error: 'error',
    hint: 'bulb',
    info: 'info',
    success: 'check',
    warning: 'warning',
  };
  const As = small ? 'small' : 'div';

  if (children || message) {
    return (
      <As className={classNames(styles.dialog, styles[type])}>
        <Icon className={styles.icon} large name={icon[type]} />
        <p className={styles.message}>{children ?? message}</p>
      </As>
    );
  }

  return null;
}
