export interface Weather {
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  surfacePressure: number;
  uvIndex: number;
  windSpeed: number;
  windDegree: number;
  code: number;
  condition: string;
  isDay: boolean;
  sunrise: string;
  sunset: string;
  forecast: Forecast[];
}

export interface Forecast {
  time: string;
  temperature: number;
  code: number;
  isDay: boolean;
}