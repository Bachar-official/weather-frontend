import React, { createContext, useContext } from 'react';
import type { Weather, Geomagnetic, Holiday, Today } from '../typings';
import { useDay } from '../core/hooks/useDay';

// Тип данных, которые будут доступны всем компонентам
interface DayContextType {
  weather: Weather | null;
  geomagnetic: Geomagnetic | null;
  holidays: Holiday[];
  today: Today | null;
  time: string;
  backgroundSrc: string | null;
  isLoading: boolean;
}

const DayContext = createContext<DayContextType | null>(null);

export function DayProvider({ children }: { children: React.ReactNode }) {
  const dayData = useDay();
  
  return (
    <DayContext.Provider value={dayData}>
      {children}
    </DayContext.Provider>
  );
}

export function useDayContext() {
  const context = useContext(DayContext);
  if (!context) {
    throw new Error('useDayContext must be used within a DayProvider');
  }
  return context;
}