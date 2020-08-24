import classNames from 'classnames';
import React from 'react';
import Button from 'src/components/Button';
import Icon from 'src/components/Icon';
import styles from './CalendarTile.module.scss';

export type CalendarTileStatus = 'available' | 'unavailable' | 'booked';

interface Props {
  booking?: object;
  date: Date;
  status: CalendarTileStatus;
}

const buttonColor = {
  available: 'error',
  unavailable: 'success',
};
const buttonContent = {
  available: (<><Icon name="lock-closed" small /> Mark as Unavailable</>),
  unavailable: (<><Icon name="lock-open" small /> Mark as Available</>),
  booked: (<><Icon name="view" small /> View Project</>),
};

export default function CalendarTile(props: Props) {
  const { booking, date, status } = props;

  return (
    <article className={classNames(styles.tile, styles[status])}>
      <header className={styles.date}>{date.getDate()}</header>
      <p className={styles.status}>{status}</p>
      {booking && (
        <div>{booking}</div>
      )}
      <Button
        type="button"
        color={buttonColor[status]}
        className={styles.button}
      >
        {buttonContent[status]}
      </Button>
    </article>
  );
}
