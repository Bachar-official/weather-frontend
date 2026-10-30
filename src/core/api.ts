import type { Geomagnetic, Holiday, Weather } from "../typings";

const location = window.location.href;
const isProd = !location.includes('localhost');

const BASE_API_URL = isProd ?
  `http://${import.meta.env.VITE_BASE_API_URL}:${import.meta.env.VITE_BASE_API_PORT}`
  : `http://localhost:${import.meta.env.VITE_BASE_API_PORT}`;

async function getWeather(): Promise<Weather | null> {
  const response = await fetch(`${BASE_API_URL}/weather`);
  if (response.ok) {
    const weather = await response.json() as Weather;
    return weather;
  }
  return null;
}

async function getHolidays(): Promise<Holiday[] | null> {
  const response = await fetch(`${BASE_API_URL}/holidays`);
  if (response.ok) {
    const holidays = await response.json() as Holiday[];
    return holidays;
  }
  return null;
}

async function getGeomagnetic(): Promise<Geomagnetic | null> {
  const response = await fetch(`${BASE_API_URL}/geomagnetic`);
  if (response.ok) {
    const geomagnetic = await response.json() as Geomagnetic;
    return geomagnetic;
  }
  return null;
}

async function getBackground(): Promise<string | null> {
  const response = await fetch(`${BASE_API_URL}/background`);
  if (response.ok) {
    const body = await response.blob();
    const imageUrl = URL.createObjectURL(body);
    return imageUrl;
  }
  return null;
}

export default {
  getBackground,
  getGeomagnetic,
  getHolidays,
  getWeather,
};