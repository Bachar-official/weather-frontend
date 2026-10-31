import { useMemo } from 'react';
import type { Forecast } from '../../../../typings';
import ForecastChart from './components/ForecastChart/ForecastChart';
import './ForecastScreen.css';
import { dateToTime, getWeatherIconPath } from '../../../../utils';

export interface ForecastProps {
  forecast: Forecast[] | undefined;
  activeIndex: number;
  isDay: boolean;
}

export interface ForecastDot {
  time: string;
  temperature: number;
  image: string;
  isDay: boolean;
}

function ForecastScreen({ forecast = [], activeIndex, isDay = true }: ForecastProps) {

  const data = useMemo<ForecastDot[]>(() => {
    if (!forecast) return [];
    return forecast.map((w) => {
      return {
        time: dateToTime(w.time, true),
        temperature: w.temperature,
        image: getWeatherIconPath(w.code, isDay),
        isDay,
      };
    });
  }, [forecast, isDay]);

  return <div className='forecastRoot' style={{ display: activeIndex === 1 ? 'block' : 'none' }}>
    {forecast.length === 0 ? <p className='error'>Нет данных</p> :
      <div className='chart'>
        <ForecastChart
          data={data}
          lineColor={isDay ? 'rgb(153, 92, 0)' : 'rgba(71, 169, 255, 1)'}
          dayDotColor='rgb(99, 59, 0)'
          nightDotColor='rgb(1, 92, 172)'
          isDay={isDay}
        />
      </div>
    }
  </div>
}

export default ForecastScreen;