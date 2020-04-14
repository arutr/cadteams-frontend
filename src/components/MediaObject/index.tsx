import React from 'react';
import PropTypes from 'prop-types';

import styles from './MediaObject.module.scss';

function MediaObject({
  alt, children, captionAlign, height, src, width, id,
}) {
  return (
    <figure id={id} className={styles.figure} style={{ height, width }}>
      <img src={src} alt={alt} />
      <figcaption className={styles[captionAlign]}>{children}</figcaption>
    </figure>
  );
}

MediaObject.propTypes = {
  alt: PropTypes.string,
  captionAlign: PropTypes.oneOf(['left', 'center', 'right']),
  children: PropTypes.node,
  id: PropTypes.string,
  height: PropTypes.string,
  src: PropTypes.string,
  width: PropTypes.string,
};

MediaObject.defaultProps = {
  alt: null,
  captionAlign: 'center',
  children: null,
  id: null,
  height: null,
  src: null,
  width: null,
};

export default MediaObject;
