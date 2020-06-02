import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './MediaObject.module.scss';

function MediaObject({
  alt, children, className, captionAlign, height, href, id, onClick, src, width, vertical,
}) {
  if (href) {
    /* eslint-disable jsx-a11y/no-interactive-element-to-noninteractive-role */
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener"
        role="figure"
        id={id}
        className={classNames(styles.figure, vertical && styles.vertical, className)}
        style={{ height, width }}
      >
        <img src={src} alt={alt} />
        <figcaption className={styles[captionAlign]}>{children}</figcaption>
      </a>
    );
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <figure
      id={id}
      onKeyDown={onClick}
      onClick={onClick}
      className={classNames(
        styles.figure,
        onClick && styles.clickable,
        vertical && styles.vertical,
        className,
      )}
      style={{ height, width }}
    >
      <img src={src} alt={alt} />
      <figcaption className={styles[captionAlign]}>{children}</figcaption>
    </figure>
  );
}

MediaObject.propTypes = {
  alt: PropTypes.string,
  captionAlign: PropTypes.oneOf(['left', 'center', 'right']),
  children: PropTypes.node,
  className: PropTypes.string,
  height: PropTypes.string,
  href: PropTypes.string,
  id: PropTypes.string,
  onClick: PropTypes.func,
  src: PropTypes.string,
  width: PropTypes.string,
  vertical: PropTypes.bool,
};

MediaObject.defaultProps = {
  alt: null,
  captionAlign: 'center',
  children: null,
  className: null,
  height: null,
  href: null,
  id: null,
  onClick: null,
  src: null,
  width: null,
  vertical: false,
};

export default MediaObject;
