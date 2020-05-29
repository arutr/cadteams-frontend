import classNames from 'classnames';
import React from 'react';
import { ErrorMessage } from 'react-hook-form';
import Icon from 'src/components/Icon';
import styles from './Form.module.scss';

interface CheckboxProps {
  id: string;
  children?: any;
  className?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ id, children, className }: CheckboxProps, ref) => (
    <div className={classNames(styles.checkbox, className)}>
      <input id={id} name={id} type="checkbox" ref={ref} />
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
    <ErrorMessage errors={errors} name={name}>
      {({ message }) => (
        <div className={styles['fieldset-error']}>
          {filler && <span className={styles.filler} />}
          <span className={classNames(styles.error, className)}>
            <Icon name="error" /> {message}
          </span>
        </div>
      )}
    </ErrorMessage>
  );
}

interface FormProps {
  children: any;
  className?: string;
  [key: string]: any;
}

export function Form({ children, className, ...props }: FormProps) {
  return (
    <form className={classNames(styles.form, className)} {...props}>{children}</form>
  );
}

interface InputProps {
  className?: string;
  id: string;
  label: any;
  type?: string;
  [key: string]: any;
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
