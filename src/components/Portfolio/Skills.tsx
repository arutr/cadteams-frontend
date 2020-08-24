import classNames from 'classnames';
import { countries, getEmojiFlag } from 'countries-list';
import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Label as LabelType } from 'src/api/User';
import Dialog, { DialogType } from 'src/components/Dialog';
import { Error } from 'src/components/Form';
import Icon from 'src/components/Icon';
import Label, { LabelContainer } from 'src/components/Label';
import Link from 'src/components/Link';
import {
  EditableDropdown,
  EditableInput,
  EditableLabel,
  Placeholder,
} from 'src/components/Portfolio/Editable';
import EditButton from 'src/components/Portfolio/EditButton';
import { PortfolioProps } from 'src/components/Portfolio/index';
import cardStyles from 'src/components/Card/Card.module.scss';
import styles from 'src/components/Portfolio/Portfolio.module.scss';
import { useAuth } from 'src/contexts/AuthProvider';
import ProfileUpdateProvider, {
  removeLabel,
  useProfileUpdate,
} from 'src/contexts/ProfileUpdateContext';
import { currencyFormat } from 'src/utils/misc';
import validator from 'validator';

const countryOptions = Object
  .entries(countries)
  .sort((a, b) => a[1].name.localeCompare(b[1].name))
  .map(([code, country]) => ({
    label: country.name,
    value: code,
  }));

interface UpdateFormValues {
  country: string;
  experience: number;
  location: string;
  website: string;
}

interface SkillsFormProps extends PortfolioProps {
  languages: LabelType[];
  tools: LabelType[];
  setLanguages: (languages) => void;
  setTools: (tools) => void;
}

function IndividualSkills({
  inModal, isProfile, languages, setLanguages, tools, setTools, ...props
}: SkillsFormProps) {
  const { user } = props;
  const { register } = useFormContext<UpdateFormValues>();
  const { editing } = useProfileUpdate();
  const removeLanguage = removeLabel(languages, setLanguages);
  const removeTool = removeLabel(tools, setTools);
  const showChin = isProfile || !inModal;
  const { user: authUser } = useAuth();
  const isEnterpriseViewer = authUser?.type === 'enterprise';

  return (
    <form className={classNames(cardStyles.card, styles.skills, showChin && cardStyles.chin)}>
      <div className={styles.row}>
        <span>
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
        </span>
        <span>
          {!user?.country || editing ? (
            <Icon className={styles.icon} large name="globe-flag" title="Country" />
          ) : (
            <span className={classNames(styles.icon, styles.emoji)}>
              {getEmojiFlag(user?.country)}
            </span>
          )}
          <EditableDropdown
            options={countryOptions}
            placeholder="--- Your country ---"
            defaultValue={user?.country}
            name="country"
            ref={register}
          >
            <Placeholder
              isProfile={isProfile}
              publicValue="N/A"
              profileValue="Your country"
              value={countries[user?.country]?.name}
            />
          </EditableDropdown>
        </span>
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
            publicValue="No experience specified"
            profileValue="Years of experience"
            value={user?.experience && (
              <span><strong>{user?.experience}</strong> years of experience</span>
            )}
          />
        </EditableInput>
      </div>
      {editing && (
        <Dialog small type={DialogType.Hint}>
          Press <strong>Enter</strong> whilst typing to insert the new entry.
        </Dialog>
      )}
      <div className={styles.languages}>
        <Icon className={styles.icon} large name="language" title="Spoken languages" />
        <LabelContainer>
          {languages?.length ? languages.map(({ id, label }) => (
            <Label key={id} onRemoveLabel={editing ? (() => removeLanguage(id)) : null}>
              {label}
            </Label>
          )) : null}
          {!editing && !languages?.length && !isProfile && (
            <Label className="placeholder">N/A</Label>
          )}
          {!editing && !languages?.length && isProfile && (
            <Label className="placeholder">Spoken language(s)</Label>
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
          title="Modelling software"
        />
        <LabelContainer>
          {tools?.length ? tools.map(({ id, label }) => (
            <Label key={id} onRemoveLabel={editing ? (() => removeTool(id)) : null}>
              {label}
            </Label>
          )) : null}
          {!editing && !tools?.length && !isProfile && (
            <Label className="placeholder">N/A</Label>
          )}
          {!editing && !tools?.length && isProfile && (
            <Label className="placeholder">Modelling software</Label>
          )}
          {editing && (
            <EditableLabel
              labels={tools}
              placeholder="Modelling software"
              setLabels={setTools}
            />
          )}
        </LabelContainer>
      </div>
      {editing && (
        <Dialog small type={DialogType.Info}>
          Daily rate has to be specified in Pound Sterling (£ GBP). A working day
          is <strong>eight hours</strong>. A working month is <strong>20 days</strong>.
        </Dialog>
      )}
      {(isProfile || isEnterpriseViewer) && (
        <div className={styles.row}>
          <div>
            <Icon
              className={styles.icon}
              large
              name="banknote"
              title="Daily rate"
            />
            <EditableInput
              defaultValue={user?.dailyRate}
              placeholder="Daily rate"
              name="dailyRate"
              type="number"
              prefix={<strong>£&ensp;</strong>}
              suffix="&ensp;per day"
              style={{ maxWidth: '12ch' }}
              ref={register({ min: 0 })}
            >
              <Placeholder
                isProfile={isProfile}
                publicValue="No daily rate specified"
                profileValue="Daily rate"
                value={user?.dailyRate && (
                  <span>
                    <p><strong>{currencyFormat.format(user?.dailyRate)}</strong> per day</p>
                    <p><strong>{currencyFormat.format(user?.dailyRate * 20)}</strong> per month</p>
                  </span>
                )}
              />
            </EditableInput>
          </div>
          {user?.rating && (
            <div>
              <Icon
                className={styles.icon}
                large
                name="star"
                title="Satisfaction rating"
              />
              <span className="placeholder">No rating available</span>
            </div>
          )}
        </div>
      )}
      {isProfile && <EditButton bottom />}
    </form>
  );
}

function EnterpriseSkills({
  demo, isProfile, ...props
}: PortfolioProps) {
  const { user } = props;
  const { register, errors } = useFormContext<UpdateFormValues>();
  const showChin = isProfile || !demo;

  return (
    <form className={classNames(cardStyles.card, styles.skills, showChin && cardStyles.chin)}>
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
      {isProfile && <EditButton bottom />}
    </form>
  );
}

export default function Skills(props: PortfolioProps) {
  const [languages, setLanguages] = useState<LabelType[]>();
  const [tools, setTools] = useState<LabelType[]>();
  const { user } = props;

  useEffect(() => {
    if (!languages && user?.languages) {
      setLanguages(user.languages);
    }

    if (!tools && user?.tools) {
      setTools(user.tools);
    }
  }, [user]);

  return (
    <ProfileUpdateProvider
      labelStates={user?.type === 'individual' && { languages, tools }}
    >
      {user?.type === 'individual' && (
        <IndividualSkills
          tools={tools}
          languages={languages}
          setTools={setTools}
          setLanguages={setLanguages}
          {...props}
        />
      )}
      {user?.type === 'enterprise' && (
        <EnterpriseSkills {...props} />
      )}
    </ProfileUpdateProvider>
  );
}
