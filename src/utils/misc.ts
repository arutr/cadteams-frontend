import { useRouter } from 'next/router';

export const inApp = () => {
  const { pathname } = useRouter();
  return pathname.startsWith('/app');
};

export const isBrowser = () => typeof window !== 'undefined';
export const isProduction = process.env.NODE_ENV === 'production';

export const currencyFormat = new Intl.NumberFormat(
  'en-GB',
  {
    style: 'currency',
    currency: 'GBP',
  },
);

export const getFirstName = (username) => {
  if (username) {
    return username.split(' ')[0];
  }

  return '';
};
