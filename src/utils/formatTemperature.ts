export const formatTemperature = (temp: number): string => {
  if (temp > 0) {
    return `+${temp}`;
  }
  return temp.toString();
}