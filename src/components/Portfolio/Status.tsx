import React from 'react';
import Dialog, { DialogType } from 'src/components/Dialog';
import Icon from 'src/components/Icon';
import Link from 'src/components/Link';
import { useAuth } from 'src/contexts/AuthProvider';
import { analyzeUserProfile, getUserProfileProblems, getUserProfileStatus } from 'src/utils/user';
import styles from './Status.module.scss';

export const calendly = 'https://calendly.com/peter-cadteams/meeting';

export default function Status() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  if (user.verified) {
    return (
      <Dialog className={styles.status} type={DialogType.Success}>
        Your profile is <strong>verified</strong> and will be published in the specialist gallery
        on
        the <Link underlined inverted href="/app/explore"><Icon name="shop" /> Explore page</Link>.
        Good luck in discovering new opportunities!
      </Dialog>
    );
  }

  const analysis = analyzeUserProfile(user);
  const problems = getUserProfileProblems(user, analysis);
  const status = getUserProfileStatus(user, problems);

  switch (status) {
    case 'new':
      return (
        <Dialog emoji="&#x1f44b;" className={styles.status} type={DialogType.Info}>
          Welcome to <b>CAD</b>teams! To get started, fill out your profile.
          Once it's complete, you will be able to schedule a verification meeting with us.
        </Dialog>
      );
    case 'incomplete':
      return (
        <Dialog as="div" className={styles.status} type={DialogType.Warning}>
          <strong>Your profile is not complete</strong>. In order to verify your profile, please
          include the following information:
          <ul>
            {problems.map(({ message }, index) => (
              <li key={index}>{message}</li>
            ))}
          </ul>
        </Dialog>
      );
    case 'complete':
      return (
        <Dialog icon="clipboard" className={styles.status} type={DialogType.Warning}>
          <strong>Your profile is complete!</strong> To proceed with the verification process,
          please&nbsp;
          <Link inverted external underlined href={calendly}>
            schedule a meeting with us
          </Link>.
          <br />
          If you have any questions or concerns, please contact us via Live Chat or&nbsp;
          <Link inverted underlined external href="mailto:hello@cadteams.com">send us an e-mail</Link>.
        </Dialog>
      );
    default:
      return null;
  }
}
