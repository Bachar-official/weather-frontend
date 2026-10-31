export function dateToTime(isoDate: string | undefined, onlyHours?: boolean): string {
  if (!isoDate || isoDate === '') {
    return '';
  }
  const date = new Date(isoDate);
  if (onlyHours) {
    return getFullTimeUnits(date.getHours());
  }
  return `${getFullTimeUnits(date.getHours())}:${getFullTimeUnits(date.getMinutes())}`;
}

const getFullTimeUnits = (unit: number): string => {
  if (unit < 10) {
    return `0${unit}`;
  }
  return unit.toString();
}