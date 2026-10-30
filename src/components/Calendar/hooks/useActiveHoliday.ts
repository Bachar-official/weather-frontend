import { useState, useEffect } from 'react';
import type { Holiday } from '../../../typings';

export const useActiveHoliday = (holidays: Holiday[]) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [holidays]);

  useEffect(() => {
    if (holidays.length <= 1) return;

    const intervalId = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % holidays.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [holidays.length]);

  return activeIndex;
};