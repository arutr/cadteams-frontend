import classNames from 'classnames';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { UniqueSkill } from 'src/api/User';
import { Heading2 } from 'src/components/Heading';
import Icon from 'src/components/Icon';
import { EditableInput, Placeholder } from 'src/components/Portfolio/Editable';
import EditButton from 'src/components/Portfolio/EditButton';
import { PortfolioProps } from 'src/components/Portfolio/index';
import layout from 'src/components/Portfolio/Portfolio.module.scss';
import ProfileUpdateProvider from 'src/contexts/ProfileUpdateContext';
import styles from './UniqueSkills.module.scss';

interface UpdateFormValues {
  uniqueSkills: UniqueSkill[];
}

function UniqueSkills(props: PortfolioProps) {
  const { register } = useFormContext<UpdateFormValues>();
  const { demo, isProfile, user } = props;
  const showChin = isProfile || !demo;

  if (user?.type === 'individual') {
    return (
      <form className={classNames(layout.card, styles.uniqueSkills, showChin && layout.chin)}>
        <Heading2 marginTop="0" condensed bold>
          Unique Skills
        </Heading2>
        <ul>
          {[1, 2, 3].map((_, index) => (
            <li key={index}>
              <Icon className={layout.icon} large name="verified" />
              <EditableInput
                defaultValue={user?.uniqueSkills?.[index]?.skill}
                placeholder="Something which makes you stand out"
                name={`uniqueSkills[${index}].skill`}
                ref={register}
              >
                <Placeholder
                  isProfile={isProfile}
                  publicValue="N/A"
                  profileValue="Something which makes you stand out"
                  value={user?.uniqueSkills?.[index]?.skill}
                />
              </EditableInput>
            </li>
          ))}
        </ul>
        {isProfile && <EditButton bottom />}
      </form>
    );
  }

  return null;
}

export default function (props: PortfolioProps) {
  return (
    <ProfileUpdateProvider>
      <UniqueSkills {...props} />
    </ProfileUpdateProvider>
  );
}
