import React from 'react';
import { Checkbox, Input, Radio } from '../src/components/Form';

export function SignUp() {
  return (
    <form>
      <Radio id="type" labels={['Individual', 'Enterprise']} legend="I am an..." />
      <Input label="Full name:" placeholder="John Smith" id="name" />
      <Input label="E-mail address:" placeholder="your@email.com" id="email" type="email" />
      <Input label="Password:" placeholder="y0urPa55w0rd" id="password" type="password" />
      <Checkbox id="newsletter">
        <strong>Yes!</strong> Sign me up to <b>CAD</b>teams Magazine to hear about latest news and
        offers from <b>CAD</b>teams.
      </Checkbox>
    </form>
  );
}

export default {
  title: 'Form',
};
