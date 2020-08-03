import classNames from 'classnames';
import React, { InputHTMLAttributes } from 'react';
import styles from './Checkbox.module.scss';

export function CheckboxGroup({ children, className, ...props }: React.HTMLProps<HTMLDivElement>) {
  return (
    <div className={classNames(styles.group, className)} {...props}>
      {children}
    </div>
  );
}

const Checkbox = React.forwardRef<HTMLInputElement, InputHTMLAttributes<Element>>(
  ({
    id, children, className, name, ...props
  }: InputHTMLAttributes<Element>, ref) => (
    <div className={classNames(styles.checkbox, className)}>
      <input id={id} name={name ?? id} type="checkbox" ref={ref} {...props} />
      <label htmlFor={id}>{children}</label>
    </div>
  ),
);

export default Checkbox;
