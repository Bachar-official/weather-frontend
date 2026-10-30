import './App.css'
import Calendar from './components/Calendar/Calendar';
import Weather from './components/Weather/Weather';
import { useDayContext } from './context/DayContext';
import { getRealisticSkyGradient } from './utils/getSkyGradient';

function App() {
  const { weather } = useDayContext();

  const background = getRealisticSkyGradient(undefined, weather?.sunrise ?? '08:00', weather?.sunset ?? '18:00');

  return (
    <div className="root" style={{background: background}}>
      <Calendar />
      <Weather />
    </div>
  )
}

export default App;
