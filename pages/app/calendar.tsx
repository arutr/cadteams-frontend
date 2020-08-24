import React, { useState } from 'react';
import { LogOnMount } from 'react-amplitude-hooks';
import CalendarTile, { CalendarTileStatus } from 'src/components/Calendar/CalendarTile';
import cardStyles from 'src/components/Card/Card.module.scss';
import { Heading1, Heading2, Heading3 } from 'src/components/Heading';
import PageTitle from 'src/components/PageTitle';
import { useAuth } from 'src/contexts/AuthProvider';
import styles from './calendar.module.scss';

const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

function Calendar() {
  const { user } = useAuth();
  const [activeMonth, setActiveMonth] = useState<Date>(new Date());
  const startOfMonth = new Date(activeMonth.getFullYear(), activeMonth.getMonth()).getDay();
  const daysInPreviousMonth = new Date(
    activeMonth.getFullYear(),
    activeMonth.getMonth(),
    0,
  ).getDate();
  let currentDay = 1;

  const getDateStatus = (date): CalendarTileStatus => {
    if (user?.calendar?.unavailableDates.some(({ date: entry }) => (
      new Date(entry).getTime() === date.getTime()
    ))) {
      return 'unavailable';
    }

    return 'available';
  };

  return (
    <section className={cardStyles.card}>
      <header>
        <Heading2 marginTop="0" bold condensed>
          {activeMonth.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
        </Heading2>
      </header>
      <div className={styles.grid}>
        {weekdays.map((day, index) => (
          <Heading3 marginTop="0" marginBottom="0" key={index} bold>{day}</Heading3>
        ))}
        {[0, 1, 2, 3, 4, 5].map((week) => (
          <React.Fragment key={week}>
            {[1, 2, 3, 4, 5, 6, 7].map((day) => {
              if (day > 5) {
                currentDay++;
                return null;
              }

              if (week === 0 && day < startOfMonth) {
                const previousMonthDate = new Date(Date.UTC(
                  activeMonth.getFullYear(),
                  activeMonth.getMonth() - 1,
                  (daysInPreviousMonth - (startOfMonth - day)) + 1,
                ));

                return (
                  <CalendarTile
                    key={previousMonthDate.getDate()}
                    date={previousMonthDate}
                    status={getDateStatus(previousMonthDate)}
                  />
                );
              }

              const currentDayDate = new Date(Date.UTC(
                activeMonth.getFullYear(),
                activeMonth.getMonth(),
                currentDay++,
              ));

              return (
                <CalendarTile
                  key={currentDay}
                  date={currentDayDate}
                  status={getDateStatus(currentDayDate)}
                />
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}

export default function CalendarPage() {
  return (
    <main>
      <LogOnMount eventType="view page" />
      <PageTitle>Calendar</PageTitle>
      <Heading1 marginBottom="1rem">Calendar</Heading1>
      <Calendar />
    </main>
  );
}
