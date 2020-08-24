import React from 'react';
import dynamic from 'next/dynamic';
import classNames from 'classnames';
import styles from './Icon.module.scss';

interface Props extends React.HTMLProps<HTMLSpanElement> {
  name: string;
  inverted?: boolean;
  large?: boolean;
  small?: boolean;
}

function Icon({
  className, inverted, name, large, small, ...props
}: Props) {
  const SvgComponent = dynamic(() => import(`assets/icons/${name}.svg`));
  return (
    <span
      className={classNames(
        styles.icon,
        className,
        inverted && styles.inverted,
        large && styles.large,
        small && styles.small,
      )}
      {...props}
    >
      <SvgComponent />
    </span>
  );
}

export default Icon;
