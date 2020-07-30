import { ErrorMessage } from '@hookform/error-message';
import classNames from 'classnames';
import React, { FormHTMLAttributes, HTMLAttributes, InputHTMLAttributes } from 'react';
import Icon from 'src/components/Icon';
import styles from './Form.module.scss';

export const Checkbox = React.forwardRef<HTMLInputElement, InputHTMLAttributes<Element>>(
  ({
    id, children, className, ...props
  }: InputHTMLAttributes<Element>, ref) => (
    <div className={classNames(styles.checkbox, className)}>
      <input id={id} name={id} type="checkbox" ref={ref} {...props} />
      <label htmlFor={id}>{children}</label>
    </div>
  ),
);

interface ErrorProps {
  name: string;
  errors: object;
  filler?: boolean;
  className?: string;
}

export function Error({
  className, errors, filler = true, name,
}: ErrorProps) {
  return (
    <ErrorMessage
      errors={errors}
      name={name}
      render={({ message }) => (
        <div className={styles['fieldset-error']}>
          {filler && <span className={styles.filler} />}
          <span className={classNames(styles.error, className)}>
            <Icon name="error" /> {message}
          </span>
        </div>
      )}
    />
  );
}

export function Form({ children, className, ...props }: FormHTMLAttributes<Element>) {
  return (
    <form className={classNames(styles.form, className)} {...props}>{children}</form>
  );
}

export function Fieldset({ children, className, ...props }: HTMLAttributes<Element>) {
  return (
    <div className={classNames(styles.fieldset, className)} {...props}>{children}</div>
  );
}

interface InputProps extends InputHTMLAttributes<Element> {
  label: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  className, id, label, type, ...props
}: InputProps, ref) => (
  <div className={classNames(styles.fieldset, className)}>
    <input
      className={styles.input}
      id={id}
      name={id}
      type={type || 'input'}
      ref={ref}
      {...props}
    />
    <label htmlFor={id}>{label}</label>
  </div>
));

interface RadioProps {
  id: string;
  labels: string[];
  legend: string;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(({
  id, labels, legend,
}: RadioProps, ref) => (
  <div className={styles.fieldset}>
    <legend>{legend}</legend>
    <div className={styles.radio}>
      {labels.map((label, index) => {
        const value = label.toLowerCase();
        return (
          <div className={styles.option} key={index}>
            <input
              defaultChecked={index === 0}
              id={value}
              name={id}
              value={value}
              type="radio"
              ref={ref}
            />
            <label htmlFor={value}>{label}</label>
          </div>
        );
      })}
    </div>
  </div>
));

interface DropdownProps extends React.HTMLProps<HTMLSelectElement> {
  options: {
    label: string;
    value: string;
  }[];
}

export const Select = React.forwardRef<HTMLSelectElement, DropdownProps>(({
  placeholder, defaultValue, options, ...props
}: DropdownProps, ref) => (
  <select
    className={styles.select}
    defaultValue={defaultValue}
    ref={ref}
    {...props}
  >
    {placeholder && <option value="">{placeholder}</option>}
    {options.map(({ label, value }, index) => (
      <option key={index} value={value}>{label}</option>
    ))}
  </select>
));
