import React from 'react';
import dynamic from 'next/dynamic';
import classNames from 'classnames';
import styles from './Icon.module.scss';

interface Props {
  name: string;
  className?: string;
  inverted?: boolean;
  large?: boolean;
  [key: string]: any;
}

function Icon({
  name, inverted, large, className, ...props
}: Props) {
  const SvgComponent = dynamic(() => import(`../../../assets/icons/${name}.svg`));
  return (
    <span
      className={classNames(styles.icon,
        className,
        inverted && styles.inverted,
        large && styles.large)}
      {...props}
    >
      <SvgComponent />
    </span>
  );
}

export default Icon;
