import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'src/components/Button';
import Icon from 'src/components/Icon';
import styles from 'src/components/Portfolio/Portfolio.module.scss';
import { useProfileUpdate } from 'src/contexts/ProfileUpdateContext';

export function PortfolioButton({
  bottom, children, className, corner, onClick,
}) {
  return (
    <Button
      onClick={onClick}
      className={classNames(
        styles.edit,
        bottom && styles.bottom,
        corner && styles.corner,
        className,
      )}
      type="button"
    >
      {children}
    </Button>
  );
}

PortfolioButton.propTypes = {
  bottom: PropTypes.bool,
  corner: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.any,
  onClick: PropTypes.func,
};
PortfolioButton.defaultProps = {
  bottom: false,
  corner: false,
  className: null,
  onClick: null,
};

export default function EditButton(props) {
  const { editing, handleUpdateSubmit } = useProfileUpdate();
  return (
    <PortfolioButton {...props} onClick={handleUpdateSubmit} className={editing && styles.editing}>
      <Icon
        name={editing ? 'check' : 'pencil'}
        inverted
        title={editing ? 'Submit changes' : 'Edit section'}
      />
      <span className={styles.label}>{editing ? 'Apply Changes' : 'Edit Section'}</span>
    </PortfolioButton>
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
