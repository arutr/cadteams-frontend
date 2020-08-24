import classNames from 'classnames';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Heading2 } from 'src/components/Heading';
import { EditableTextArea, Placeholder } from 'src/components/Portfolio/Editable';
import EditButton from 'src/components/Portfolio/EditButton';
import { PortfolioProps } from 'src/components/Portfolio/index';
import cardStyles from 'src/components/Card/Card.module.scss';
import styles from 'src/components/Portfolio/Portfolio.module.scss';
import ProfileUpdateProvider from 'src/contexts/ProfileUpdateContext';
import { getFirstName } from 'src/utils/misc';

interface FormValues {
  description: string;
}

function About({ inModal, isProfile, user }: PortfolioProps) {
  const { register } = useFormContext<FormValues>();
  let descriptionHeading;
  const showChin = isProfile || !inModal;

  if (isProfile) {
    descriptionHeading = user?.type === 'enterprise' ? 'Your Company' : 'Yourself';
  } else {
    descriptionHeading = getFirstName(user?.username);
  }

  const descriptionPlaceholder = user?.type === 'individual'
    ? 'professional experience'
    : 'company';

  return (
    <form
      className={classNames(cardStyles.card, styles.card, styles.about, showChin && styles.chin)}
    >
      <Heading2 bold condensed marginTop="0">
        About {descriptionHeading}
      </Heading2>
      <p style={{ flex: 1 }}>
        <EditableTextArea
          defaultValue={user?.description}
          placeholder={`A short description of your ${descriptionPlaceholder}`}
          name="description"
          ref={register}
        >
          <Placeholder
            isProfile={isProfile}
            publicValue="No description provided"
            profileValue={`A short description of your ${descriptionPlaceholder}`}
            value={user?.description}
          />
        </EditableTextArea>
      </p>
      {isProfile && <EditButton bottom />}
    </form>
  );
}

export default function AboutSection(props: PortfolioProps) {
  return (
    <ProfileUpdateProvider>
      <About {...props} />
    </ProfileUpdateProvider>
  );
}
