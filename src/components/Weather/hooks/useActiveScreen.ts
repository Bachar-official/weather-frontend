import { useState, useEffect } from 'react';

export const useActiveScreen = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveIndex((prev) => (prev === 0 ? 1 : 0));
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return activeIndex;
};