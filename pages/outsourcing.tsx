import classNames from 'classnames';
import React from 'react';
import { AnchorButton } from 'src/components/Button';
import Footer from 'src/components/Footer';
import { Heading1, Heading2 } from 'src/components/Heading';
import Icon from 'src/components/Icon';
import Illustration from 'src/components/Illustration';
import Newsletter from 'src/components/Newsletter';
import layout from 'src/layouts/LandingPageLayout.module.scss';

const steps = [
  {
    title: 'Promote Your Services to a Global Audience',
    description: (
      <>
        <b>CAD</b>teams unites AEC companies from across the world. Don&apos;t limit yourself to a
        small, local audience - embrace the global opportunities!
      </>
    ),
  },
  {
    title: 'Scale Your Teams',
    description: (
      <>
        Build specialist teams on <b>CAD</b>teams to accommodate your client projects. Choose from
        a vast number of BIM/CAD specialists, browse their portfolios, and hire talent for the next
        challenging project.
      </>
    ),
  },
  {
    title: 'Expand Your Business Development Opportunities',
    description: (
      <>
        <b>CAD</b>teams is not just another job board - we&apos;re a network of AEC Professionals
        that wish to connect, and showcase great building designs. Come and join us to establish new
        business relationships worldwide.
      </>
    ),
  },
];
const upgrades = [
  {
    illustration: 'problem_solving',
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
    illustration: 'team_work',
    title: 'Project Coordination Dashboard',
    description: (
      <>
        Coordinate projects carried out for other companies through <b>CAD</b>teams and we&apos;ll
        show you how everything links together, from start to finish. View all of your specialist
        teams in one place, and gain an overview of team activities. Manage each group and each
        specialist straight from the dashboard via quick actions to save time.
      </>
    ),
  },
  {
    illustration: 'user_status',
    title: 'Calendar',
    description: (
      <>
        Forget about scheduling calls with specialists and AEC companies every time you want to work
        with them. View their personal calendar, see the availability over the upcoming 2-4 weeks,
        and simply make a time booking! Allow other AEC companies to easily reserve your
        studio&apos;s time through your own personal calendar as well.
      </>
    ),
  },
];

export default function Outsourcing() {
  return (
    <div className={layout.index}>
      <main>
        <section className={layout.hero}>
          <div className={layout.left}>
            <Heading1>Win more AEC clients and source talented BIM/CAD specialists.</Heading1>
            <AnchorButton href="/sign-up" large>Get Started</AnchorButton>
          </div>
          <aside className={layout.illustration}>
            <Illustration name="world_connection" />
          </aside>
        </section>
      </main>
      <div className={classNames(layout.background, layout.silver)}>
        <main>
          <Heading1 marginTop="0" bold condensed>
            Outsourcing Hub
          </Heading1>
          <p>
            For outsourcing studios in architecture, engineering, and construction (AEC)
            sectors focused on quality building modelling and design. Incorporate <b>CAD</b>teams
            into your operations and take advantage:
          </p>
          <section className={layout['three-column-grid']}>
            {steps.map((item, index) => (
              <article key={index}>
                <Heading2 bold condensed>{item.title}</Heading2>
                <p>{item.description}</p>
              </article>
            ))}
          </section>
        </main>
      </div>
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
            <Heading1 marginTop="0" bold condensed>Time to expand your business horizons.</Heading1>
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
      <Footer />
    </div>
  );
}
