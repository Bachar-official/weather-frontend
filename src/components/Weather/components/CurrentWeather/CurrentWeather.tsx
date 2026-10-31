import type { Geomagnetic, Weather } from '../../../../typings';
import { decodeGeomagneticIndex, formatTemperature, getUnitIcon, getWeatherIconPath, getWindDirection, Units } from '../../../../utils';
import './CurrentWeather.css';

export interface CurrentWeatherProps {
  activeIndex: number;
  weather: Weather | null;
  geomagnetic: Geomagnetic | null;
}

function CurrentWeather({ activeIndex, weather, geomagnetic }: CurrentWeatherProps) {
  return <div className='currentWeatherRoot' style={{ display: activeIndex === 0 ? 'block' : 'none' }}>
    {weather ?
      (<div className='currentWeather'>

        <div className='card'>
          <img src={getWeatherIconPath(weather.code, !weather.isDay)} />
          <p>{weather.condition}</p>
        </div>

        <div className='card'>
          <img src={getUnitIcon(Units.Temperature)} />
          <p>{`${formatTemperature(weather.temperature)} (${formatTemperature(weather.apparentTemperature)})`}</p>
        </div>

        <div className='card'>
          <img src={getUnitIcon(Units.Humidity)} />
          <p>{weather.humidity}</p>
        </div>

        <div className='card'>
          <img src={getUnitIcon(Units.Wind)} />
          <p>{`${getWindDirection(weather.windDegree)} ${((weather.windSpeed) / 3.6).toFixed(1)} м/с`}</p>
        </div>

        <div className='card'>
          <img src={getUnitIcon(Units.Pressure)} />
          <p>{`${(weather.surfacePressure * 0.750062).toFixed(0)} мм.рт.ст`}</p>
        </div>

        <div className='card'>
          <img src={getUnitIcon(Units.KpIndex)} />
          <p>{decodeGeomagneticIndex(geomagnetic?.kp)}</p>
        </div>

      </div>)
      : (<div className='error'>
        <p>Данные о погоде отсутствуют</p>
      </div>)}
  </div>;
};

export default CurrentWeather;