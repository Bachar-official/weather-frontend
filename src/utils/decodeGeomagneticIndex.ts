export const decodeGeomagneticIndex = (index: number | undefined) => {
  if (index === undefined || index === null) {
    return 'Нет данных';
  }
  
  if (index < 0) {
    return 'Некорректные данные';
  }
  
  if (index < 2) {
    return `${index} (Спокойное магнитное поле)`;
  } else if (index < 5) {
    return `${index} (Слабое или умеренное волнение)`;
  } else if (index < 6) {
    return `${index} (Слабая магнитная буря класса G1)`;
  } else if (index < 7) {
    return `${index} (Умеренная магнитная буря класса G2)`;
  } else if (index < 8) {
    return `${index} (Сильная магнитная буря класса G3)`;
  } else if (index < 9) {
    return `${index} (Тяжелый шторм G4)`;
  } else {
    return `${index} (Экстремально сильный геомагнитный шторм G5)`;
  }
}