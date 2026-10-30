import './Calendar.css';
import { useDayContext } from "../../context/DayContext";
import { dateToTime } from '../../utils';
import SunBlock from './components/SunBlock/SunBlock';

function Calendar() {
  const { backgroundSrc, weather, time, today, holidays } = useDayContext();

  return <div className='calendar' style={{ backgroundImage: backgroundSrc ?? undefined }}>

    <div className='time'>
      <SunBlock time={dateToTime(weather?.sunrise)} icon="sunrise" />
      <p>{time}</p>
      <SunBlock time={dateToTime(weather?.sunset)} icon="sunset" />
    </div>

    <div className='date'>
      <p className='day'>{today?.day ?? ''}</p>
      <p className='month'>{today?.month ?? ''}</p>
      <p className='weekday'>{today?.weekday ?? ''}</p>
    </div>


    <div className='holidays'>{holidays.length}</div>
  </div>
}

export default Calendar;