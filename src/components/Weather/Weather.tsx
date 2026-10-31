import { useDayContext } from '../../context/DayContext';
import CurrentWeather from './components/CurrentWeather/CurrentWeather';
import ForecastScreen from './components/ForecastScreen/ForecastScreen';
import { useActiveScreen } from './hooks/useActiveScreen';
import './Weather.css';

function Weather() {
  const {weather, geomagnetic} = useDayContext();
  const activeScreen = useActiveScreen();

  return <div className='weather'>
    <CurrentWeather activeIndex={activeScreen} weather={weather} geomagnetic={geomagnetic}/>
    <ForecastScreen forecast={weather?.forecast} activeIndex={activeScreen} isDay={weather?.isDay ?? true}/>
  </div>
};

export default Weather;