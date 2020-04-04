import React from 'react';
import PropTypes from 'prop-types';

import styles from './MediaObject.module.scss';

function MediaObject({
  alt, children, captionAlign, height, src, width,
}) {
  return (
    <figure>
      <img src={src} alt={alt} style={{ height, width }} />
      <figcaption className={styles[captionAlign]}>{children}</figcaption>
    </figure>
  );
}

MediaObject.propTypes = {
  alt: PropTypes.string,
  captionAlign: PropTypes.oneOf(['left', 'center', 'right']),
  children: PropTypes.node,
  height: PropTypes.string,
  src: PropTypes.string,
  width: PropTypes.string,
};

MediaObject.defaultProps = {
  alt: null,
  captionAlign: 'left',
  children: null,
  height: null,
  src: null,
  width: null,
};

export default MediaObject;
