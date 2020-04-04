import React from 'react';
import Button from '../src/components/Button';

export function Compact() {
  return (
    <Button>Sign Up</Button>
  );
}

export function Block() {
  return (
    <Button block>Sign Up</Button>
  );
}

export function Large() {
  return (
    <Button large>Sign Up</Button>
  );
}

export function largeBlock() {
  return (
    <Button block large>Sign Up</Button>
  );
}

export default {
  decorators: [(story) => (
    <section style={{ padding: '1rem' }}>
      {story()}
    </section>
  )],
  title: 'Button',
};
