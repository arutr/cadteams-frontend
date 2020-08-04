import debounce from 'lodash/debounce';
import { useEffect } from 'react';

function handleResize() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

export default function useResize() {
  useEffect(() => {
    handleResize();
    const debouncedResize = debounce(handleResize, 500);
    window.addEventListener('resize', debouncedResize);
    return () => window.removeEventListener('resize', debouncedResize);
  });
}
