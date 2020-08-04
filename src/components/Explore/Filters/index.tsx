import classNames from 'classnames';
import { FiltersForm } from 'pages/app/explore';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { industries, specializations } from 'src/api/User';
import Button from 'src/components/Button';
import Checkbox, { CheckboxGroup } from 'src/components/Form/Checkbox';
import { Heading2, Heading3 } from 'src/components/Heading';
import Icon from 'src/components/Icon';
import styles from './Filters.module.scss';

const sections = [
  {
    title: 'Industries',
    name: 'sectors',
    type: 'checkbox',
    options: industries,
  },
  {
    title: 'Specialisation',
    name: 'specialization',
    type: 'checkbox',
    options: specializations,
  },
  {
    title: 'Perks',
    type: 'checkbox',
    options: [
      {
        label: (
          <span title="Specialists that have successfully passed the CADteams verification process">
            Verified by <b>CAD</b>teams <Icon name="verified" />
          </span>
        ),
        id: 'verified',
      },
      {
        label: (<>Instant Booking <Icon name="time-quick" /></>),
        id: 'instantBooking',
      },
    ],
  },
];

interface Props {
  setFilters: (filters) => void;
}

export default function Filters(props: Props) {
  const { setFilters } = props;
  const [open, setOpen] = useState<boolean>(false);
  const { register, handleSubmit } = useForm<FiltersForm>();
  const toggleMenu = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setOpen(!open);
  };
  const onInput = handleSubmit((values) => {
    const filtered = Object.entries(values).filter(([, value]) => value);
    const query = Object.fromEntries(filtered);
    return setFilters(query);
  });

  return (
    <aside className={classNames(styles.filters, open && styles.open)}>
      <header tabIndex={0} role="button" onClick={toggleMenu} onKeyDown={toggleMenu}>
        <Heading2 bold condensed>Filters</Heading2>
        <Icon className={styles.toggle} name="chevron" />
      </header>
      {sections.map((section, index) => {
        if (section.type === 'checkbox') {
          return (
            <React.Fragment key={index}>
              <Heading3 bold>{section.title}</Heading3>
              <CheckboxGroup>
                {/* @ts-ignore */}
                {section.options.map((option, j) => {
                  if (typeof option === 'object') {
                    return (
                      <Checkbox
                        key={j}
                        id={option.id}
                        onInput={onInput}
                        ref={register}
                        defaultChecked={option.defaultChecked}
                      >
                        {option.label}
                      </Checkbox>
                    );
                  }

                  return (
                    <Checkbox
                      key={j}
                      id={option}
                      ref={register}
                      value={option}
                      onInput={onInput}
                      name={section.name ?? section.title.toLowerCase()}
                    >
                      {option}
                    </Checkbox>
                  );
                })}
              </CheckboxGroup>
            </React.Fragment>
          );
        }

        return null;
      })}
      <Button onClick={toggleMenu} className={styles.apply} block color="success">Apply</Button>
    </aside>
  );
}
