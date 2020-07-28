import classNames from 'classnames';
import React from 'react';
import { useForm } from 'react-hook-form';
import Button from 'src/components/Button';
import { DialogType } from 'src/components/Dialog';
import Icon from 'src/components/Icon';
import { PortfolioProps } from 'src/components/Portfolio/index';
import layout from 'src/components/Portfolio/Portfolio.module.scss';
import { useAuth } from 'src/contexts/AuthProvider';
import { useDialog } from 'src/contexts/DialogContext';
import { getApiResource } from 'src/utils/api';
import styles from './Identity.module.scss';

const PROFILE_PICTURE_MAX_SIZE = 4 * 1048576;

interface Form {
  picture: FileList;
}

export default function ProfilePicture({
  demo, isProfile, user,
}: PortfolioProps) {
  const { register, handleSubmit } = useForm<Form>();
  const { updateUser } = useAuth();
  const { setDialog } = useDialog();
  const profilePicture = user?.profilePicture;
  const profilePictureUrl = demo ? profilePicture?.url : getApiResource(
    profilePicture?.formats?.small?.url,
    profilePicture?.url,
  );

  const onClick = () => document.querySelector<HTMLInputElement>('#profilePicture').click();

  const removePicture = () => updateUser(null, 'delete', `/upload/me/${profilePicture?.id}`)
    .catch(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setDialog({
        type: DialogType.Error,
        message: 'An error has occurred during file deletion. Please try again later.',
      });
    });

  const onInput = handleSubmit(async ({ picture }) => {
    setDialog(null);

    if (picture[0].size > PROFILE_PICTURE_MAX_SIZE) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setDialog({
        type: DialogType.Error,
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
    <div className={styles.profilePicture}>
      <img
        className={!profilePictureUrl ? layout.blank : null}
        src={profilePictureUrl ?? '/icons/user-blank.svg'}
        alt={user?.username}
        onContextMenu={(event) => event.preventDefault()}
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
              className={classNames(layout.edit, layout.bottom, styles.edit)}
              color="error"
              type="button"
              onClick={removePicture}
            >
              <Icon name="trash" inverted title="Remove this profile picture" />
              <span className={layout.label}>Remove</span>
            </Button>
          ) : (
            <Button
              className={classNames(layout.edit, layout.bottom, styles.edit)}
              color="success"
              type="button"
              onClick={onClick}
            >
              <Icon name="camera" inverted title="Upload a profile picture" />
              <span className={layout.label}>Upload</span>
            </Button>
          )}
        </form>
      )}
    </div>
  );
}
