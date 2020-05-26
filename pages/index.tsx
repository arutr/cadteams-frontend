import classNames from 'classnames';
import NextLink from 'next/link';
import React, { useState } from 'react';
import { Heading1 } from 'src/components/Heading';
import Icon from 'src/components/Icon';
import { PortfolioModal } from 'src/components/Portfolio';
import { ModalProvider } from 'src/components/Modal';
import { AnchorButton } from 'src/components/Button';
import User from '../src/api/User';
import Footer from '../src/components/Footer';
import Link from '../src/components/Link';
import MediaObject from '../src/components/MediaObject';
import styles from './index.module.scss';

const features = [
  {
    heading: 'Present yourself with designs you are proud of.',
    description: `Create a portfolio of your expertise: upload design samples from your favourite
      projects, and highlight the skills that make you stand out.`,
    media: '/images/landing-page/feature1.png',
  },
  {
    heading: 'Explore designs of other talented individuals.',
    description: `Browse through a gallery of design portfolios created by top BIM/CAD
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

function LandingPage() {
  // const [newsletterModal, setNewsletterModal] = useState(false);
  const [portfolioModal, setPortfolioModal] = useState(false);
  // const toggleNewsletterModal = () => setNewsletterModal(!newsletterModal);
  const togglePortfolioModal = () => setPortfolioModal(!portfolioModal);

  return (
    <ModalProvider>
      <main>
        <section className={styles.hero}>
          <article>
            <Heading1>
              Showcase your best pieces of building designs.
            </Heading1>
            <NextLink href="/sign-up" passHref>
              <AnchorButton large>Sign Up</AnchorButton>
            </NextLink>
          </article>
          <aside>
            <MediaObject
              id={styles.design1}
              src="/images/landing-page/design1.png"
              alt="Gateway House, Finchley"
            >
              <p>Gateway House, Finchley</p>
              <Link href="https://www.david-miller.co.uk/gateway-house.php" external>
                <Icon name="share" /> David Miller Architects
              </Link>
            </MediaObject>
            <MediaObject
              id={styles.design2}
              src="/images/landing-page/design2.png"
              alt="Plant Room"
            >
              <p>Plant Room</p>
              <Link onClick={togglePortfolioModal}>
                <Icon name="view" /> Manuel A.
              </Link>
            </MediaObject>
            <MediaObject
              id={styles.design3}
              src="/images/landing-page/design3.png"
              alt="Fairfield Inn and Suites"
            >
              <p>Fairfield Inn and Suites</p>
              <Link
                href="https://www.united-bim.com/portfolio/fairfield-inn-and-suites-mep/"
                external
              >
                <Icon name="share" /> United BIM
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
            <NextLink href="/sign-up" passHref>
              <AnchorButton block large>
                Create a free account
              </AnchorButton>
            </NextLink>
          </aside>
        </section>
      </main>
      <Footer />
      {/* {newsletterModal && ( */}
      {/*  <Modal className={styles.newsletter} onClose={toggleNewsletterModal}> */}
      {/*    <Heading1 marginTop={0}>Coming Soon!</Heading1> */}
      {/*    <p> */}
      {/*      We are working very hard to get <b>CAD</b>teams up and running. */}
      {/*      Stay up-to-date with the progress by signing up to our newsletter. */}
      {/*    </p> */}
      {/*    <p>Fill out the form below to get started:</p> */}
      {/*    <iframe title="mailchimp" src="/mailchimp.html" /> */}
      {/*  </Modal> */}
      {/* )} */}
      {portfolioModal && (
        <PortfolioModal demo user={user} onClose={togglePortfolioModal} />
      )}
    </ModalProvider>
  );
}

export default LandingPage;
