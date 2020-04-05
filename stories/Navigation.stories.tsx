import React from 'react';
import Navigation from '../src/components/Navigation';
import Link from '../src/components/Link';

export function Horizontal() {
  return (
    <>
      <Navigation>
        <Link icon="users">Individuals</Link>
        <Link icon="briefcase">Enterprise</Link>
        &emsp;
        <Link icon="edit">Sign Up</Link>
        <Link icon="sign-in">Sign In</Link>
      </Navigation>
      <h1>Heading</h1>
      <h2>Heading</h2>
      <h3>Heading</h3>
      <h4>Heading</h4>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua.
      </p>
    </>
  );
}

export default {
  decorators: [(story) => (
    <div style={{
      height: '200vh',
      background: 'linear-gradient(var(--color-blue), var(--color-cream))',
    }}
    >
      {story()}
    </div>
  )],
  title: 'Navigation',
};
