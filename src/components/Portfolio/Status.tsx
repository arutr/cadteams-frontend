import React from 'react';
import Dialog, { DialogType } from 'src/components/Dialog';
import Icon from 'src/components/Icon';
import Link from 'src/components/Link';
import { useAuth } from 'src/contexts/AuthProvider';
import styles from './Status.module.scss';

export default function Status() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  if (user.verified) {
    return (
      <Dialog className={styles.status} type={DialogType.Success}>
        Your profile is <strong>verified</strong> and will be published in the specialist gallery
        on the <Icon name="shop" /> Explore page. Good luck in discovering new opportunities!
      </Dialog>
    );
  }

  const analysis = [
    {
      status: !!user.profilePicture,
      message: 'Your profile picture',
    },
    {
      status: !!user.specialization,
      message: 'Your specialisation',
    },
    {
      status: user.sectors?.length,
      message: (<><strong>At least one</strong> industry sector you work in</>),
    },
    {
      status: !!user.location && !!user.country,
      message: 'Your location and country',
    },
    {
      status: !!user.experience,
      message: 'Years of professional experience',
    },
    {
      status: user.languages?.length,
      message: (<><strong>At least one</strong> language you speak</>),
    },
    {
      status: user.tools?.length,
      message: 'Modelling/rendering tool(s) you use',
    },
    {
      status: !!user.dailyRate,
      message: 'Your daily rate',
    },
    {
      status: user.designs?.length > 1,
      message: (<><strong>At least two</strong> sample designs</>),
    },
    {
      status: !!user.description,
      message: 'Brief description of your professional experience',
    },
    {
      status: user.history?.length,
      message: 'Timeline of your professional and academic experience',
    },
    {
      status: user.uniqueSkills?.find(({ skill }) => skill.length),
      message: (<><strong>At least one</strong> unique skill</>),
    },
    {
      status: user.contactEmail || user.phone,
      message: (<>Contact e-mail address <strong>or</strong> phone number</>),
    },
  ];
  const problems = analysis.filter(({ status }) => !status);

  if (analysis.length === problems.length) {
    return (
      <Dialog emoji="&#x1f44b;" className={styles.status} type={DialogType.Info}>
        Welcome to <b>CAD</b>teams! To get started, fill out your profile.
        Once it's complete, we will get in touch with you regarding the verification process.
      </Dialog>
    );
  }

  if (problems.length) {
    return (
      <Dialog as="div" className={styles.status} type={DialogType.Warning}>
        Your profile is <strong>not complete</strong>. The following information is missing:
        <ul>
          {problems.map(({ message }, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      </Dialog>
    );
  }

  return (
    <Dialog className={styles.status} type={DialogType.Info}>
      Your profile is complete and <strong>pending verification</strong>. If we don't get in touch
      with you within the next few days, please contact us via Live Chat
      or <Link external href="mailto:hello@cadteams.com">send us an e-mail</Link>.
    </Dialog>
  );
}
