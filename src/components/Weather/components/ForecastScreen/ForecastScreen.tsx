import type { Forecast } from '../../../../typings';
import './ForecastScreen.css';

export interface ForecastProps {
  forecast: Forecast[] | undefined;
  activeIndex: number;
}

function ForecastScreen({forecast = [], activeIndex}: ForecastProps) {
  return <div className='forecastRoot' style={{ display: activeIndex === 1 ? 'block' : 'none'}}>
    {forecast.length === 0 ? <div>Нет данных</div> : <div>Прогноз</div>}
  </div>
}

export default ForecastScreen;