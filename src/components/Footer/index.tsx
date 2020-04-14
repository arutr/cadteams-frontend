import React from 'react';
import Link from '../Link';

import styles from './Footer.module.scss';

function Footer() {
  return (
    <footer className={styles.footer}>
      <ul>
        <span>
          &copy; {new Date().getFullYear()} <b>CAD</b>teams
        </span>
        <Link external>Terms and Conditions</Link>
        <Link external>Legal</Link>
      </ul>
    </footer>
  );
}

export default Footer;
