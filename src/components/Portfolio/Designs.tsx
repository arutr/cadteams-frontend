import classNames from 'classnames';
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants';
import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import Button from 'src/components/Button';
import Dialog from 'src/components/Dialog';
import { Heading2 } from 'src/components/Heading';
import Icon from 'src/components/Icon';
import Link from 'src/components/Link';
import { PortfolioSectionProps } from 'src/components/Portfolio/index';
import styles from 'src/components/Portfolio/Portfolio.module.scss';
import { useAuth } from 'src/contexts/AuthProvider';
import getApiResource from 'src/utils/api';

interface Form {
  design: FileList;
}

const IMAGE_MAX_SIZE = 4194304;
const VIDEO_MAX_SIZE = 15728640;

function DesignForm({ index, isProfile, setDialog }) {
  const { register, handleSubmit } = useForm<Form>();
  const { updateUser } = useAuth();
  const onClick = () => document.querySelector<HTMLInputElement>(`#design${index}`).click();
  const onInput = handleSubmit(async ({ design }) => {
    setDialog(null);

    if (design[0]?.type.startsWith('image/') && design[0]?.size > IMAGE_MAX_SIZE) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setDialog({ type: 'error', message: 'Image files cannot be larger than 4 megabytes.' });
      return;
    }

    if (design[0]?.type.startsWith('video/') && design[0]?.size > VIDEO_MAX_SIZE) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setDialog({ type: 'error', message: 'Video files cannot be larger than 15 megabytes.' });
      return;
    }

    const formData = new FormData();
    formData.append('files', design[0]);
    formData.append('field', 'designs');

    await updateUser(formData, 'post', '/upload/me').catch((error) => {
      setDialog({
        type: 'error',
        message: 'An error has occurred during file upload. Please try again later.',
      });

      if (PHASE_DEVELOPMENT_SERVER) {
        throw error;
      }
    });
  });
  return (
    <form className={classNames(styles.design, styles.blank)}>
      {isProfile && (
        <>
          <input
            id={`design${index}`}
            name="design"
            type="file"
            hidden
            accept="image/png, image/jpeg, video/mp4"
            ref={register}
            onInput={onInput}
          />
          <Button type="button" onClick={onClick}>+ Add a design</Button>
        </>
      )}
    </form>
  );
}

DesignForm.propTypes = {
  index: PropTypes.number.isRequired,
  isProfile: PropTypes.bool.isRequired,
  setDialog: PropTypes.func.isRequired,
};

export default function Designs({ user, isProfile, setDialog }: PortfolioSectionProps) {
  const { updateUser } = useAuth();
  const removeDesign = (id) => updateUser(null, 'delete', `/upload/me/${id}`)
    .catch((error) => {
      setDialog({
        type: 'error',
        message: 'An error has occurred during file deletion. Please try again later.',
      });

      if (PHASE_DEVELOPMENT_SERVER) {
        throw error;
      }
    });

  return !isProfile || user?.type === 'individual' ? (
    <section className={styles.designs}>
      <Heading2 marginTop="0" condensed bold>Designs</Heading2>
      {isProfile && (
        <Dialog type="info">
          You can upload up to <strong>6 multimedia files</strong> to showcase your portfolio.
          Supported formats are: <code>.jpg</code> <code>.png</code> <code>.mp4</code>
          <br />
          Screengrabs of 3D renders and 2D plans <strong>must not include</strong> any project or
          client confidential information.<br />
          Simply focus on the work you have completed. Keep any videos you upload short and
          informative!
        </Dialog>
      )}
      <div className={styles.grid}>
        {Array(6).fill(1).map((_, index) => {
          const design = user?.designs[index];
          if (design) {
            const url = getApiResource(design.url);
            const thumbnailUrl = getApiResource(design.formats?.medium?.url, design.url);

            return (
              <div key={index} className={styles.design}>
                {design.mime?.startsWith('video/') ? (
                  <video controls controlsList="nodownload noremoteplayback" muted playsInline>
                    <source src={url} type="video/mp4" />
                  </video>
                ) : (
                  <Link external href={url} hoverEffect={false}>
                    <img src={thumbnailUrl} alt="Design" />
                  </Link>
                )}
                {isProfile && (
                  <Button
                    className={styles.edit}
                    type="button"
                    onClick={() => removeDesign(design.id)}
                  >
                    <Icon name="trash" inverted title="Remove this design" />
                  </Button>
                )}
              </div>
            );
          }

          return (
            <DesignForm
              key={index}
              index={index}
              isProfile={isProfile}
              setDialog={setDialog}
            />
          );
        })}
      </div>
    </section>
  ) : null;
}
