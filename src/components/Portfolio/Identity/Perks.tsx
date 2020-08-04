import React from 'react';
import { useFormContext } from 'react-hook-form';
import Dialog from 'src/components/Dialog';
import Checkbox from 'src/components/Form/Checkbox';
import Icon from 'src/components/Icon';
import Link from 'src/components/Link';
import styles from 'src/components/Portfolio/Identity/Identity.module.scss';
import { PortfolioProps } from 'src/components/Portfolio/index';
import { calendly } from 'src/components/Portfolio/Status';
import { useProfileUpdate } from 'src/contexts/ProfileUpdateContext';
import { analyzeUserProfile, getUserProfileProblems, getUserProfileStatus } from 'src/utils/user';

interface PerksFormValues {
  instantBooking: boolean;
}

export default function Perks(props: PortfolioProps) {
  const { user, isProfile } = props;
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

  const analysis = analyzeUserProfile(user);
  const problems = getUserProfileProblems(user, analysis);
  const status = getUserProfileStatus(user, problems);

  return (
    <div className={styles.perks}>
      {user?.verified && (
        <Dialog icon="verified">
          Verified by <b>CAD</b>teams
        </Dialog>
      )}
      {!user?.verified && status !== 'complete' && (
        <Dialog icon="clipboard">
          Pending verification
        </Dialog>
      )}
      {!user?.verified && status === 'complete' && isProfile && (
        <Dialog icon="clipboard">
          <Link external underlined href={calendly}>Ready for verification</Link>
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
