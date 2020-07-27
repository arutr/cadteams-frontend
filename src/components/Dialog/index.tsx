import classNames from 'classnames';
import React, { HTMLAttributes } from 'react';
import Icon from 'src/components/Icon';
import styles from './Dialog.module.scss';

export enum DialogType {
  Blank = 'blank',
  Error = 'error',
  Hint = 'hint',
  Info = 'info',
  Success = 'success',
  Warning = 'warning',
}

const dialogIcons = {
  error: 'error',
  hint: 'bulb',
  info: 'info',
  success: 'check',
  warning: 'warning',
};

export interface DialogProps extends HTMLAttributes<Element> {
  as?: string;
  emoji?: string;
  icon?: string;
  message?: string;
  small?: boolean;
  type?: DialogType;
}

export default function Dialog({
  as, children, className, emoji, icon, type = DialogType.Blank, small, message, ...props
}: DialogProps) {
  const Wrapper = small ? 'small' : 'div';
  const As: any = as ?? 'p';

  if (children || message) {
    return (
      <Wrapper className={classNames(styles.dialog, styles[type], className)} {...props}>
        {emoji && <span className={classNames(styles.icon, styles.emoji)}>{emoji}</span>}
        {(icon || type) && !emoji && (
          <Icon className={styles.icon} large name={icon || dialogIcons[type]} />
        )}
        <As className={styles.message}>{children ?? message}</As>
      </Wrapper>
    );
  }

  return null;
}
