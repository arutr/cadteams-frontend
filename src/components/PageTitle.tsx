import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

export default function PageTitle({ children }) {
  return (
    <Head>
      <title>{children} | CADteams</title>
    </Head>
  );
}

PageTitle.propTypes = {
  children: PropTypes.node.isRequired,
};
