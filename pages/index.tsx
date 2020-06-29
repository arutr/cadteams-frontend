import classNames from 'classnames';
import React from 'react';
import { AnchorButton } from 'src/components/Button';
import { Heading1, Heading2 } from 'src/components/Heading';
import Icon from 'src/components/Icon';
import Illustration from 'src/components/Illustration';
import Link from 'src/components/Link';
import Newsletter from 'src/components/Newsletter';
import layout from 'src/layouts/LandingPageLayout.module.scss';

const howCadteamsWorks = [
  {
    illustration: 'personal_data',
    title: 'Personalise Your Profile',
    description: `If you're a specialist, this is the time to shine! Upload screenshots of your
    best building designs, specify your area of expertise and highlight top three unique skills.`,
  },
  {
    illustration: 'user_profile',
    title: 'Connect with Others',
    description: `Browse Specialist portfolios, find talented people and start growing your
    professional network. Meeting your new remote colleagues has never been easier.`,
  },
  {
    illustration: 'handshake',
    title: 'Discuss Opportunities',
    description: (
      <>
        <b>CAD</b>teams is a unique environment attracting people from the same industry, which
        means you can jump straight into business.
      </>
    ),
  },
  {
    illustration: 'manager',
    title: (
      <>
        Let <span className="cadteams"><b>CAD</b>teams</span> Organise the Work for You
      </>
    ),
    description: `Admin tasks can be very time consuming and feel like an unnecessary overhead. We
    try our best to take that burden away from you because we understand that work is already
    stressful enough.`,
  },
];
const exploreCadteams = [
  {
    illustration: 'world_wide_web',
    title: 'Remote Specialists',
    description: (
      <>
        Are you experienced in BIM and CAD tools? Do you want to showcase your efforts to a wider
        audience?<br /><br />Join the <b>CAD</b>teams Community of talented individuals and enjoy
        the new way of finding work opportunities.
      </>
    ),
    href: '/individuals',
  },
  {
    illustration: 'architect',
    title: 'Companies',
    description: (
      <>
        The pandemic has proven that we are all capable of working from home and leasing an
        expensive office no longer make sense.<br /><br />If you are a
        registered <strong>Architecture, Engineering or Construction</strong> (AEC)
        business, <Link underlined href="/sign-up">sign up</Link> for an Enterprise account to
        discover how <b>CAD</b>teams can help you find remote colleagues and manage project
        resources.
      </>
    ),
    href: '/enterprise',
  },
  {
    illustration: 'online_presentation',
    title: 'Outsourcing Studios',
    description: (
      <>
        You have a website and existing clients, but how do you establish those new
        connections to grow your pipeline?<br /><br />Showcase your past projects and get noticed by
        AEC companies on the platform. When you need to expand your team, reach out to
        specialists. <strong>We are all on the same platform!</strong>
      </>
    ),
    href: '/outsourcing',
  },
];
const advantages = [
  {
    illustration: 'time',
    title: 'Real-Time People Resourcing',
    description: `View your team's availability and spread the workload accordingly. No more time
    wasted on asking multiple parties if they can fit that extra task into their week.`,
  },
  {
    illustration: 'user_group',
    title: 'Talent Marketplace',
    description: `The beauty of a talent pool is that it attracts a variety of specialists, who know
    how to model structural elements in Revit, produce photo-realistic architectural renders,
    coordinate MEP services, implement layout changes, etc.`,
  },
  {
    illustration: 'calendar',
    title: 'Shared Calendar',
    description: (
      <>
        Synchronise Microsoft Outlook and Google Calendar with <b>CAD</b>teams to easily manage your
        projects pipeline. Indicate your days off for a good work-life balance. You&apos;re in
        charge of your schedule now!
      </>
    ),
  },
  {
    illustration: 'handshake',
    title: 'Business Development',
    description: (
      <>
        What is the best part of industry-specific events? Getting everyone under the same
        roof to foster conversations among like-minded people, which lead to new professional
        relationships. Welcome to the <b>CAD</b>teams Business Development Venue.
      </>
    ),
  },
  {
    illustration: 'achievement',
    title: 'Digital Assistant',
    description: `Did you know that basic admin tasks are costing the self-employed in the United
    Kingdom £28.1bn annually? Whether you're a single Specialist, or an Enterprise team, our tools
    can save you time, so you can focus on delivering world-class projects.`,
  },
  {
    illustration: 'world_connection_mc',
    title: 'Remote Work',
    description: (
      <>
        We are all capable of working remotely, so why not embrace the full potential of this new
        normal? At <b>CAD</b>teams we believe that access to the best specialists, as well as a
        variety of work opportunities, is more important than a shared physical location.
      </>
    ),
  },
];

export default function LandingPage() {
  return (
    <div className={layout.index}>
      <main>
        <section className={layout.hero}>
          <div className={layout.left}>
            <Heading1>Global marketplace for talented BIM/CAD specialists.</Heading1>
            <AnchorButton href="/sign-up" large>Sign Up</AnchorButton>
            <Link underlined href="/individuals">
              <Icon name="arrow-right-double" />
              For BIM/CAD remote specialists
            </Link>
            <Link underlined href="/enterprise">
              <Icon name="arrow-right-double" />
              For companies
            </Link>
            <Link underlined href="/outsourcing">
              <Icon name="arrow-right-double" />
              For outsourcing studios
            </Link>
          </div>
          <aside className={layout.illustration}>
            <Illustration name="3d_model" />
          </aside>
        </section>
      </main>
      <div className={classNames(layout.background, layout.silver)}>
        <main>
          <Heading1 marginTop="0" bold condensed>
            How <span className="cadteams"><b>CAD</b>teams</span> Works
          </Heading1>
          <section className={layout['four-column-grid']}>
            {howCadteamsWorks.map((item, index) => (
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
        <main>
          <Heading1 marginTop="0" bold condensed>
            Explore <span className="cadteams"><b>CAD</b>teams</span>
          </Heading1>
          <p>
            Curious to learn more about us? Navigate to a relevant section below find out
            how <b>CAD</b>teams can help you go further.
          </p>
          <section className={layout['three-column-grid']}>
            {exploreCadteams.map((item, index) => (
              <article key={index}>
                <Illustration name={item.illustration} />
                <Heading2 bold condensed>{item.title}</Heading2>
                <p>{item.description}</p>
                <AnchorButton href={item.href}>Learn More</AnchorButton>
              </article>
            ))}
          </section>
        </main>
      </div>
      <main>
        <Heading1 marginTop="0" bold condensed>
          The <span className="cadteams"><b>CAD</b>teams</span> Advantage
        </Heading1>
        <section className={layout['three-column-grid']}>
          {advantages.map((item, index) => (
            <article key={index}>
              <Illustration name={item.illustration} />
              <Heading2 bold condensed>{item.title}</Heading2>
              <p>{item.description}</p>
            </article>
          ))}
        </section>
      </main>
      <Newsletter />
    </div>
  );
}
