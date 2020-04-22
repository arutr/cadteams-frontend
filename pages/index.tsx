import React, { useState } from 'react';
import classNames from 'classnames';
import Navigation from '../src/components/Navigation';
import Link from '../src/components/Link';
import Footer from '../src/components/Footer';
import { Heading1 } from '../src/components/Heading';
import Button from '../src/components/Button';
import MediaObject from '../src/components/MediaObject';
import Modal, { ModalProvider } from '../src/components/Modal';

import styles from './index.module.scss';
import User from '../src/api/User';
import PortfolioModal from '../src/components/Portfolio';

function LandingPage() {
  const features = [
    {
      heading: 'Present yourself with designs you are proud of.',
      description: `Create a portfolio of your expertise: upload design samples from your favourite
      projects, and highlight the skills that make you stand out.`,
      media: '/images/landing-page/feature1.png',
    },
    {
      heading: 'Explore designs of other talented individuals.',
      description: `Browse through a gallery of design portfolios created by top CAD/BIM
      specialists.`,
      media: '/images/landing-page/feature2.png',
      reverse: true,
    },
    {
      heading: 'Get to know each other.',
      description: `Enjoying someone’s portfolio? Send a request for their contact information and
      become acquainted with each other.`,
      media: '/images/landing-page/feature3.png',
      maxHeight: '7rem',
    },
  ];
  const user: User = {
    firstName: 'Manuel',
    lastName: 'A.',
    profileUrl: '/images/portfolio-demo/profile-picture.jpg',
    specialisation: 'Architectural Technology',
    labels: ['Residential', 'Modular'],
    location: 'Brighton, UK',
    experience: 5,
    languages: ['English', 'Spanish'],
    tools: ['Revit', '3Ds Max', 'Photoshop'],
    designs: [
      '/images/portfolio-demo/design1.png',
      '/images/portfolio-demo/design2.png',
      '/images/portfolio-demo/design3.png',
      '/images/portfolio-demo/design4.png',
    ],
  };
  const [newsletterModal, setNewsletterModal] = useState(false);
  const [portfolioModal, setPortfolioModal] = useState(false);

  function toggleNewsletterModal() {
    setNewsletterModal(!newsletterModal);
  }

  function togglePortfolioModal() {
    setPortfolioModal(!portfolioModal);
  }

  return (
    <ModalProvider>
      <Navigation>
        <Link icon="edit" onClick={toggleNewsletterModal}>
          Sign Up
        </Link>
        <Link icon="sign-in" onClick={toggleNewsletterModal}>
          Sign In
        </Link>
      </Navigation>
      <main>
        <section className={styles.hero}>
          <article>
            <Heading1>
              Showcase your best pieces of building designs.
            </Heading1>
            <Button large onClick={toggleNewsletterModal}>
              Sign Up
            </Button>
          </article>
          <aside>
            <MediaObject
              id={styles.design1}
              src="/images/landing-page/design1.png"
              alt="Gateway House, Finchley"
            >
              <p>Gateway House, Finchley</p>
              <Link
                icon="share"
                href="https://www.david-miller.co.uk/gateway-house.php"
                external
              >
                David Miller Architects
              </Link>
            </MediaObject>
            <MediaObject
              id={styles.design2}
              src="/images/landing-page/design2.png"
              alt="Plant Room"
            >
              <p>Plant Room</p>
              <Link icon="view" onClick={togglePortfolioModal}>
                Manuel A.
              </Link>
            </MediaObject>
            <MediaObject
              id={styles.design3}
              src="/images/landing-page/design3.png"
              alt="Fairfield Inn and Suites"
            >
              <p>Fairfield Inn and Suites</p>
              <Link
                icon="share"
                href="https://www.united-bim.com/portfolio/fairfield-inn-and-suites-mep/"
                external
              >
                United BIM
              </Link>
            </MediaObject>
          </aside>
        </section>
        {features.map((feature, index) => (
          <section
            className={classNames(styles.features, feature.reverse && styles.reverse)}
            key={index}
          >
            <article>
              <Heading1 bold condensed>{feature.heading}</Heading1>
              <p>{feature.description}</p>
            </article>
            <aside>
              <MediaObject src={feature.media} height={feature.maxHeight} />
            </aside>
          </section>
        ))}
        <section className={styles.cta}>
          <article>
            <Heading1 bold condensed>Time to show off!</Heading1>
            <p>Get started with <b>CAD</b>teams <strong>for free</strong>.</p>
            <p>Don’t miss out and join us today.</p>
          </article>
          <aside>
            <Button block large onClick={toggleNewsletterModal}>
              Create a free account
            </Button>
          </aside>
        </section>
      </main>
      <Footer />
      {newsletterModal && (
        <Modal onClose={toggleNewsletterModal}>
          <Heading1 marginTop={0}>Coming Soon!</Heading1>
          <p>
            We are working very hard to get <b>CAD</b>teams up and running.
            Stay up-to-date with the progress by signing up to our newsletter.
          </p>
          <p>Fill out the form below to get started:</p>
          <iframe title="mailchimp" src="/mailchimp.html" />
        </Modal>
      )}
      {portfolioModal && (
        <PortfolioModal user={user} onClose={togglePortfolioModal} />
      )}
    </ModalProvider>
  );
}

export default LandingPage;
