import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './MediaObject.module.scss';

function MediaObject({
  alt, children, className, captionAlign, height, id, imageHeight, imageWidth, src, width, vertical,
}) {
  return (
    <figure
      id={id}
      className={classNames(styles.figure, vertical && styles.vertical, className)}
      style={{ height, width }}
    >
      <img src={src} alt={alt} style={{ height: imageHeight, width: imageWidth }} />
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
  id: PropTypes.string,
  imageHeight: PropTypes.string,
  imageWidth: PropTypes.string,
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
  id: null,
  imageHeight: null,
  imageWidth: null,
  src: null,
  width: null,
  vertical: false,
};

export default MediaObject;
