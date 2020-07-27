import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { FormContextValues, useForm } from 'react-hook-form';
import Button from 'src/components/Button';
import { DialogType } from 'src/components/Dialog';
import Icon from 'src/components/Icon';
import Link from 'src/components/Link';
import layout from 'src/components/Portfolio/Portfolio.module.scss';
import { useAuth } from 'src/contexts/AuthProvider';
import { useDialog } from 'src/contexts/DialogContext';
import editableStyles from 'src/components/Portfolio/Editable.module.scss';
import styles from './Designs.module.scss';

interface Form {
  design: FileList;
  caption: string;
}

interface DesignPreviewProps {
  previewState: [File, (state) => void];
  formMethods: FormContextValues<Form>;
}

const IMAGE_MAX_SIZE = 4 * 1048576;
const VIDEO_MAX_SIZE = 20 * 1048576;

function DesignPreview({ formMethods, previewState }: DesignPreviewProps) {
  const [preview, setPreview] = previewState;
  const [submitting, setSubmitting] = useState<boolean>(false);
  const { updateUser } = useAuth();
  const { setDialog } = useDialog();
  const url = URL.createObjectURL(preview);
  const onCancel = () => {
    URL.revokeObjectURL(url);
    setPreview(null);
  };
  const onUpload = formMethods.handleSubmit(async ({ caption }) => {
    setSubmitting(false);

    const formData = new FormData();
    formData.append('files', preview);
    formData.append('field', 'designs');

    if (caption) {
      formData.append('fileInfo', JSON.stringify({
        caption,
      }));
    }

    try {
      setSubmitting(true);
      await updateUser(formData, 'post', '/upload/me');
    } catch {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setDialog({
        type: DialogType.Error,
        message: 'An error has occurred during file upload. Please try again later.',
      });
      onCancel();
    }

    URL.revokeObjectURL(url);
  });

  return (
    <div className={styles.design}>
      <figure>
        {preview.type?.startsWith('video/') ? (
          <video controls controlsList="nodownload noremoteplayback" muted playsInline>
            <source src={url} type="video/mp4" />
          </video>
        ) : (
          <Link external href={url} hoverEffect={false}>
            <img src={url} alt="Design" />
          </Link>
        )}
        <input
          placeholder="A description of this design"
          className={editableStyles.editable}
          ref={formMethods.register}
          type="text"
          name="caption"
        />
      </figure>
      <Button
        className={classNames(layout.edit, layout.corner)}
        color="success"
        type="button"
        onClick={onUpload}
        disabled={submitting}
      >
        <Icon name="upload" inverted title="Upload this design" />
        <span className={layout.label}>Upload</span>
      </Button>
      {!submitting && (
        <Button
          className={classNames(layout.edit, layout.corner, layout.cancel)}
          color="error"
          type="button"
          onClick={onCancel}
        >
          <Icon name="trash" inverted title="Cancel upload" />
          <span className={layout.label}>Cancel</span>
        </Button>
      )}
    </div>
  );
}

export default function AddDesign({ index }) {
  const { setDialog } = useDialog();
  const formMethods = useForm<Form>();
  const { register, handleSubmit } = formMethods;
  const previewState = useState<File>(null);
  const [preview, setPreview] = previewState;
  const onClick = () => document.querySelector<HTMLInputElement>(`#design${index}`).click();
  const onInput = handleSubmit(async ({ design }) => {
    const file = design[0];
    setDialog(null);

    if (file?.type.startsWith('image/') && file?.size > IMAGE_MAX_SIZE) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setDialog({
        type: DialogType.Error,
        message: 'Image files cannot be larger than 4 megabytes.',
      });

      return;
    }

    if (file?.type.startsWith('video/') && file?.size > VIDEO_MAX_SIZE) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setDialog({
        type: DialogType.Error,
        message: 'Video files cannot be larger than 20 megabytes.',
      });

      return;
    }

    setPreview(file);
  });

  if (preview) {
    return (
      <DesignPreview formMethods={formMethods} previewState={previewState} />
    );
  }

  return (
    <form className={classNames(styles.design, styles.blank)}>
      <input
        id={`design${index}`}
        name="design"
        type="file"
        hidden
        accept="image/png, image/jpeg, image/jpg, video/mp4"
        ref={register}
        onInput={onInput}
      />
      <Button color="success" type="button" onClick={onClick}>
        + Add a design
      </Button>
    </form>
  );
}

AddDesign.propTypes = {
  index: PropTypes.number.isRequired,
};
