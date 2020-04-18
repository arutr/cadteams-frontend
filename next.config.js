const {
  PHASE_PRODUCTION_BUILD,
  PHASE_PRODUCTION_SERVER,
  PHASE_DEVELOPMENT_SERVER
} = require('next/constants');

module.exports = (phase) => {
  const isProduction = (phase === PHASE_PRODUCTION_BUILD || phase === PHASE_PRODUCTION_SERVER)
                        && process.env.NODE_ENV !== 'staging';

  if (phase !== PHASE_DEVELOPMENT_SERVER) {
    console.log(`phase: ${phase}`);
    console.log(`environment: ${process.env.NODE_ENV}, isProduction: ${isProduction}`);
  }

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
