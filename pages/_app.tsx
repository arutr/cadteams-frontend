import { AppProps } from 'next/app';
import Head from 'next/head';
import PropTypes from 'prop-types';
import React from 'react';
import Footer from 'src/components/Footer';
import AmplitudeProvider from 'src/contexts/Amplitude';
import { fetcher } from 'src/utils/api';
import { SWRConfig } from 'swr';
import Navigation from '../src/components/Navigation';
import AuthProvider from '../src/contexts/AuthProvider';
import useResize from '../src/utils/viewportHeight';
import '../styles/index.scss';

function AppLayout({ children }) {
  return (
    <div className="app">
      <Navigation />
      <SWRConfig
        value={{
          revalidateOnFocus: false,
          fetcher,
        }}
      >
        {children}
      </SWRConfig>
    </div>
  );
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export function GuestLayout({ children }) {
  return (
    <div>
      <Navigation guest />
      {children}
      <Footer />
    </div>
  );
}

GuestLayout.propTypes = AppLayout.propTypes;

export default function App({ Component, pageProps }: AppProps) {
  // @ts-ignore
  const Layout = Component.Layout || AppLayout;
  useResize();

  return (
    <AuthProvider>
      <Layout>
        <Head>
          <title>CADteams</title>
        </Head>
        <AmplitudeProvider>
          <Component {...pageProps} />
        </AmplitudeProvider>
      </Layout>
    </AuthProvider>
  );
}
