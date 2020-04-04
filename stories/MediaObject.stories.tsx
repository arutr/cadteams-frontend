import React from 'react';
import MediaObject from '../src/components/MediaObject';

export function leftAlign() {
  return (
    <MediaObject src="/design1.png">
      Caption
    </MediaObject>
  );
}

export function centreAlign() {
  return (
    <MediaObject src="/design1.png" captionAlign="center">
      Caption
    </MediaObject>
  );
}

export function rightAlign() {
  return (
    <MediaObject src="/design1.png" captionAlign="right">
      Caption
    </MediaObject>
  );
}

export default {
  decorators: [(story) => (
    <section style={{ padding: '1rem' }}>
      {story()}
    </section>
  )],
  title: 'Media Object',
};
