import React from 'react';
import Navigation from '../src/components/Navigation';

export function Horizontal() {
  return (
    <div className="wrapper">
      <Navigation>
        <span>Individuals</span>
        <span>Enterprise</span>
        <span>Sign In</span>
        <span>Sign Up</span>
      </Navigation>
      <h1>Heading</h1>
      <h2>Heading</h2>
      <h3>Heading</h3>
      <h4>Heading</h4>
      <p>Lorem ipsum lol</p>
      <style jsx>
        {`
          .wrapper {
            height: 200vh;
            background: linear-gradient(var(--color-blue), var(--color-cream));
          }
        `}
      </style>
    </div>
  );
}

export default { title: 'Navigation' };
