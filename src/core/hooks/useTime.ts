import { useState, useCallback, useEffect } from 'react';
import type { Today } from '../../typings';

const formatterDay = new Intl.DateTimeFormat("ru", { day: "numeric" });
const formatterMonth = new Intl.DateTimeFormat("ru", { month: "long" });
const formatterWeekday = new Intl.DateTimeFormat("ru", { weekday: "long" });

const useTime = () => {
  const [time, setTime] = useState<string>('');
  const [today, setToday] = useState<Today | null>(null);

  const updateDateTime = useCallback(() => {
    const now = new Date();

    setToday({
      day: parseInt(formatterDay.format(now), 10),
      month: formatterMonth.format(now),
      weekday: formatterWeekday.format(now),
    });

    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    setTime(`${hh}:${mm}`);
  }, []);

  useEffect(() => {
    updateDateTime();
    const interval = setInterval(updateDateTime, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return {
    time,
    today,
  };
};

export default useTime;
