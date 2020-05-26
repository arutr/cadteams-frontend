import React from 'react';
import Button from 'src/components/Button';
import Icon from 'src/components/Icon';
import styles from 'src/components/Portfolio/Portfolio.module.scss';
import { useProfileUpdate } from 'src/contexts/ProfileUpdateContext';

export default function EditButton() {
  const { editing, handleUpdateSubmit } = useProfileUpdate();
  return (
    <Button
      onClick={handleUpdateSubmit}
      className={styles.edit}
      type="button"
    >
      <Icon
        name={editing ? 'check' : 'pencil'}
        inverted
        title={editing ? 'Submit changes' : 'Edit section'}
      />
    </Button>
  );
}
