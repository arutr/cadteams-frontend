import classNames from 'classnames';
import { ExploreFilters } from 'pages/app/explore';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from 'src/components/Button';
import Checkbox, { CheckboxGroup } from 'src/components/Form/Checkbox';
import { Heading2, Heading3 } from 'src/components/Heading';
import Icon from 'src/components/Icon';
import styles from 'src/components/Filters/Filters.module.scss';

export type FilterSectionType = 'checkbox' | 'radio';

interface Props {
  sections: {
    type: FilterSectionType,
    title: string,
    name?: string,
    options: string[] | object[],
  }[];
  setFilters: (filters) => void;
}

export default function Filters(props: Props) {
  const { sections, setFilters } = props;
  const [open, setOpen] = useState<boolean>(false);
  const { register, handleSubmit } = useForm<ExploreFilters>();
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
      {sections?.map((section, index) => {
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
                        id={option.name}
                        name={option.name}
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
