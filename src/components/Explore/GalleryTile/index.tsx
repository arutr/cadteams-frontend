import { useRouter } from 'next/router';
import { GalleryEntry } from 'pages/app/explore';
import React from 'react';
import Icon from 'src/components/Icon';
import Label, { LabelContainer } from 'src/components/Label';
import MediaObject from 'src/components/MediaObject';
import { getApiResource } from 'src/utils/api';
import { currencyFormat } from 'src/utils/misc';
import styles from 'src/components/Explore/GalleryTile/GalleryTile.module.scss';
import { UrlObject } from 'url';

interface TileProps {
  entry: GalleryEntry;
}

export default function Tile({ entry }: TileProps) {
  const { pathname, query } = useRouter();
  const preview = getApiResource(
    entry.preview?.formats?.medium?.url,
    entry.preview.url,
  );
  const avatar = getApiResource(
    entry.profilePicture?.formats?.thumbnail?.url,
    entry.profilePicture?.url,
  ) ?? '/icons/user-blank.svg';

  return (
    <article className={styles.entry}>
      <MediaObject
        href={{
          query: {
            ...query,
            portfolio: entry.id,
          },
          pathname,
        } as UrlObject}
        src={preview}
      >
        <p>{entry.username}, {entry.specialization}</p>
      </MediaObject>
      <MediaObject
        className={styles.avatar}
        src={avatar}
        width="5rem"
      />
      <LabelContainer className={styles.labels}>
        {!!entry.dailyRate && (
          <Label title="Daily rate">{`${currencyFormat.format(entry.dailyRate)}/day`}</Label>
        )}
        {!!entry.rating && (
          <Label title="Satisfaction rating" color="purple">
            {entry.rating}&thinsp;<Icon large name="star" />
          </Label>
        )}
        {!!entry.instantBooking && (
          <Label title="Instant booking" color="purple"><Icon large name="time-quick" /></Label>
        )}
        {!!entry.verified && (
          <Label title="Verified by CADteams" color="purple"><Icon large name="verified" /></Label>
        )}
      </LabelContainer>
    </article>
  );
}
