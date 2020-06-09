import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'src/components/Button';
import Icon from 'src/components/Icon';
import styles from 'src/components/Portfolio/Portfolio.module.scss';
import { useProfileUpdate } from 'src/contexts/ProfileUpdateContext';

export default function EditButton({ bottom, corner }) {
  const { editing, handleUpdateSubmit } = useProfileUpdate();
  return (
    <Button
      onClick={handleUpdateSubmit}
      className={classNames(
        styles.edit,
        bottom && styles.bottom,
        corner && styles.corner,
        editing && styles.editing,
      )}
      type="button"
    >
      <Icon
        name={editing ? 'check' : 'pencil'}
        inverted
        title={editing ? 'Submit changes' : 'Edit section'}
      />
      <span className={styles.label}>{editing ? 'Apply Changes' : 'Edit Section'}</span>
    </Button>
  );
}

EditButton.propTypes = {
  bottom: PropTypes.bool,
  corner: PropTypes.bool,
};
EditButton.defaultProps = {
  bottom: false,
  corner: false,
};
