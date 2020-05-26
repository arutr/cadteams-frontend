const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase) => {
  if (phase !== PHASE_DEVELOPMENT_SERVER) {
    console.log(`phase: ${phase} environment: ${process.env.NODE_ENV}`);
  }

  const dotEnvResult = require('dotenv').config({
    path: `.${process.env.NODE_ENV}.env`
  });

  if (dotEnvResult.error) {
    throw dotEnvResult.error;
  }

  return ({
    env: {
      AMPLITUDE_API_KEY: process.env.AMPLITUDE_API_KEY,
      API_URL: process.env.API_URL,
      FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    },
    typescript: {
      ignoreDevErrors: true,
    },
    webpack: (config, options) => {
      config.module.rules.push({
        test: /\.svg$/,
        use: [
          options.defaultLoaders.babel,
          {
            loader: '@svgr/webpack',
            options: {
              svgoConfig: {
                plugins: {
                  removeViewBox: false
                }
              }
            }
          }
        ],
      });

      return config;
    },
  });
};
