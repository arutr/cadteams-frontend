import React from 'react';
import { useFormContext } from 'react-hook-form';
import { UniqueSkill } from 'src/api/User';
import { Heading2 } from 'src/components/Heading';
import Icon from 'src/components/Icon';
import { EditableInput, Placeholder } from 'src/components/Portfolio/Editable';
import EditButton from 'src/components/Portfolio/EditButton';
import { PortfolioSectionProps } from 'src/components/Portfolio/index';
import styles from 'src/components/Portfolio/Portfolio.module.scss';
import ProfileUpdateProvider from 'src/contexts/ProfileUpdateContext';

interface UpdateFormValues {
  uniqueSkills: UniqueSkill[];
}

function UpdateForm({ isProfile, ...props }: PortfolioSectionProps) {
  const { register } = useFormContext<UpdateFormValues>();
  // eslint-disable-next-line react/destructuring-assignment
  const user = (props.user as Individual);
  return (
    <form className={styles.row}>
      {[1, 2, 3].map((_, index) => (
        <article key={index} className={styles.card}>
          <Heading3>
            <EditableInput
              defaultValue={user?.uniqueSkills?.[index]?.skill}
              placeholder="Something which makes you stand out"
              name={`uniqueSkills[${index}].skill`}
              ref={register}
              style={{ width: '96%' }}
            >
              <Placeholder
                isProfile={isProfile}
                publicValue="N/A"
                profileValue="Something which makes you stand out"
                value={user?.uniqueSkills?.[index]?.skill}
              />
            </EditableInput>
          </Heading3>
        </article>
      ))}
    </form>
  );
}

export default function UniqueSkills(props: PortfolioSectionProps) {
  const { isProfile, setDialog, user } = props;
  return !isProfile || user?.type === 'individual' ? (
    <ProfileUpdateProvider<UpdateFormValues> setDialog={setDialog}>
      <section className={styles['unique-skills']}>
        <Heading2 marginTop="0" condensed bold>
          Unique Skills
          {isProfile && <EditButton />}
        </Heading2>
        <UpdateForm {...props} />
      </section>
    </ProfileUpdateProvider>
  ) : null;
}
