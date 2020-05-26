import classNames from 'classnames';
import React from 'react';
import Icon from 'src/components/Icon';
import styles from './Dialog.module.scss';

export interface DialogProps {
  children?: any;
  type: 'error' | 'success' | 'info';
  message?: string;
}

export default function Dialog({ children, type, message }: DialogProps) {
  const icon = {
    error: 'error',
    info: 'info',
    success: 'check',
  };

  if (children || message) {
    return (
      <div className={classNames(styles.dialog, styles[type])}>
        <Icon className={styles.icon} large name={icon[type]} />
        <p className={styles.message}>{children ?? message}</p>
      </div>
    );
  }

  return null;
}
