import dayjs from 'dayjs';
import { birthDate, timeUnits } from './constants';

function getDaysInMonth(date = new Date()) {
  return new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();
}

function getMultiplier(daysInMonth = 30) {
  return {
    month: 12,
    day: daysInMonth,
    hour: 24,
    minute: 60,
    second: 60
  };
}

export function getAge() {
  const now = dayjs();
  const lastMonth = new Date(
    now.subtract(1, 'M').format('YYYY-MM-DD')
  );
  const dob = dayjs(birthDate);

  let float;
  const multiplier = getMultiplier(getDaysInMonth(lastMonth));
  return timeUnits.reduce((obj, unit, i, arr) => {
    if (i === 0) {
      float = now.diff(dob, 'y', true);
      obj[unit] = Math.floor(float);
      return obj;
    }
    float = (float - obj[arr[i - 1]]) * multiplier[unit];
    obj[unit] = Math.floor(float);
    return obj;
  }, {});
}
