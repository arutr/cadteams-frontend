import React from 'react';
import Link from '../Link';

import styles from './Footer.module.scss';

const socialMedia = [
  {
    name: 'facebook',
    href: 'https://facebook.com/cadteams',
  },
  {
    name: 'instagram',
    href: 'https://instagram.com/cadteams',
  },
  {
    name: 'linkedin',
    href: 'https://linkedin.com/company/cadteams',
  },
  {
    name: 'medium',
    href: 'https://medium.com/cadteams-magazine',
  },
];

function Footer() {
  return (
    <footer className={styles.footer}>
      <ul>
        <div>
          <span>
            &copy; {new Date().getFullYear()} <b>CAD</b>teams
          </span>
          <Link
            external
            href="https://drive.google.com/uc?id=1MuNKTTASbRC7NhVGxbMNxtwDDdhxrOe9"
          >
            Privacy & Terms
          </Link>
          <a href="mailto:hello@cadteams.com">Contact Us</a>
        </div>
        <div className={styles.social}>
          {socialMedia.map(({ name, href }, index) => (
            <Link
              key={index}
              className="icon__large"
              icon={name}
              href={href}
              external
            />
          ))}
        </div>
      </ul>
    </footer>
  );
}

export default Footer;
