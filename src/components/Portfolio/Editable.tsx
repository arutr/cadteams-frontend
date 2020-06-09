import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { useProfileUpdate } from 'src/contexts/ProfileUpdateContext';
import styles from './Editable.module.scss';
import portfolioStyles from './Portfolio.module.scss';

interface Props {
  children: any;
  placeholder: any;
  defaultValue: string;
  [key: string]: any;
}

type DropdownProps = {
  options: {
    label: string;
    value: string;
  }[];
} & Props;

export const EditableDropdown = React.forwardRef<HTMLSelectElement, DropdownProps>(({
  children, placeholder, defaultValue, options, ...props
}: DropdownProps, ref) => {
  const { editing } = useProfileUpdate();
  if (editing) {
    return (
      <select
        className={styles.editable}
        defaultValue={defaultValue}
        ref={ref}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map(({ label, value }, index) => (
          <option key={index} value={value}>{label}</option>
        ))}
      </select>
    );
  }

  return children;
});

type InputProps = {
  prefix?: string;
  suffix?: string;
} & Props;

export const EditableInput = React.forwardRef<HTMLInputElement, InputProps>(({
  children, placeholder, defaultValue, prefix, suffix, ...props
}: InputProps, ref) => {
  const { editing } = useProfileUpdate();
  if (editing) {
    return (
      <>
        {prefix && <span>{prefix}</span>}
        <input
          className={styles.editable}
          placeholder={placeholder}
          defaultValue={defaultValue}
          type="input"
          ref={ref}
          {...props}
        />
        {suffix && <span>{suffix}</span>}
      </>
    );
  }

  return children;
});

export const EditableTextArea = React.forwardRef<HTMLTextAreaElement, Props>(({
  children, placeholder, defaultValue, ...props
}: Props, ref) => {
  const { editing } = useProfileUpdate();
  if (editing) {
    return (
      <textarea
        className={styles.editable}
        placeholder={placeholder}
        defaultValue={defaultValue}
        ref={ref}
        {...props}
      />
    );
  }

  return children;
});

export function EditableLabel({ labels, placeholder, setLabels }) {
  return (
    <input
      className={classNames(styles.editable, styles.label)}
      placeholder={placeholder}
      onKeyDown={({ key, currentTarget }) => {
        if (key === 'Enter' && currentTarget.value.length) {
          setLabels([...labels, {
            id: (labels[labels.length - 1]?.id ?? 0) + 1,
            label: currentTarget.value,
          }]);
          // eslint-disable-next-line no-param-reassign
          currentTarget.value = '';
        }
      }}
    />
  );
}

EditableLabel.propTypes = {
  labels: PropTypes.array.isRequired,
  placeholder: PropTypes.string.isRequired,
  setLabels: PropTypes.func.isRequired,
};

export function Placeholder({
  value, publicValue, isProfile, profileValue,
}) {
  if (value?.length || value?.props?.children?.length) {
    return value;
  }

  return (
    <span className={portfolioStyles.placeholder}>
      {isProfile ? profileValue : publicValue}
    </span>
  );
}

Placeholder.propTypes = {
  isProfile: PropTypes.bool,
  profileValue: PropTypes.node.isRequired,
  publicValue: PropTypes.node.isRequired,
  value: PropTypes.node,
};

Placeholder.defaultProps = {
  isProfile: false,
  value: null,
};
