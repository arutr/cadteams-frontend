import React from 'react';
import { addDecorator } from '@storybook/react';

import '!style-loader!css-loader!sass-loader!../styles/index.scss';
import '!style-loader!css-loader!normalize.css';

addDecorator((story) => (
  <div style={{ padding: '1rem' }}>
    {story()}
  </div>
));
