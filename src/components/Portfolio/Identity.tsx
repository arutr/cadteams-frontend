import classNames from 'classnames';
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants';
import React, { useEffect, useState } from 'react';
import { useForm, useFormContext } from 'react-hook-form';
import { Label as LabelType } from 'src/api/User';
import Button from 'src/components/Button';
import Dialog from 'src/components/Dialog';
import { Error } from 'src/components/Form';
import { Heading1, Heading3 } from 'src/components/Heading';
import Icon from 'src/components/Icon';
import Label, { LabelContainer } from 'src/components/Label';
import { EditableInput, EditableLabel, Placeholder } from 'src/components/Portfolio/Editable';
import EditButton, { PortfolioButton } from 'src/components/Portfolio/EditButton';
import { PortfolioModal, PortfolioSectionProps } from 'src/components/Portfolio/index';
import styles from 'src/components/Portfolio/Portfolio.module.scss';
import { useAuth } from 'src/contexts/AuthProvider';
import ProfileUpdateProvider, {
  removeLabel,
  useProfileUpdate,
} from 'src/contexts/ProfileUpdateContext';
import getApiResource from 'src/utils/api';

interface UpdateFormValues {
  company: string;
  username: string;
  specialization: string;
}

type UpdateFormProps = {
  sectors: LabelType[],
  setSectors?: (sectors) => void,
} & PortfolioSectionProps;

const PROFILE_PICTURE_MAX_SIZE = 4 * 1048576;

function UpdateForm({
  isProfile, sectors, setSectors, user,
}: UpdateFormProps) {
  const { register, errors } = useFormContext<UpdateFormValues>();
  const { editing } = useProfileUpdate();
  const removeSector = setSectors ? removeLabel(sectors, setSectors) : null;

  return (
    <form>
      <Heading1 bold condensed marginTop="0" marginBottom="0">
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
        <Error className={styles.error} filler={false} errors={errors} name="username" />
      </Heading1>
      <Heading3 marginTop="0.25rem">
        {user?.type === 'individual' && (
          <EditableInput
            defaultValue={user?.specialization}
            placeholder="Your specialisation"
            name="specialization"
            ref={register}
          >
            <Placeholder
              isProfile={isProfile}
              publicValue="N/A"
              profileValue="Your specialisation"
              value={user?.specialization}
            />
          </EditableInput>
        )}
        {user?.type === 'enterprise' && (
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
        )}
      </Heading3>
      {editing && (
        <Dialog small type="hint">
          Type in a label into a dashed field below and press <strong>Enter</strong> to apply.
        </Dialog>
      )}
      <LabelContainer>
        {sectors?.length ? sectors.map(({ id, label }) => (
          <Label key={id} removeLabel={editing ? (() => removeSector(id)) : null}>
            {label}
          </Label>
        )) : null}
        {!editing && !sectors?.length && !isProfile && (
          <Label className={styles.placeholder}>N/A</Label>
        )}
        {!editing && !sectors?.length && isProfile && (
          <Label className={styles.placeholder}>Industry sector(s)</Label>
        )}
        {editing && (
          <EditableLabel
            labels={sectors}
            placeholder="Industry sector"
            setLabels={setSectors}
          />
        )}
      </LabelContainer>
    </form>
  );
}

interface Form {
  picture: FileList;
}

function ProfilePictureForm({
  demo, isProfile, setDialog, user,
}: PortfolioSectionProps) {
  const { register, handleSubmit } = useForm<Form>();
  const { updateUser } = useAuth();
  const profilePicture = user?.profilePicture;
  const profilePictureUrl = demo ? profilePicture?.url : getApiResource(
    profilePicture?.formats?.small?.url,
    profilePicture?.url,
  );

  const onClick = () => document.querySelector<HTMLInputElement>('#profilePicture').click();

  const removePicture = () => updateUser(null, 'delete', `/upload/me/${profilePicture?.id}`)
    .catch((error) => {
      setDialog({
        type: 'error',
        message: 'An error has occurred during file deletion. Please try again later.',
      });

      if (PHASE_DEVELOPMENT_SERVER) {
        throw error;
      }
    });

  const onInput = handleSubmit(async ({ picture }) => {
    setDialog(null);

    if (picture[0].size > PROFILE_PICTURE_MAX_SIZE) {
      setDialog({
        type: 'error',
        message: 'Maximum file size of a profile picture is 4 megabytes.',
      });
      return;
    }

    const formData = new FormData();
    formData.append('files', picture[0]);
    formData.append('field', 'profilePicture');

    await updateUser(formData, 'post', '/upload/me');
  });

  return (
    <div className={styles['profile-picture']}>
      <img
        className={!profilePictureUrl ? styles.blank : null}
        src={profilePictureUrl ?? '/icons/user-blank.svg'}
        alt={user?.username}
      />
      {isProfile && (
        <form>
          <input
            id="profilePicture"
            name="picture"
            type="file"
            hidden
            accept="image/png, image/jpeg"
            ref={register}
            onInput={onInput}
          />
          {profilePictureUrl ? (
            <Button
              className={classNames(styles.edit, styles.bottom)}
              type="button"
              onClick={removePicture}
            >
              <Icon name="trash" inverted title="Remove this profile picture" />
              <span className={styles.label}>Remove</span>
            </Button>
          ) : (
            <Button
              className={classNames(styles.edit, styles.bottom)}
              type="button"
              onClick={onClick}
            >
              <Icon name="camera" inverted title="Upload a profile picture" />
              <span className={styles.label}>Upload</span>
            </Button>
          )}
        </form>
      )}
    </div>
  );
}

type IdentityCardProps = {
  className?: string;
  currency?: string;
  exchangeRate?: number;
} & UpdateFormProps;

export function IdentityCard(props: IdentityCardProps) {
  const {
    className, currency, exchangeRate = 1.0, demo, isProfile, inModal, user,
  } = props;
  const [demoModal, setDemoModal] = useState(false);
  const toggleDemoModal = () => setDemoModal(!demoModal);
  const showChin = isProfile || !inModal;
  const currencyFormat = new Intl.NumberFormat(
    'en-US',
    {
      style: 'currency',
      currency: currency ?? 'GBP',
    },
  );

  return (
    <>
      <div className={classNames(
        styles.card,
        styles.identity,
        showChin && styles.chin,
        className,
      )}
      >
        {demo && !inModal && user?.dailyRate && (
          <Label className={styles.rate}>
            {currencyFormat.format(user.dailyRate * exchangeRate)}/day
          </Label>
        )}
        <ProfilePictureForm {...props} />
        <aside>
          <UpdateForm {...props} />
        </aside>
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
            <span className={styles.label}>View Portfolio</span>
          </PortfolioButton>
        )}
      </div>
      {demoModal && (
        <PortfolioModal onClose={toggleDemoModal} user={user} demo />
      )}
    </>
  );
}

export default function Identity(props: PortfolioSectionProps) {
  const [sectors, setSectors] = useState<LabelType[]>();
  const { user, setDialog } = props;

  useEffect(() => {
    if (!sectors && user?.sectors) {
      setSectors(user.sectors);
    }
  }, [user]);

  return (
    <ProfileUpdateProvider<UpdateFormValues> setDialog={setDialog} labelStates={{ sectors }}>
      <IdentityCard sectors={sectors} setSectors={setSectors} {...props} />
    </ProfileUpdateProvider>
  );
}
