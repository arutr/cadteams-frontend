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
  prefix?: string;
  suffix?: string;
  [key: string]: any;
}

export const EditableInput = React.forwardRef<HTMLInputElement, Props>(({
  children, placeholder, defaultValue, prefix, suffix, ...props
}: Props, ref) => {
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
      <>
        <textarea
          className={styles.editable}
          placeholder={placeholder}
          defaultValue={defaultValue}
          ref={ref}
          {...props}
        />
      </>
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
  isProfile: PropTypes.bool.isRequired,
  profileValue: PropTypes.node.isRequired,
  publicValue: PropTypes.node.isRequired,
  value: PropTypes.node,
};

Placeholder.defaultProps = {
  value: null,
};
