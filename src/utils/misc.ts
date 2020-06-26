import { useRouter } from 'next/router';

export const inApp = () => {
  const { pathname } = useRouter();
  return pathname.startsWith('/app');
};

export const isBrowser = () => typeof window !== 'undefined';
