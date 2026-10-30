import { useDayContext } from '../../context/DayContext';
import CurrentWeather from './components/CurrentWeather/CurrentWeather';
import './Weather.css';

function Weather() {
  const {weather, geomagnetic} = useDayContext();
  const activeScreen = 0;

  return <div className='weather'>
    <CurrentWeather activeIndex={activeScreen} weather={weather} geomagnetic={geomagnetic}/>
  </div>
};

export default Weather;