import classNames from 'classnames';
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Label as LabelType } from 'src/api/User';
import Dialog from 'src/components/Dialog';
import { Error } from 'src/components/Form';
import Icon from 'src/components/Icon';
import Label, { LabelContainer } from 'src/components/Label';
import Link from 'src/components/Link';
import { EditableInput, EditableLabel, Placeholder } from 'src/components/Portfolio/Editable';
import EditButton from 'src/components/Portfolio/EditButton';
import { PortfolioSectionProps } from 'src/components/Portfolio/index';
import styles from 'src/components/Portfolio/Portfolio.module.scss';
import ProfileUpdateProvider, {
  removeLabel,
  useProfileUpdate,
} from 'src/contexts/ProfileUpdateContext';
import validator from 'validator';

interface UpdateFormValues {
  location: string;
  experience: number;
  website: string;
}

type UpdateFormProps = {
  languages: LabelType[],
  tools: LabelType[],
  setLanguages: (languages) => void,
  setTools: (tools) => void,
} & PortfolioSectionProps;

function UpdateForm({
  isProfile, languages, setLanguages, tools, setTools, user,
}: UpdateFormProps) {
  const { register, errors } = useFormContext<UpdateFormValues>();
  const { editing } = useProfileUpdate();
  const removeLanguage = removeLabel(languages, setLanguages);
  const removeTool = removeLabel(tools, setTools);

  return (
    <form className={classNames(styles.card, styles.skills)}>
      {isProfile && <EditButton />}
      {user?.type === 'individual' && (
        <>
          <div className={styles.row}>
            <div>
              <Icon className={styles.icon} large name="location" title="Location" />
              <EditableInput
                defaultValue={user?.location}
                placeholder="Your location"
                name="location"
                ref={register}
              >
                <Placeholder
                  isProfile={isProfile}
                  publicValue="N/A"
                  profileValue="Your location"
                  value={user?.location}
                />
              </EditableInput>
            </div>
            <div>
              <Icon
                className={styles.icon}
                large
                name="medal"
                title="Years of professional experience"
              />
              <EditableInput
                defaultValue={user?.experience}
                placeholder="YY"
                name="experience"
                suffix="&ensp;year(s) of experience"
                type="number"
                style={{ maxWidth: '3rem' }}
                ref={register({ min: 0 })}
              >
                <Placeholder
                  isProfile={isProfile}
                  publicValue="N/A"
                  profileValue="Years of professional experience"
                  value={user?.experience && (
                    <span><strong>{user?.experience}</strong> years of experience</span>
                  )}
                />
              </EditableInput>
            </div>
          </div>
          {editing && (
            <Dialog small type="hint">
              Type in a label into a dashed field below and press <strong>Enter</strong> to apply.
            </Dialog>
          )}
          <div className={styles.languages}>
            <Icon className={styles.icon} large name="language" title="Spoken languages" />
            <LabelContainer>
              {languages?.length ? languages.map(({ id, label }) => (
                <Label key={id} removeLabel={editing ? (() => removeLanguage(id)) : null}>
                  {label}
                </Label>
              )) : null}
              {!editing && !languages?.length && isProfile && (
                <Label className={styles.placeholder}>Spoken language(s)</Label>
              )}
              {editing && (
                <EditableLabel
                  labels={languages}
                  placeholder="Spoken language"
                  setLabels={setLanguages}
                />
              )}
            </LabelContainer>
          </div>
          <div>
            <Icon
              className={styles.icon}
              large
              name="ruler"
              title="Modelling/Rendering software"
            />
            <LabelContainer>
              {tools?.length ? tools.map(({ id, label }) => (
                <Label key={id} removeLabel={editing ? (() => removeTool(id)) : null}>
                  {label}
                </Label>
              )) : null}
              {!editing && !tools?.length && isProfile && (
                <Label className={styles.placeholder}>Modelling/Rendering software</Label>
              )}
              {editing && (
                <EditableLabel
                  labels={tools}
                  placeholder="Modelling/Rendering software"
                  setLabels={setTools}
                />
              )}
            </LabelContainer>
          </div>
        </>
      )}
      {user?.type === 'enterprise' && (
        <>
          <div>
            <Icon className={styles.icon} large name="location" title="Company location" />
            <EditableInput
              defaultValue={user?.location}
              placeholder="Company location"
              name="location"
              ref={register}
            >
              <Placeholder
                isProfile={isProfile}
                publicValue="N/A"
                profileValue="Company location"
                value={user?.location}
              />
            </EditableInput>
          </div>
          <div>
            <Icon className={styles.icon} large name="building" title="Establishing year" />
            <EditableInput
              defaultValue={user?.experience > 0 ? user.experience : new Date().getFullYear()}
              placeholder="YYYY"
              name="experience"
              prefix="Established in&ensp;"
              type="number"
              style={{ maxWidth: '5rem' }}
              ref={register({ min: 0 })}
            >
              <Placeholder
                isProfile={isProfile}
                publicValue="N/A"
                profileValue="Year of company establishing"
                value={user?.experience && (
                  <span>Established in <strong>{user?.experience}</strong></span>
                )}
              />
            </EditableInput>
          </div>
          <div>
            <Icon className={styles.icon} large name="globe" title="Company website" />
            <EditableInput
              defaultValue={user?.website}
              placeholder="Company website"
              name="website"
              ref={register({
                validate: (value) => (
                  !value.length || validator.isURL(value) || 'Please enter a valid URL.'
                ),
              })}
            >
              <Placeholder
                isProfile={isProfile}
                publicValue="N/A"
                profileValue="Company website"
                value={(
                  <Link
                    external
                    href={`${!user?.website?.startsWith('http') ? '//' : ''}${user?.website}`}
                  >
                    {user?.website}
                  </Link>
                )}
              />
            </EditableInput>
            <Error className={styles.error} filler={false} errors={errors} name="website" />
          </div>
        </>
      )}
    </form>
  );
}

export default function Skills(props: PortfolioSectionProps) {
  const [languages, setLanguages] = useState<LabelType[]>();
  const [tools, setTools] = useState<LabelType[]>();
  const { user, setDialog } = props;

  if (!languages && user?.languages) {
    setLanguages(user.languages);
  }

  if (!tools && user?.tools) {
    setTools(user.tools);
  }

  return (
    <ProfileUpdateProvider<UpdateFormValues>
      setDialog={setDialog}
      labelStates={user?.type === 'individual' && { languages, tools }}
    >
      <UpdateForm
        tools={tools}
        languages={languages}
        setTools={setTools}
        setLanguages={setLanguages}
        {...props}
      />
    </ProfileUpdateProvider>
  );
}
