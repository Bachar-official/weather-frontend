export const Units = {
  Temperature: 'thermometer-celsius.svg',
  Humidity: 'humidity.svg',
  Pressure: 'barometer.svg',
  KpIndex: 'kp-index.svg',
  Wind: 'windsock.svg',
} as const;

export type UnitFileName = typeof Units[keyof typeof Units];

export const getUnitIcon = (unit: UnitFileName) => {
  return `/images/units/${unit}`;
};