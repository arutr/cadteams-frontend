import React from 'react';
import Icon from '../src/components/Icon';
import Button from '../src/components/Button';

export function Block() {
  return (
    <Button block>Sign Up</Button>
  );
}

export function Compact() {
  return (
    <Button>Sign Up</Button>
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

export function withIcon() {
  return (
    <Button>
      <Icon inverted name="pencil" /> Edit a design
    </Button>
  );
}

export default {
  title: 'Button',
};
