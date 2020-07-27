import React from 'react';
import { useFormContext } from 'react-hook-form';
import Dialog, { DialogType } from 'src/components/Dialog';
import { Checkbox } from 'src/components/Form';
import Icon from 'src/components/Icon';
import styles from 'src/components/Portfolio/Identity/Identity.module.scss';
import { PortfolioProps } from 'src/components/Portfolio/index';
import { useProfileUpdate } from 'src/contexts/ProfileUpdateContext';

interface PerksFormValues {
  instantBooking: boolean;
}

export default function Perks(props: PortfolioProps) {
  const { user } = props;
  const { editing } = useProfileUpdate();
  const { register } = useFormContext<PerksFormValues>();

  if (editing) {
    return (
      <form className={styles.perks}>
        <Checkbox id="instantBooking" ref={register} defaultChecked={user?.instantBooking}>
          Enable <Icon name="time-quick" /> <strong>Instant Booking</strong> to approve
          all project
          bookings automatically.
        </Checkbox>
      </form>
    );
  }

  return (
    <div className={styles.perks}>
      {user?.verified ? (
        <Dialog icon="verified">
          Verified by <b>CAD</b>teams
        </Dialog>
      ) : (
        <Dialog icon="clipboard">
          Pending verification
        </Dialog>
      )}
      {user?.instantBooking && (
        <span>
          <Icon name="time-quick" /> Instant Booking
        </span>
      )}
    </div>
  );
}
