import './SunBlock.css';

export interface SunBlockProps {
  time: string;
  icon: 'sunrise' | 'sunset';
}

const getIconPicture = (icon: SunBlockProps['icon']) => {
  if (icon === 'sunrise') {
    return 'images/sun/sunrise.svg';
  }
  return 'images/sun/sunset.svg';
}

function SunBlock({ time, icon }: SunBlockProps) {
  return <div className='sunBlock'>
    <img src={getIconPicture(icon)} />
    <p>{time}</p>
  </div>
}

export default SunBlock;