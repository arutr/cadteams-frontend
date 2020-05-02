import React from 'react';
import Head from 'next/head';
import '../styles/index.scss';
import { AppProps } from 'next/app';
import { Amplitude, AmplitudeProvider } from 'react-amplitude-hooks';
import { AmplitudeClient } from 'amplitude-js';
import { isBrowser } from '@unly/utils';
import AuthProvider from '../src/components/AuthProvider';
import Navigation from '../src/components/Navigation';
import useResize from '../src/utils/viewportHeight';

export default function App({ Component, pageProps }: AppProps) {
  const Layout = (
    <AuthProvider>
      <Navigation />
      <Component {...pageProps} />
    </AuthProvider>
  );

  if (!isBrowser()) {
    return Layout;
  }

  useResize();

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
        {Layout}
      </Amplitude>
    </AmplitudeProvider>
  );
}
