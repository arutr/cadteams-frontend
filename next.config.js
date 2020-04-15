const { PHASE_PRODUCTION_BUILD } = require('next/constants');

const AMPLITUDE_API_KEY_DEV = 'b24ef558d35927bc66874e6f55ee68e8';
const AMPLITUDE_API_KEY_PROD = '3f4dbfec1d23492b37a61b301256286d';

module.exports = (phase) => {
  const isProd = phase === PHASE_PRODUCTION_BUILD;

  return ({
    env: {
      AMPLITUDE_API_KEY: isProd ? AMPLITUDE_API_KEY_PROD : AMPLITUDE_API_KEY_DEV,
    },
    typescript: {
      ignoreDevErrors: true,
    },
  });
};
