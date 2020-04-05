import React from 'react';
import Link from '../Link';

import './Footer.module.scss';

function Footer() {
  return (
    <footer>
      <ul>
        <span>
          &copy; 2019&ndash;
          {new Date().getFullYear()}
          &nbsp;
          <b>CAD</b>teams
        </span>
        <Link href="/terms-and-conditions" external>Terms and Conditions</Link>
        <Link href="/legal" external>Legal</Link>
      </ul>
    </footer>
  );
}

export default Footer;
