import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Label as LabelType } from 'src/api/User';
import { Error } from 'src/components/Form';
import { Heading1, Heading3 } from 'src/components/Heading';
import Label, { LabelContainer } from 'src/components/Label';
import {
  EditableDropdown,
  EditableInput,
  Placeholder,
} from 'src/components/Portfolio/Editable';
import { PortfolioProps } from 'src/components/Portfolio/index';
import layout from 'src/components/Portfolio/Portfolio.module.scss';
import { removeLabel, useProfileUpdate } from 'src/contexts/ProfileUpdateContext';
import styles from './Identity.module.scss';

const industries = [
  'Arts & Culture',
  'Aviation',
  'Data Centres',
  'Education',
  'Healthcare',
  'Industrial',
  'Infrastructure',
  'Residential',
  'Retail & Leisure',
];
const specializations = [
  'BIM Engineering',
  'BIM Architecture',
  'CAD Engineering',
  'CAD Architecture',
  'Civil Engineering',
  'MEP Technician',
  'Parametric Design',
  'Rendering',
  'Structural Technician',
  'Surveying',
];

interface InformationFormValues {
  company: string;
  username: string;
  specialization: string;
}

export interface InformationProps extends PortfolioProps {
  sectors: LabelType[];
  setSectors?: (sectors) => void;
}

export default function Information({
  isProfile, sectors, setSectors, ...props
}: InformationProps) {
  const { user } = props;
  const { register, errors } = useFormContext<InformationFormValues>();
  const { editing } = useProfileUpdate();
  const removeSector = setSectors ? removeLabel(sectors, setSectors) : null;
  const addSector = ({ currentTarget }) => {
    const newSector = currentTarget.value;

    if (!sectors.find((sector) => sector.label === newSector)) {
      setSectors([...sectors, {
        id: (sectors[sectors.length - 1]?.id ?? 0) + 1,
        label: newSector,
      }]);
    }

    // eslint-disable-next-line no-param-reassign
    currentTarget.value = '';
  };

  return (
    <form>
      <Heading1 bold condensed marginTop="0" marginBottom="0.25rem">
        <EditableInput
          defaultValue={user?.username}
          placeholder="CADteams Member"
          name="username"
          ref={register({
            required: 'Please enter your name.',
            maxLength: {
              value: 30,
              message: 'Your name is too long!',
            },
            validate: (value) => value.match(/^[a-zA-Z -]+$/) || 'Please enter your name.',
          })}
        >
          <Placeholder
            isProfile={isProfile}
            publicValue="CADteams Member"
            profileValue="CADteams Member"
            value={user?.username}
          />
        </EditableInput>
        <Error className={layout.error} filler={false} errors={errors} name="username" />
      </Heading1>
      {user?.type === 'individual' && (
        <EditableDropdown
          className={styles.specialization}
          values={specializations}
          placeholder="--- Your specialisation ---"
          defaultValue={user?.specialization}
          name="specialization"
          ref={register}
        >
          <Heading3 marginTop="0">
            <Placeholder
              isProfile={isProfile}
              publicValue="No specialisation"
              profileValue="Your specialisation"
              value={user?.specialization}
            />
          </Heading3>
        </EditableDropdown>
      )}
      {user?.type === 'enterprise' && (
        <Heading3 marginTop="0">
          <EditableInput
            defaultValue={user?.company}
            placeholder="Your company"
            name="company"
            ref={register}
          >
            <Placeholder
              isProfile={isProfile}
              publicValue="N/A"
              profileValue="Your company"
              value={user?.company}
            />
          </EditableInput>
        </Heading3>
      )}
      <LabelContainer>
        {sectors?.length ? sectors.map(({ id, label }) => (
          <Label key={id} onRemoveLabel={editing ? (() => removeSector(id)) : null}>
            {label}
          </Label>
        )) : null}
        {!sectors?.length && (
          <Label className={layout.placeholder}>Industry sector</Label>
        )}
        {editing && (
          <EditableDropdown
            values={industries}
            placeholder="--- Select an industry to add ---"
            onChange={addSector}
          >
            <Heading3 marginTop="0">
              <Placeholder
                isProfile={isProfile}
                publicValue="No specialisation"
                profileValue="Your specialisation"
                value={user?.specialization}
              />
            </Heading3>
          </EditableDropdown>
        )}
      </LabelContainer>
    </form>
  );
}
