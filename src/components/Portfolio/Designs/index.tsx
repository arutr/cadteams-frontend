import classNames from 'classnames';
import React from 'react';
import Button from 'src/components/Button';
import Dialog, { DialogType } from 'src/components/Dialog';
import { Heading2 } from 'src/components/Heading';
import Icon from 'src/components/Icon';
import Link from 'src/components/Link';
import AddDesign from 'src/components/Portfolio/Designs/AddDesign';
import { PortfolioProps } from 'src/components/Portfolio/index';
import layout from 'src/components/Portfolio/Portfolio.module.scss';
import { useAuth } from 'src/contexts/AuthProvider';
import { useDialog } from 'src/contexts/DialogContext';
import { getApiResource } from 'src/utils/api';
import styles from './Designs.module.scss';

export default function Designs({
  demo, isProfile, ...props
}: PortfolioProps) {
  const { user } = props;
  const { updateUser } = useAuth();
  const { setDialog } = useDialog();
  const scroll = (left?) => {
    const designGrid = document.getElementById('designGrid');
    const amount = 292;
    designGrid.scrollBy({
      left: left ? -amount : amount,
      behavior: 'smooth',
    });
  };
  const removeDesign = (id) => updateUser(null, 'delete', `/upload/me/${id}`)
    .catch(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setDialog({
        type: DialogType.Error,
        message: 'An error has occurred during file deletion. Please try again later.',
      });
    });

  if (!isProfile || user?.type === 'individual') {
    return (
      <section className={styles.designs}>
        <Heading2 marginTop="0" condensed bold>Designs</Heading2>
        {isProfile && (
          <Dialog type={DialogType.Info}>
            You can upload up to <strong>6 multimedia files</strong> to showcase your portfolio.
            Supported formats are: <code>.jpg</code> <code>.png</code> <code>.mp4</code>
            <br />
            Screengrabs of 3D renders and 2D plans <strong>must not include</strong> any project or
            client confidential information.<br />
            Simply focus on the work you have completed. Keep any videos you upload short and
            informative!
          </Dialog>
        )}
        <div className={styles.wrapper}>
          <div id="designGrid" className={styles.grid}>
            {Array((user?.designs?.length ?? 0) + 1).fill(1).map((_, index) => {
              const design = user?.designs[index];

              if (design) {
                const url = demo ? design.url : getApiResource(design.url);
                const preview = demo
                  ? design.url
                  : getApiResource(design.formats?.large?.url, design.url);

                return (
                  <div key={index} className={styles.design}>
                    <figure>
                      {design.mime?.startsWith('video/') ? (
                        <video controls controlsList="nodownload noremoteplayback" muted playsInline>
                          <source src={url} type="video/mp4" />
                        </video>
                      ) : (
                        <Link external href={url} hoverEffect={false}>
                          <img src={preview} alt="Design" />
                        </Link>
                      )}
                      <figcaption>{design.caption}</figcaption>
                    </figure>
                    {isProfile && (
                      <Button
                        color="error"
                        className={classNames(layout.edit, layout.corner)}
                        type="button"
                        onClick={() => removeDesign(design.id)}
                      >
                        <Icon name="trash" inverted title="Remove this design" />
                        <span className={layout.label}>Remove</span>
                      </Button>
                    )}
                  </div>
                );
              }

              if (isProfile) {
                return (
                  <AddDesign key={index} index={index} />
                );
              }

              return null;
            })}
          </div>
          {!!user?.designs?.length && (
            <>
              <Button
                className={classNames(styles.arrow, styles.left)}
                type="button"
                onClick={() => scroll(true)}
              >
                &lt;
              </Button>
              <Button
                className={classNames(styles.arrow, styles.right)}
                type="button"
                onClick={() => scroll()}
              >
                &gt;
              </Button>
            </>
          )}
        </div>
      </section>
    );
  }

  return null;
}
