import Link from 'next/link';
import React from 'react';
import classNames from 'classnames';
import styles from './MediaObject.module.scss';

interface Props extends React.HTMLProps<HTMLImageElement> {
  captionAlign?: 'left' | 'center' | 'right';
  href?: any;
  vertical?: boolean;
}

function MediaObject({
  alt,
  children,
  className,
  captionAlign = 'center',
  height,
  href,
  id,
  onClick,
  src,
  width,
  vertical,
}: Props) {
  // eslint-disable-next-line react/prop-types
  function Figure({ children: image }) {
    return (
      <figure
        id={id}
        className={classNames(styles.figure, vertical && styles.vertical, className)}
        style={{ height, width }}
      >
        {image}
        {children && <figcaption className={styles[captionAlign]}>{children}</figcaption>}
      </figure>
    );
  }

  if (typeof href === 'string' && href?.startsWith('http')) {
    return (
      <Figure>
        <a href={href} target="_blank" rel="noopener">
          <img src={src} alt={alt} />
        </a>
      </Figure>
    );
  }

  if (href) {
    return (
      <Figure>
        <Link href={href} scroll={false}>
          <img className={styles.clickable} src={src} alt={alt} />
        </Link>
      </Figure>
    );
  }

  return (
    <Figure>
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <img
        className={classNames(onClick && styles.clickable)}
        onKeyDown={onClick as any}
        onClick={onClick}
        src={src}
        alt={alt}
      />
    </Figure>
  );
}

export default MediaObject;
