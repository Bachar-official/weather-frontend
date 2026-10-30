export type WindDirection = 
  | 'С' | 'ССВ' | 'СВ' | 'ВСВ' 
  | 'В' | 'ВЮВ' | 'ЮВ' | 'ЮЮВ' 
  | 'Ю' | 'ЮЮЗ' | 'ЮЗ' | 'ЗЮЗ' 
  | 'З' | 'ЗСЗ' | 'СЗ' | 'ССЗ';

export const getWindDirection = (degrees: number): WindDirection => {
  const directions: WindDirection[] = [
    'С', 'ССВ', 'СВ', 'ВСВ',
    'В', 'ВЮВ', 'ЮВ', 'ЮЮВ',
    'Ю', 'ЮЮЗ', 'ЮЗ', 'ЗЮЗ',
    'З', 'ЗСЗ', 'СЗ', 'ССЗ'
  ];
  
  const normalizedDegrees = ((degrees % 360) + 360) % 360;
  
  const index = Math.round(normalizedDegrees / 22.5) % 16;
  
  return directions[index];
};