const { PHASE_PRODUCTION_BUILD, PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase) => {
  // const isDevelopment = phase === PHASE_DEVELOPMENT_SERVER;
  // const isStaging = phase === PHASE_PRODUCTION_BUILD && process.env.NODE_ENV === 'staging';
  const isProduction = phase === PHASE_PRODUCTION_BUILD && process.env.NODE_ENV !== 'staging';

  console.log(`environment: ${process.env.NODE_ENV}, isProduction: ${isProduction}`);

  const dotEnvResult = require('dotenv').config({
    path: isProduction ? '.production.env' : '.staging.env',
  });

  if (dotEnvResult.error) {
    throw dotEnvResult.error;
  }

  return ({
    env: {
      AMPLITUDE_API_KEY: process.env.AMPLITUDE_API_KEY,
    },
    typescript: {
      ignoreDevErrors: true,
    },
  });
};
