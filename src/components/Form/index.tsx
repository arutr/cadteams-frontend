import React from 'react';
import { ErrorMessage } from 'react-hook-form';
import styles from './Form.module.scss';

interface CheckboxProps {
  id: string;
  children?: any;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ id, children }: CheckboxProps, ref) => (
    <div className={styles.checkbox}>
      <input id={id} name={id} type="checkbox" ref={ref} />
      <label htmlFor={id}>{children}</label>
    </div>
  ),
);

interface ErrorProps {
  errors: object;
  name: string;
}

export function Error({ errors, name }: ErrorProps) {
  return (
    <ErrorMessage errors={errors} name={name}>
      {({ message }) => (
        <div className={styles['fieldset-error']}>
          <span className={styles.filler} />
          <span className={styles.error}>{message}</span>
        </div>
      )}
    </ErrorMessage>
  );
}

interface Props {
  id: string;
  label: string;
  placeholder: string;
  type?: 'input' | 'radio' | 'email' | 'password';
}

export const Input = React.forwardRef<HTMLInputElement, Props>(({
  id, label, placeholder, type,
}: Props, ref) => (
  <div className={styles.fieldset}>
    <input
      id={id}
      name={id}
      type={type || 'input'}
      placeholder={placeholder}
      ref={ref}
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
