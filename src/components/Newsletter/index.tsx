import React from 'react';
import { Heading1 } from 'src/components/Heading';
import styles from './Newsletter.module.scss';

export default function Newsletter() {
  return (
    <div className={styles.newsletter}>
      <main>
        <Heading1 marginTop="0">
          Subscribe to <span className="cadteams"><b>CAD</b>teams</span> Magazine
        </Heading1>
        <p>
          Sign up to <b>CAD</b>teams Magazine newsletter to hear about latest news and offers from
          us! Leave your e-mail address below.
        </p>
        <iframe height="103" title="Mailchimp" src="/mailchimp.html" />
      </main>
    </div>
  );
}
