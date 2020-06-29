import classNames from 'classnames';
import { InferGetStaticPropsType } from 'next';
import React, { useState } from 'react';
import { Individual } from 'src/api/User';
import { AnchorButton } from 'src/components/Button';
import { Select } from 'src/components/Form';
import { Heading1, Heading2 } from 'src/components/Heading';
import Icon from 'src/components/Icon';
import Illustration from 'src/components/Illustration';
import { ModalProvider } from 'src/components/Modal';
import Newsletter from 'src/components/Newsletter';
import { IdentityCard } from 'src/components/Portfolio/Identity';
import ProfileUpdateProvider from 'src/contexts/ProfileUpdateContext';
import layout from 'src/layouts/LandingPageLayout.module.scss';
import styles from './enterprise.module.scss';

const specialists: Individual[] = [
  {
    username: 'Manuel A.',
    dailyRate: 240,
    country: 'GB',
    type: 'individual',
    profilePicture: {
      url: '/images/portfolio-demo/manuel/profile-picture.jpg',
    },
    specialization: 'Architectural Technician',
    sectors: [{
      id: 1,
      label: 'Residential',
    }, {
      id: 2,
      label: 'Modular',
    }],
    location: 'Brighton',
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
        url: '/images/portfolio-demo/manuel/design1.png',
      },
      {
        url: '/images/portfolio-demo/manuel/design2.png',
      },
      {
        url: '/images/portfolio-demo/manuel/design3.png',
      },
      {
        url: '/images/portfolio-demo/manuel/design4.png',
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
  },
  {
    username: 'Jamie M.',
    dailyRate: 216,
    country: 'GB',
    type: 'individual',
    profilePicture: {
      url: '/images/portfolio-demo/jamie/profile-picture.jpeg',
    },
    specialization: 'Piping/Mechanical Designer',
    sectors: [{
      id: 1,
      label: 'Pipework',
    }, {
      id: 2,
      label: 'Steelwork',
    }, {
      id: 3,
      label: 'Plant Rooms',
    }],
    location: 'Manchester',
    experience: 4,
    languages: [{
      id: 1,
      label: 'English',
    }],
    tools: [{
      id: 1,
      label: 'AutoCAD',
    }, {
      id: 2,
      label: 'AutoCAD Plant 3D',
    }, {
      id: 3,
      label: 'Navisworks',
    }, {
      id: 4,
      label: 'Recap',
    }],
    designs: [
      {
        url: '/images/portfolio-demo/jamie/design1.jpeg',
      },
      {
        url: '/images/portfolio-demo/jamie/design2.jpeg',
      },
      {
        url: '/images/portfolio-demo/jamie/design3.jpeg',
      },
      {
        url: '/images/portfolio-demo/jamie/design4.jpeg',
      },
    ],
    uniqueSkills: [{
      id: 1,
      skill: `Communication of design with all stakeholders ensuring efficiency improvements can be
      achieved in manufacturing`,
    }, {
      id: 2,
      skill: 'Fabrication drawings ready for the factory shopfloor',
    }, {
      id: 3,
      skill: 'Plant room design from scratch',
    }],
  },
];
const steps = [
  {
    title: 'Browse Specialist Portfolios',
    description: `Find the right person in our stunning gallery of designs hand-picked by the
    specialists themselves. Each portfolio also contains essential information, such as level of
    experience, daily rate, location, time zone, unique skills and a concise introduction.`,
  },
  {
    title: 'Connect with Specialists',
    description: (
      <>
        Once you find a candidate that suits your business needs, send them a Connect Request! Wait
        for the specialist to accept the invitation and then enjoy the access to their direct
        contact information. Discuss opportunities via e-mail or have a chat over the phone.
      </>
    ),
  },
  {
    title: 'View Specialists\' Availability',
    description: (
      <>
        Forget about scheduling calls with a specialist every time you want to work with them. View
        their personal calendar, see the availability over the upcoming 2-4 weeks, and simply make a
        time booking! <strong>Now everyone is on the same page.</strong>
      </>
    ),
  },
  {
    title: 'Create Your Specialist Team',
    description: (
      <>
        Successful projects require several specialists to deliver them on time. Build your very
        own <b>CAD</b>team and invite specialists to the group that you believe can get the work
        done.
      </>
    ),
  },
];
const upgrades = [
  {
    illustration: 'startup',
    title: 'Connect with More Talent',
    description: (
      <>
        With a Standard Account, you can connect with up to 2 platform members every month. To
        increase your business opportunities, switch to the Advanced Account and
        grow your network by <strong>up to 40 members per month</strong>!
      </>
    ),
  },
  {
    illustration: 'online_team_meeting',
    title: 'Remote Team Dashboard',
    description: (
      <>
        View all of your teams in one place and get an overview of individuals&apos; activities.
        Manage each <b>CAD</b>team, and each specialist, straight from the dashboard via quick
        actions to save time.
      </>
    ),
  },
  {
    illustration: 'report_analysis',
    title: 'Cost Reporting',
    description: (
      <>
        Access a clear picture of all expenditure on modelling activities for each scheme you have
        on <b>CAD</b>teams. Compare cost-effectiveness and time required to deliver each job, so you
        can tweak your planning strategy more
        effectively. <strong>Enjoy the power of fully transparent data.</strong>
      </>
    ),
  },
];

export async function getStaticProps() {
  const data = await fetch('https://api.exchangeratesapi.io/latest?base=GBP&symbols=EUR,PLN,USD');
  const { rates } = await data.json();

  if (!rates) {
    return {
      props: {
        rates: {
          EUR: 1.0,
          PLN: 1.0,
          USD: 1.0,
        },
      },
    };
  }

  return {
    props: {
      rates,
    },
  };
}

export default function Enterprise({ rates }: InferGetStaticPropsType<typeof getStaticProps>) {
  const [currency, setCurrency] = useState('GBP');

  return (
    <ModalProvider providerOnly className={layout.index}>
      <main>
        <section className={layout.hero}>
          <div className={layout.left}>
            <Heading1>Discover talented BIM/CAD specialists for your next project.</Heading1>
            <AnchorButton href="/sign-up" large>Browse Portfolios</AnchorButton>
          </div>
          <aside className={layout.illustration}>
            <Illustration name="profiling" />
          </aside>
        </section>
      </main>
      <div className={classNames(layout.background, layout.silver)}>
        <main>
          <Heading1 marginTop="0" bold condensed>
            Enterprise Hub
          </Heading1>
          <p>
            For architecture, engineering, and construction (AEC) companies looking for a reliable
            source of experienced BIM/CAD specialists. Here&apos;s how <b>CAD</b>teams can integrate
            into your existing talent acquisition process:
          </p>
          <section className={classNames(layout['four-column-grid'], layout.steps)}>
            {steps.map((item, index) => (
              <article key={index}>
                <span className={layout['step-heading']}>{index + 1}.</span>
                <Heading2 bold condensed>{item.title}</Heading2>
                <p>{item.description}</p>
              </article>
            ))}
          </section>
        </main>
      </div>
      <main className={styles.specialists}>
        <Heading1 marginTop="0" bold condensed>
          Specialists Ready to Join Your Team
          <Select
            defaultValue="GBP"
            options={[
              {
                label: '£ GBP',
                value: 'GBP',
              },
              {
                label: '€ EUR',
                value: 'EUR',
              },
              {
                label: 'zł PLN',
                value: 'PLN',
              },
              {
                label: '$ USD',
                value: 'USD',
              },
            ]}
            onChange={(event) => setCurrency(event.target.value)}
          />
        </Heading1>
        <ProfileUpdateProvider>
          <section className={layout['two-column-grid']}>
            {specialists.map((specialist, index) => (
              <IdentityCard
                demo
                key={index}
                user={specialist}
                className={styles.card}
                currency={currency}
                exchangeRate={rates[currency]}
                sectors={specialist.sectors}
              />
            ))}
          </section>
        </ProfileUpdateProvider>
      </main>
      <div className={classNames(layout.background, layout.purple)}>
        <main>
          <Heading1 marginTop="0" bold condensed>
            <Icon className={layout['power-up']} name="arrow-up" /> Power Up
          </Heading1>
          <p>
            Enjoy additional features and go further with the <strong>Advanced Account</strong>:
          </p>
          <section className={layout['three-column-grid']}>
            {upgrades.map((item, index) => (
              <article key={index}>
                <Illustration name={item.illustration} />
                <Heading2 bold condensed>{item.title}</Heading2>
                <p>{item.description}</p>
              </article>
            ))}
          </section>
        </main>
      </div>
      <div className={classNames(layout.background, layout.blue)}>
        <main className={layout['two-column-grid']}>
          <section>
            <Heading1 marginTop="0" bold condensed>Time to discover great talent.</Heading1>
            <p>
              Get started with <b>CAD</b>teams <strong>for free</strong>. Don&apos;t miss out and
              join us today.
            </p>
          </section>
          <aside>
            <AnchorButton href="/sign-up" large block>Create a Free Account</AnchorButton>
          </aside>
        </main>
      </div>
      <Newsletter />
    </ModalProvider>
  );
}
