import React from 'react';
import classNames from 'classnames';
import styles from './Heading.module.scss';

interface Props {
  bold?: boolean;
  children: any;
  className?: string;
  condensed?: boolean;
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  marginTop?: string;
  marginBottom?: string;
}

function BaseHeading({
  bold, children, className, condensed, level, marginTop, marginBottom,
}: Props) {
  const Level = level;
  return (
    <Level
      className={classNames(bold && styles.bold, condensed && styles.condensed, className)}
      style={{ marginTop, marginBottom }}
    >
      {children}
    </Level>
  );
}

export const Heading1 = (props: Props) => BaseHeading({ ...props, level: 'h1' });
export const Heading2 = (props: Props) => BaseHeading({ ...props, level: 'h2' });
export const Heading3 = (props: Props) => BaseHeading({ ...props, level: 'h3' });
export const Heading4 = (props: Props) => BaseHeading({ ...props, level: 'h4' });
export const Heading5 = (props: Props) => BaseHeading({ ...props, level: 'h5' });
export const Heading6 = (props: Props) => BaseHeading({ ...props, level: 'h6' });
