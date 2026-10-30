export type WeatherIconName =
  | 'clear'
  | 'partly-cloudy'
  | 'overcast'
  | 'fog'
  | 'mist'
  | 'drizzle'
  | 'rain'
  | 'partly-cloudy-rain'
  | 'sleet'
  | 'partly-cloudy-sleet'
  | 'snow'
  | 'partly-cloudy-snow'
  | 'snow-showers'
  | 'thunderstorms';

/**
 * Returns path to SVG icon by its code.
 * 
 * @param code - condition code
 * @param isNight - is night time flag
 * @returns icon path (ex., "/images/weather/clear-day.svg")
 */
export function getWeatherIconPath(code: number, isNight: boolean): string {
  let baseIcon: WeatherIconName = 'overcast';

  switch (code) {
    case 1000: // Sunny / Clear
      baseIcon = 'clear';
      break;
      
    case 1003: // Partly cloudy
      baseIcon = 'partly-cloudy';
      break;
      
    case 1006: // Cloudy
    case 1009: // Overcast
      baseIcon = 'overcast';
      break;
      
    // Group: foggy
    case 1012: // Haze
    case 1015: // Dust haze
    case 1018: // Blowing dust
    case 1021: // Dust storm
    case 1024: // Sandstorm
    case 1027: // Severe sandstorm
    case 1033: // Smoke
    case 1036: // Smoky haze
    case 1039: // Smog
    case 1042: // Severe smog
    case 1045: // Saharan dust
    case 1048: // Dust
    case 1135: // Fog
    case 1147: // Freezing fog
      baseIcon = 'fog';
      break;
      
    case 1030: // Mist
      baseIcon = 'mist';
      break;
      
    // Group: partly
    case 1063: // Patchy rain possible
      baseIcon = 'partly-cloudy-rain';
      break;
    case 1066: // Patchy snow possible
      baseIcon = 'partly-cloudy-snow';
      break;
    case 1069: // Patchy sleet possible
      baseIcon = 'partly-cloudy-sleet';
      break;
      
    // Group: thunder
    case 1087: // Thundery outbreaks possible
    case 1273: // Patchy light rain with thunder
    case 1276: // Moderate or heavy rain with thunder
    case 1279: // Patchy light snow with thunder
    case 1282: // Moderate or heavy snow with thunder
      baseIcon = 'thunderstorms';
      break;
      
    // Group: snow
    case 1114: // Blowing snow
    case 1117: // Blizzard
    case 1210: // Patchy light snow
    case 1213: // Light snow
    case 1216: // Patchy moderate snow
    case 1219: // Moderate snow
    case 1222: // Patchy heavy snow
    case 1225: // Heavy snow
    case 1237: // Ice pellets
    case 1261: // Light showers of ice pellets
    case 1264: // Moderate or heavy showers of ice pellets
      baseIcon = 'snow';
      break;
      
    // Group: drizzle
    case 1150: // Patchy light drizzle
    case 1153: // Light drizzle
    case 1168: // Freezing drizzle
    case 1171: // Heavy freezing drizzle
      baseIcon = 'drizzle';
      break;
      
    // Group: rain
    case 1180: // Patchy light rain
    case 1183: // Light rain
    case 1186: // Moderate rain at times
    case 1189: // Moderate rain
    case 1192: // Heavy rain at times
    case 1195: // Heavy rain
    case 1198: // Light freezing rain
    case 1201: // Moderate or heavy freezing rain
    case 1240: // Light rain shower
    case 1243: // Moderate or heavy rain shower
    case 1246: // Torrential rain shower
      baseIcon = 'rain';
      break;
      
    // Group: sleet
    case 1204: // Light sleet
    case 1207: // Moderate or heavy sleet
    case 1249: // Light sleet showers
    case 1252: // Moderate or heavy sleet showers
      baseIcon = 'sleet';
      break;
      
    // Group: snow showers
    case 1255: // Light snow showers
    case 1258: // Moderate or heavy snow showers
      baseIcon = 'snow-showers';
      break;
      
    default:
      baseIcon = 'overcast'; // Fallback
  }

  const hasDayNightVariant: WeatherIconName[] = [
    'clear',
    'fog',
    'overcast',
    'partly-cloudy',
    'partly-cloudy-rain',
    'partly-cloudy-sleet',
    'partly-cloudy-snow',
    'snow-showers',
    'thunderstorms',
  ];

  const iconName = hasDayNightVariant.includes(baseIcon)
    ? `${baseIcon}${isNight ? '-night' : '-day'}`
    : baseIcon;

  return `/images/weather/${iconName}.svg`;
}