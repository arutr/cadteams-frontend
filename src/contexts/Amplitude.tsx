import { useRouter } from 'next/router';
import React from 'react';
import PropTypes from 'prop-types';
import { AmplitudeClient } from 'amplitude-js';
import { Amplitude, AmplitudeProvider as BaseAmplitudeProvider } from 'react-amplitude-hooks';
import { useAuth } from 'src/contexts/AuthProvider';
import { inApp, isProduction } from 'src/utils/misc';

export default function AmplitudeProvider({ children }) {
  const { user } = useAuth();
  const { pathname } = useRouter();

  if ((inApp() && !user)
    || (isProduction && user?.email.endsWith('cadteams.com'))) {
    return children;
  }

  // eslint-disable-next-line global-require
  const amplitude = require('amplitude-js');
  const amplitudeInstance: AmplitudeClient = amplitude.getInstance();
  amplitudeInstance.init(process.env.AMPLITUDE_API_KEY, null, {
    logLevel: isProduction ? 'DISABLE' : 'WARN',
    includeGclid: true,
    includeReferrer: true, // https://help.amplitude.com/hc/en-us/articles/215131888#track-referrers
    includeUtm: true,
  });

  return (
    <BaseAmplitudeProvider
      amplitudeInstance={amplitudeInstance}
      apiKey={process.env.AMPLITUDE_API_KEY}
    >
      <Amplitude
        eventProperties={{
          page: {
            pathname,
          },
        }}
        userProperties={{
          type: user?.type,
        }}
      >
        {children}
      </Amplitude>
    </BaseAmplitudeProvider>
  );
}

AmplitudeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
