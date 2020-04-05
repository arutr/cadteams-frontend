import React from 'react';
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
} from '../src/components/Heading';

export function Basic() {
  return (
    <>
      <Heading1>Hello World</Heading1>
      <Heading2>Hello World</Heading2>
      <Heading3>Hello World</Heading3>
      <Heading4>Hello World</Heading4>
      <Heading5>Hello World</Heading5>
      <Heading6>Hello World</Heading6>
    </>
  );
}

export function Bold() {
  return (
    <>
      <Heading1 bold>Hello World</Heading1>
      <Heading2 bold>Hello World</Heading2>
      <Heading3 bold>Hello World</Heading3>
      <Heading4 bold>Hello World</Heading4>
      <Heading5 bold>Hello World</Heading5>
      <Heading6 bold>Hello World</Heading6>
    </>
  );
}

export function Condensed() {
  return (
    <>
      <Heading1 condensed>Hello World</Heading1>
      <Heading2 condensed>Hello World</Heading2>
      <Heading3 condensed>Hello World</Heading3>
      <Heading4 condensed>Hello World</Heading4>
      <Heading5 condensed>Hello World</Heading5>
      <Heading6 condensed>Hello World</Heading6>
      <hr />
      <Heading1 bold condensed>Hello World</Heading1>
      <Heading2 bold condensed>Hello World</Heading2>
      <Heading3 bold condensed>Hello World</Heading3>
      <Heading4 bold condensed>Hello World</Heading4>
      <Heading5 bold condensed>Hello World</Heading5>
      <Heading6 bold condensed>Hello World</Heading6>
    </>
  );
}

export default {
  title: 'Heading',
};
