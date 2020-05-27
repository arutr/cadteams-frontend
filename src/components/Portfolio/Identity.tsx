import classNames from 'classnames';
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useForm, useFormContext } from 'react-hook-form';
import Button from 'src/components/Button';
import Dialog from 'src/components/Dialog';
import { Error } from 'src/components/Form';
import { Heading1, Heading3 } from 'src/components/Heading';
import Icon from 'src/components/Icon';
import { Label as LabelType } from 'src/api/User';
import Label, { LabelContainer } from 'src/components/Label';
import { EditableInput, EditableLabel, Placeholder } from 'src/components/Portfolio/Editable';
import EditButton from 'src/components/Portfolio/EditButton';
import { PortfolioSectionProps } from 'src/components/Portfolio/index';
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
  setSectors: (sectors) => void,
} & PortfolioSectionProps;

const PROFILE_PICTURE_MAX_SIZE = 1048576;

function UpdateForm({
  isProfile, sectors, setSectors, user,
}: UpdateFormProps) {
  const { register, errors } = useFormContext<UpdateFormValues>();
  const { editing } = useProfileUpdate();
  const removeSector = removeLabel(sectors, setSectors);

  return (
    <form>
      {isProfile && <EditButton />}
      <Heading1 bold condensed marginTop={0} marginBottom={0}>
        <EditableInput
          defaultValue={user?.username}
          placeholder="CADteams User"
          name="username"
          ref={register({ required: 'Please enter your name.' })}
        >
          <Placeholder
            isProfile={isProfile}
            publicValue="CADteams User"
            profileValue="CADteams User"
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
              publicValue=""
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
              publicValue=""
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

function ProfilePictureForm({ isProfile, setDialog, user }) {
  const { register, handleSubmit } = useForm<Form>();
  const { updateUser } = useAuth();
  const profilePicture = user?.profilePicture;
  const profilePictureUrl = getApiResource(
    profilePicture?.formats?.thumbnail?.url,
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
        message: 'Maximum file size of a profile picture is 1 megabyte.',
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
      <img src={profilePictureUrl || '/icons/user-blank.svg'} alt={user?.username} />
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
              className={styles.edit}
              type="button"
              onClick={removePicture}
            >
              <Icon name="trash" inverted title="Remove this profile picture" />
            </Button>
          ) : (
            <Button className={styles.edit} type="button" onClick={onClick}>
              <Icon name="camera" inverted title="Upload a profile picture" />
            </Button>
          )}
        </form>
      )}
    </div>
  );
}

ProfilePictureForm.propTypes = {
  isProfile: PropTypes.bool.isRequired,
  setDialog: PropTypes.func.isRequired,
  user: PropTypes.object,
};

ProfilePictureForm.defaultProps = {
  user: null,
};

export default function Identity(props: PortfolioSectionProps) {
  const [sectors, setSectors] = useState<LabelType[]>();
  const { user, setDialog } = props;

  if (!sectors && user?.sectors) {
    setSectors(user.sectors);
  }

  return (
    <ProfileUpdateProvider<UpdateFormValues> setDialog={setDialog} labelStates={{ sectors }}>
      <div className={classNames(styles.card, styles.identity)}>
        <ProfilePictureForm {...props} />
        <aside>
          <UpdateForm {...props} sectors={sectors} setSectors={setSectors} />
        </aside>
      </div>
    </ProfileUpdateProvider>
  );
}
