import React from 'react';
import MediaObject from '../src/components/MediaObject';

export function leftAlign() {
  return (
    <MediaObject src="/images/landing-page/design1.png" width="20rem" captionAlign="left">
      Caption
    </MediaObject>
  );
}

export function centreAlign() {
  return (
    <MediaObject src="/images/landing-page/design1.png" width="20rem">
      Caption
    </MediaObject>
  );
}

export function rightAlign() {
  return (
    <MediaObject src="/images/landing-page/design1.png" width="20rem" captionAlign="right">
      Caption
    </MediaObject>
  );
}

export default {
  title: 'Media Object',
};
