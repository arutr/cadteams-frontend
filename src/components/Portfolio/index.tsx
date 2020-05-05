import React from 'react';
import classNames from 'classnames';
import Modal from '../Modal';
import User from '../../api/User';
import { Heading1, Heading2, Heading3 } from '../Heading';
import Label, { LabelContainer } from '../Label';
import Link from '../Link';
import Button, { AnchorButton } from '../Button';

import styles from './Portfolio.module.scss';

interface Props {
  user: User;
  onClose: () => void;
}

function Portfolio({ user, onClose }: Props) {
  return (
    <Modal onClose={onClose} className={styles.portfolio}>
      <header>
        <div className={classNames(styles.card, styles.identity)}>
          <img
            className={!user.profilePhoto ? styles.blank_profile : null}
            src={user.profilePhoto || '/icons/user-blank.svg'}
            alt={`${user.firstName} ${user.lastName}`}
          />
          <aside>
            <Heading1 bold condensed marginTop={0} marginBottom={0}>
              {user.firstName ? `${user.firstName} ${user.lastName}` : 'BIM/CAD Specialist'}
            </Heading1>
            <Heading3 marginTop="0.25rem">
              {user.specialization}
            </Heading3>
            {user.sectors && (
              <LabelContainer>
                {user.sectors.map((label, index) => (
                  <Label key={index}>
                    {label}
                  </Label>
                ))}
              </LabelContainer>
            )}
          </aside>
        </div>
        <div className={classNames(styles.card, styles.skills)}>
          <div className={styles.row}>
            <div>
              <span className="icon icon__large icon__location" />
              <span>{user.location}</span>
            </div>
            <div>
              <span className="icon icon__large icon__medal" />
              {user.experience && (
                <span><strong>{user.experience}</strong> years of experience</span>
              )}
            </div>
          </div>
          {user.languages && (
            <div className={styles.languages}>
              <span className="icon icon__large icon__language" />
              <LabelContainer>
                {user.languages.map((language, index) => (
                  <Label key={index}>{language}</Label>
                ))}
              </LabelContainer>
            </div>
          )}
          {user.tools && (
            <div>
              <span className="icon icon__large icon__ruler" />
              <LabelContainer>
                {user.tools.map((tool, index) => (
                  <Label key={index}>{tool}</Label>
                ))}
              </LabelContainer>
            </div>
          )}
        </div>
      </header>
      <section className={styles.designs}>
        {[1, 2, 3, 4].map((_, index) => {
          if (user.designs[index]) {
            return (
              <Link key={index} external href={user.designs[index]} hoverEffect={false}>
                <img
                  src={user.designs[index]}
                  alt="Design"
                />
              </Link>
            );
          }

          return (
            <div className={styles.blank_design}>
              <Button>+ Add a design</Button>
            </div>
          );
        })}
      </section>
      {user.uniqueSkills && (
        <section className={styles.unique_skills}>
          <Heading2 marginTop="0" condensed bold>Unique Skills</Heading2>
          <div className={styles.row}>
            {user.uniqueSkills.map((skill, index) => (
              <article key={index} className={styles.card}>
                <Heading3>{skill}</Heading3>
              </article>
            ))}
          </div>
        </section>
      )}
      <footer className={styles.card}>
        <Heading2 marginTop="0" bold condensed>Like what you&apos;re seeing?</Heading2>
        <p>
          Get in touch with specialists
          like {user.firstName} on <b>CAD</b>teams <strong>soon</strong>.
          Stay informed on our progress through <b>CAD</b>teams Magazine.
        </p>
        <AnchorButton block external href="https://eepurl.com/gXt3-L">
          Sign up to the newsletter
        </AnchorButton>
      </footer>
    </Modal>
  );
}

export default Portfolio;
