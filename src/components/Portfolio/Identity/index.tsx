import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Label as LabelType } from 'src/api/User';
import Icon from 'src/components/Icon';
import Label from 'src/components/Label';
import EditButton, { PortfolioButton } from 'src/components/Portfolio/EditButton';
import Information, { InformationProps } from 'src/components/Portfolio/Identity/Information';
import Perks from 'src/components/Portfolio/Identity/Perks';
import ProfilePicture from 'src/components/Portfolio/Identity/ProfilePicture';
import { PortfolioModal, PortfolioProps } from 'src/components/Portfolio/index';
import layout from 'src/components/Portfolio/Portfolio.module.scss';
import ProfileUpdateProvider from 'src/contexts/ProfileUpdateContext';
import styles from './Identity.module.scss';

interface IdentityCardProps extends InformationProps {
  className?: string;
  currency?: string;
  exchangeRate?: number;
}

export function IdentityCard(props: IdentityCardProps) {
  const {
    className,
    currency,
    exchangeRate = 1.0,
    demo,
    isProfile,
    inModal,
    user,
  } = props;
  const [demoModal, setDemoModal] = useState(false);
  const toggleDemoModal = () => setDemoModal(!demoModal);
  const showChin = isProfile || !inModal;
  const currencyFormat = new Intl.NumberFormat(
    'en-GB',
    {
      style: 'currency',
      currency: currency ?? 'GBP',
    },
  );

  return (
    <>
      <div className={classNames(
        layout.card,
        showChin && layout.chin,
        className,
      )}
      >
        <div className={styles.identity}>
          {demo && !inModal && user?.dailyRate && (
            <Label className={styles.rate}>
              {currencyFormat.format(user.dailyRate * exchangeRate)}/day
            </Label>
          )}
          <ProfilePicture {...props} />
          <Information {...props} />
          {isProfile && <EditButton bottom />}
          {demo && !inModal && (
            <PortfolioButton
              bottom
              onClick={toggleDemoModal}
            >
              <Icon
                name="view"
                inverted
                title="View portfolio"
              />
              <span className={layout.label}>View Portfolio</span>
            </PortfolioButton>
          )}
        </div>
        <Perks {...props} />
      </div>
      {demoModal && (
        <PortfolioModal onClose={toggleDemoModal} user={user} demo />
      )}
    </>
  );
}

export default function Identity(props: PortfolioProps) {
  const [sectors, setSectors] = useState<LabelType[]>();
  const { user } = props;

  useEffect(() => {
    if (!sectors && user?.sectors) {
      setSectors(user.sectors);
    }
  }, [user]);

  return (
    <ProfileUpdateProvider labelStates={{ sectors }}>
      <IdentityCard sectors={sectors} setSectors={setSectors} {...props} />
    </ProfileUpdateProvider>
  );
}
