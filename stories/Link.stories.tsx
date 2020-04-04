import React from 'react';
import Link from '../src/components/Link';

export function Basic() {
  return (
    <Link href="/">Terms and Conditions</Link>
  );
}

export function withIcon() {
  return (
    <Link href="/" icon="sign-in">Sign In</Link>
  );
}

export function external() {
  return (
    <Link href="https://google.com/" external>Google</Link>
  );
}

export default {
  decorators: [(story) => (
    <section style={{ padding: '1rem' }}>
      {story()}
    </section>
  )],
  title: 'Link',
};
