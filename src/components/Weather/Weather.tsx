import { useDayContext } from '../../context/DayContext';
import CurrentWeather from './components/CurrentWeather/CurrentWeather';
import ForecastScreen from './components/ForecastScreen/ForecastScreen';
import './Weather.css';

function Weather() {
  const {weather, geomagnetic} = useDayContext();
  const activeScreen = 1;

  return <div className='weather'>
    <CurrentWeather activeIndex={activeScreen} weather={weather} geomagnetic={geomagnetic}/>
    <ForecastScreen forecast={weather?.forecast} activeIndex={activeScreen}/>
  </div>
};

export default Weather;