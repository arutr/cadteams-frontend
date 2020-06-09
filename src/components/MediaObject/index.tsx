import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './MediaObject.module.scss';

function MediaObject({
  alt, children, className, captionAlign, height, href, id, onClick, src, width, vertical,
}) {
  if (href) {
    return (
      <figure
        id={id}
        className={classNames(styles.figure, vertical && styles.vertical, className)}
        style={{ height, width }}
      >
        <a href={href} target="_blank" rel="noopener">
          <img src={src} alt={alt} />
        </a>
        <figcaption className={styles[captionAlign]}>{children}</figcaption>
      </figure>
    );
  }

  return (
    <figure
      id={id}
      className={classNames(styles.figure, vertical && styles.vertical, className)}
      style={{ height, width }}
    >
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <img
        className={classNames(onClick && styles.clickable)}
        onKeyDown={onClick}
        onClick={onClick}
        src={src}
        alt={alt}
      />
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
