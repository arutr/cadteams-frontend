import classNames from 'classnames';
import React from 'react';
import { AnchorButton } from 'src/components/Button';
import { Heading1, Heading2 } from 'src/components/Heading';
import Icon from 'src/components/Icon';
import Illustration from 'src/components/Illustration';
import Link from 'src/components/Link';
import Newsletter from 'src/components/Newsletter';
import layout from 'src/layouts/LandingPageLayout.module.scss';

const payScaleUrl = 'https://www.project-resource.co.uk/freelance/salarysurvey/freelance-bim-revit-and-cad-average-salaries';
const steps = [
  {
    title: 'Showcase Your Portfolio',
    description: `Upload images and video walkthroughs presenting your own work. Make sure your
    profile looks well organised by mentioning only the relevant software suites and being specific
    about your unique skills.`,
  },
  {
    title: 'Set Your Daily Rate',
    description: (
      <>
        How much do you charge per day? In case there is a long term project contract, it
        is worth specifying a desired monthly salary. Please refer to
        a <Link external href={payScaleUrl}>Pay Scale</Link> for guidance.
      </>
    ),
  },
  {
    title: 'Indicate Your Availability',
    description: (
      <>
        Synchronise your Calendar with <b>CAD</b>teams and enjoy better organised work. Clients
        can see when you are available and book your time accordingly.
      </>
    ),
  },
  {
    title: 'Dive Into the Next Project',
    description: `By being constantly challenged you'll gain new skills, improve your work
    efficiency and grow professionally. You can also rate your experience of working with each
    company.`,
  },
];
const upgrades = [
  {
    illustration: 'information_flow',
    title: 'Auto-Invoicing',
    description: (
      <>
        Working for multiple clients requires a substantial amount of time spent on organising
        finances and getting paid. Streamline your process and offload that task to us! We take your
        project information, automatically create invoices, send them to your clients and double
        check if payments have been completed.
      </>
    ),
  },
  {
    illustration: 'conversation',
    title: 'More Connections',
    description: (
      <>
        With a Standard Account, you can connect with up to 2 platform members every month. To
        increase your business opportunities, switch to the Advanced Account and
        grow your network by <strong>up to 20 members per month</strong>!
      </>
    ),
  },
  {
    illustration: 'family',
    title: 'Digital Assistant',
    description: (
      <>
        Unwind after work and enjoy your time with friends and family because your Digital Assistant
        takes care of organising the projects pipeline. When you start the following day,
        you&apos;ll be presented with key statistics about all schemes. Now you are in the driving
        seat.
      </>
    ),
  },
];
// const quotes = [
//   {
//     author: 'Revit Expert',
//     description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent in lectus
//     gravida, vestibulum augue dictum, finibus enim. Integer sed ex tellus.`,
//   },
//   {
//     author: 'CAD Specialist',
//     description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent in lectus
//     gravida, vestibulum augue dictum, finibus enim. Integer sed ex tellus.`,
//   },
// ];

export default function Individuals() {
  return (
    <div className={layout.index}>
      <main>
        <section className={layout.hero}>
          <div className={layout.left}>
            <Heading1>Find your next BIM/CAD project by showcasing your talent.</Heading1>
            <AnchorButton href="/sign-up" large>Get Hired</AnchorButton>
          </div>
          <aside className={layout.illustration}>
            <Illustration name="innovation" />
          </aside>
        </section>
      </main>
      <div className={classNames(layout.background, layout.silver)}>
        <main>
          <Heading1 marginTop="0" bold condensed>
            Remote Specialist Hub
          </Heading1>
          <p>
            For professionals experienced in BIM and CAD workflows. Get started
            in <strong>four simple steps</strong>:
          </p>
          <section className={layout['four-column-grid']}>
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
      {/* <main className={layout['two-column-grid']}> */}
      {/*  {quotes.map((item, index) => ( */}
      {/*    <blockquote key={index}> */}
      {/*      <p><i>{item.description}</i></p> */}
      {/*      <strong>{item.author}</strong> */}
      {/*    </blockquote> */}
      {/*  ))} */}
      {/* </main> */}
      <div className={classNames(layout.background, layout.blue)}>
        <main className={layout['two-column-grid']}>
          <section>
            <Heading1 marginTop="0" bold condensed>Time to show off!</Heading1>
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
    </div>
  );
}
