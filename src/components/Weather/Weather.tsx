import { useDayContext } from '../../context/DayContext';
import './Weather.css';

function Weather() {
  const {weather} = useDayContext();

  return <div className='weather'>
    Погода
  </div>
};

export default Weather;