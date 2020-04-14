import React, { useState } from 'react';
import Modal, { ModalProvider } from '../src/components/Modal';
import Button from '../src/components/Button';
import { Heading1 } from '../src/components/Heading';

export function Basic() {
  const [open, setOpen] = useState(false);

  return (
    <ModalProvider>
      <Button onClick={() => setOpen(true)}>
        Sign up
      </Button>
      {open && (
        <Modal onClose={() => setOpen(false)}>
          <Heading1 bold condensed>
            Coming Soon!
          </Heading1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </p>
          <Button block>Learn More</Button>
        </Modal>
      )}
    </ModalProvider>
  );
}

export default {
  title: 'Modal',
};
