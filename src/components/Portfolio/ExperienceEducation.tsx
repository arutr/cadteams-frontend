import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import WorkHistory from 'src/api/WorkHistory';
import Button from 'src/components/Button';
import Dialog from 'src/components/Dialog';
import { Heading2 } from 'src/components/Heading';
import Icon from 'src/components/Icon';
import { EditableInput, Placeholder } from 'src/components/Portfolio/Editable';
import EditButton from 'src/components/Portfolio/EditButton';
import { PortfolioProps } from 'src/components/Portfolio/index';
import layout from 'src/components/Portfolio/Portfolio.module.scss';
import ProfileUpdateProvider, { useProfileUpdate } from 'src/contexts/ProfileUpdateContext';
import styles from './ExperienceEducation.module.scss';

const icons = {
  education: 'education',
  employment: 'briefcase',
};

interface FormValues {
  history: WorkHistory[];
}

function ExperienceEducation(props: PortfolioProps) {
  const { register, reset } = useFormContext<FormValues>();
  const { editing } = useProfileUpdate();
  const [history, setHistory] = useState<WorkHistory[]>();
  const { inModal, isProfile, user } = props;
  const showChin = isProfile || !inModal;
  const removeEntry = (id) => {
    setHistory(history.filter((entry) => entry.id !== id));
    reset();
  };
  const addEntry = (type) => setHistory([...history, {
    id: (history[history.length - 1]?.id ?? 0) + 1,
    startYear: null,
    title: '',
    type,
  }]);

  useEffect(() => {
    const newHistory = user?.history?.sort((a, b) => {
      const startYearDifference = b.startYear - a.startYear;

      if (startYearDifference !== 0) {
        return startYearDifference;
      }

      return b.endYear - a.endYear;
    });
    setHistory(newHistory);
  }, [user]);

  if (user?.type === 'individual') {
    return (
      <form className={classNames(layout.card, showChin && layout.chin)}>
        <Heading2 marginTop="0" condensed bold>
          Experience and Education
        </Heading2>
        {history?.length ? history.map((entry, index) => (
          <React.Fragment key={entry.id}>
            <Dialog className={styles.entry} icon={icons[entry.type]}>
              <span className={styles.wrapper}>
                <EditableInput
                  defaultValue={entry.startYear}
                  placeholder="YYYY"
                  name={`history[${index}].startYear`}
                  type="number"
                  min={1980}
                  style={{ maxWidth: '5rem' }}
                  ref={register({ required: true, min: 1980 })}
                >
                  <Placeholder
                    isProfile={isProfile}
                    publicValue="N/A"
                    profileValue="Start year"
                    value={entry.startYear?.toString()}
                  />
                </EditableInput>
                &mdash;
                <EditableInput
                  defaultValue={entry.endYear > 0 ? entry.endYear : ''}
                  placeholder="YYYY"
                  name={`history[${index}].endYear`}
                  type="number"
                  min={1980}
                  style={{ maxWidth: '5rem' }}
                  ref={register({ min: 1980 })}
                >
                  <Placeholder
                    isProfile={isProfile}
                    publicValue="Current"
                    profileValue="End year"
                    value={entry.endYear > 0 ? entry.endYear.toString() : 'Current'}
                  />
                </EditableInput>
                <br />
                <EditableInput
                  defaultValue={entry.organization}
                  placeholder="Organisation"
                  name={`history[${index}].organization`}
                  ref={register}
                >
                  <Placeholder
                    isProfile={isProfile}
                    publicValue=""
                    value={entry.organization}
                  />
                </EditableInput>
                {entry.organization && <br />}
                <EditableInput
                  defaultValue={entry.title}
                  placeholder="Title"
                  name={`history[${index}].title`}
                  ref={register({ required: true })}
                >
                  <Placeholder
                    isProfile={isProfile}
                    publicValue=""
                    profileValue="Title"
                    value={entry.title}
                  />
                </EditableInput>
                <br />
                <EditableInput
                  defaultValue={entry.location}
                  placeholder="Location"
                  name={`history[${index}].location`}
                  ref={register}
                >
                  <Placeholder
                    isProfile={isProfile}
                    publicValue=""
                    value={entry.location}
                  />
                </EditableInput>
                {editing && (
                  <input
                    type="hidden"
                    name={`history[${index}].type`}
                    value={entry.type}
                    ref={register}
                  />
                )}
              </span>
              {editing && (
                <Icon
                  role="button"
                  className={styles.remove}
                  name="close"
                  onClick={() => removeEntry(entry.id)}
                />
              )}
            </Dialog>
          </React.Fragment>
        )) : (
          <p>
            <Placeholder
              isProfile={isProfile}
              publicValue="No experience specified"
              profileValue="A timeline of your professional and academic experience"
            />
            <input type="hidden" name="history[]" ref={register} />
          </p>
        )}
        {editing && (
          <div className={styles.buttons}>
            <Button type="button" color="success" onClick={() => addEntry('employment')}>
              <Icon name="briefcase" /> Add Employment
            </Button>
            <Button type="button" color="success" onClick={() => addEntry('education')}>
              <Icon name="education" /> Add Education
            </Button>
          </div>
        )}
        {isProfile && <EditButton bottom />}
      </form>
    );
  }

  return null;
}

export default function (props: PortfolioProps) {
  return (
    <ProfileUpdateProvider>
      <ExperienceEducation {...props} />
    </ProfileUpdateProvider>
  );
}
