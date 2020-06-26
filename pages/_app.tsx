import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import AmplitudeProvider from 'src/contexts/Amplitude';
import { inApp, isBrowser } from 'src/utils/misc';
import Navigation from '../src/components/Navigation';
import AuthProvider from '../src/contexts/AuthProvider';
import useResize from '../src/utils/viewportHeight';
import '../styles/index.scss';

export default function App({ Component, pageProps }: AppProps) {
  const Layout = (Page) => (
    <AuthProvider>
      <div className={inApp() ? 'app' : null}>
        {inApp() ? <Navigation /> : <Navigation guest />}
        {Page}
      </div>
    </AuthProvider>
  );

  if (!isBrowser()) {
    return Layout(<Component {...pageProps} />);
  }

  useResize();

  return (
    <>
      <Head>
        <title>CADteams</title>
      </Head>
      {Layout((
        <AmplitudeProvider>
          <Component {...pageProps} />
        </AmplitudeProvider>
      ))}
    </>
  );
}
