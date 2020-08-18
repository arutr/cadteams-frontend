import { ErrorMessage } from '@hookform/error-message';
import classNames from 'classnames';
import React, { FormHTMLAttributes, HTMLAttributes, InputHTMLAttributes } from 'react';
import Icon from 'src/components/Icon';
import styles from './Form.module.scss';

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

interface RadioSliderProps extends React.HTMLProps<HTMLInputElement> {
  labels: {
    name: string;
    value: string;
  }[] | string[];
  legend?: string;
}

export const RadioSlider = React.forwardRef<HTMLInputElement, RadioSliderProps>(({
  className, labels, legend, style, ...props
}: RadioSliderProps, ref) => (
  <div className={styles.fieldset}>
    {legend && <legend>{legend}</legend>}
    <div className={classNames(styles.radio, className, style)}>
      {(labels as any).map((label, index) => {
        if (typeof label === 'object') {
          return (
            <div className={styles.option} key={index}>
              <input
                defaultChecked={index === 0}
                id={label.value}
                value={label.value}
                type="radio"
                ref={ref}
                {...props}
              />
              <label htmlFor={label.value}>{label.name}</label>
            </div>
          );
        }

        const value = label.toLowerCase();
        return (
          <div className={styles.option} key={index}>
            <input
              defaultChecked={index === 0}
              id={value}
              value={value}
              type="radio"
              ref={ref}
              {...props}
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
