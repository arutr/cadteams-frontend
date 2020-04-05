import React from 'react';
import ${NAME} from '../src/components/${NAME}';

export default {
  decorators: [(story) => (
    <section style={{ padding: '1rem' }}>
      {story()}
    </section>
  )],
  title: '${NAME}',
};
