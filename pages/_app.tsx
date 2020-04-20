import React from 'react';
import Head from 'next/head';
import { Amplitude, AmplitudeProvider } from 'react-amplitude-hooks';
import { AmplitudeClient } from 'amplitude-js';
import { isBrowser } from '@unly/utils';

import '../styles/index.scss';

// eslint-disable-next-line react/prop-types
export default function MyApp({ Component, pageProps }) {
  if (!isBrowser()) {
    return <Component {...pageProps} />;
  }

  // eslint-disable-next-line global-require
  const amplitude = require('amplitude-js');
  const amplitudeInstance: AmplitudeClient = amplitude.getInstance();

  amplitudeInstance.init(process.env.AMPLITUDE_API_KEY);

  return (
    <AmplitudeProvider
      amplitudeInstance={amplitudeInstance}
      apiKey={process.env.AMPLITUDE_API_KEY}
    >
      <Head>
        <title>CADteams</title>
      </Head>
      <Amplitude
        eventProperties={{
          page: {
            url: window.location.href,
            path: window.location.pathname,
            origin: window.location.origin,
            name: null,
          },
        }}
      >
        <Component {...pageProps} />
      </Amplitude>
    </AmplitudeProvider>
  );
}
