import { useState, useEffect, useCallback, useRef } from "react";
import * as api from '../api';
import type { Weather, Geomagnetic, Holiday, Today } from '../../typings';

const formatters = {
  day: new Intl.DateTimeFormat("ru", { day: "numeric" }),
  month: new Intl.DateTimeFormat("ru", { month: "long" }),
  weekday: new Intl.DateTimeFormat("ru", { weekday: "long" }),
};

const client = api.default;

export function useDay() {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [backgroundSrc, setBackgroundSrc] = useState<string | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [today, setToday] = useState<Today | null>(null);
  const [time, setTime] = useState<string>('');
  const [geomagnetic, setGeomagnetic] = useState<Geomagnetic | null>(null);
  const [holidays, setHolidays] = useState<Holiday[]>([]);

  const currentBlobUrl = useRef<string | null>(null);

  const fetchBackground = useCallback(async () => {
    try {
      const image = await client.getBackground();

      if (currentBlobUrl.current) {
        URL.revokeObjectURL(currentBlobUrl.current);
      }

      currentBlobUrl.current = image;
      setBackgroundSrc(image);
    } catch (e) {
      console.error("Failed to load background", e);
    }
  }, []);

  const updateHolidays = useCallback(async () => {
    try {
      const newHolidays = await client.getHolidays();
      setHolidays(newHolidays ?? []);
    } catch (e) {
      console.error('Error while updating holidays', e);
    }
  }, []);

  const updateWeatherAndBackground = useCallback(async (showLoader = false) => {
    if (showLoader) setLoading(true);
    try {
      // Запрашиваем независимые данные параллельно для ускорения
      const [newWeather, newGeomagnetic] = await Promise.all([
        client.getWeather(),
        client.getGeomagnetic()
      ]);

      setWeather(newWeather);
      setGeomagnetic(newGeomagnetic);

      await fetchBackground();

      await updateHolidays();

    } catch (e) {
      console.error('Error while updating weather/geomagnetic data', e);
      setWeather(null);
      setGeomagnetic(null);
    } finally {
      if (showLoader) setLoading(false);
    }
  }, [fetchBackground, updateHolidays]);

  const updateDateTime = useCallback(() => {
    const now = new Date();
    setToday({
      day: parseInt(formatters.day.format(now), 10),
      month: formatters.month.format(now),
      weekday: formatters.weekday.format(now),
    });

    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    setTime(`${hh}:${mm}`);
  }, []);

  useEffect(() => {
    updateDateTime();
    const interval = setInterval(updateDateTime, 60 * 1000);
    return () => clearInterval(interval);
  }, [updateDateTime]);

  useEffect(() => {
    updateWeatherAndBackground(true); // Первый раз с лоадером

    const fetchInterval = setInterval(() => {
      updateWeatherAndBackground(false); // Дальше в фоне
    }, 15 * 60 * 1000);

    return () => clearInterval(fetchInterval);
  }, [updateWeatherAndBackground]);

  useEffect(() => {
    return () => {
      if (currentBlobUrl.current) {
        URL.revokeObjectURL(currentBlobUrl.current);
      }
    };
  }, []);

  return {
    isLoading,
    weather,
    holidays,
    geomagnetic,
    today,
    time,
    backgroundSrc,
  };
}