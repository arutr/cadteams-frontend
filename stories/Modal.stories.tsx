import React, { useState } from 'react';
import { Heading1 } from 'src/components/Heading';
import Modal, { ModalProvider } from '../src/components/Modal';
import Button from '../src/components/Button';
import User from '../src/api/User';
import { PortfolioModal } from '../src/components/Portfolio';

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

export function Portfolio() {
  const user: User = {
    username: 'Manuel A.',
    profilePicture: {
      url: '/images/portfolio-demo/profile-picture.jpg',
    },
    specialization: 'Architectural Technician',
    sectors: [{
      id: 1,
      label: 'Residential',
    }, {
      id: 2,
      label: 'Modular',
    }],
    location: 'Brighton, UK',
    experience: 5,
    languages: [{
      id: 1,
      label: 'English',
    }, {
      id: 2,
      label: 'Spanish',
    }],
    tools: [{
      id: 1,
      label: 'Revit',
    }, {
      id: 2,
      label: '3Ds Max',
    }, {
      id: 3,
      label: 'Photoshop',
    }],
    designs: [
      {
        url: '/images/portfolio-demo/design1.png',
      },
      {
        url: '/images/portfolio-demo/design2.png',
      },
      {
        url: '/images/portfolio-demo/design3.png',
      },
      {
        url: '/images/portfolio-demo/design4.png',
      },
    ],
    uniqueSkills: [{
      id: 1,
      skill: 'Combining Revit and image profile tools for stunning visuals',
    }, {
      id: 2,
      skill: 'Construction-ready drawings in line with BS',
    }, {
      id: 3,
      skill: 'Surveying and site supervision',
    }],
  };

  return (
    <ModalProvider>
      <PortfolioModal onClose={() => {}} user={user} />
    </ModalProvider>
  );
}

export default {
  title: 'Modal',
};
