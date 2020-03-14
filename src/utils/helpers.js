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
    day: daysInMonth
  };
}

export function getAge() {
  const now = dayjs();
  const lastMonth = new Date(
    now.subtract(1, 'M').format('YYYY-MM-DD')
  );
  const dob = dayjs(birthDate);

  const multiplier = getMultiplier(getDaysInMonth(lastMonth));
  const daysDiffInSeconds = now.diff(dob, 'd') * 24 * 60 * 60;
  const actualSecondsDiff = now.diff(dob, 's');
  const remainingSecondsDiff = actualSecondsDiff - daysDiffInSeconds;

  const ageObj = timeUnits
    .slice(3)
    .reverse()
    .reduce(
      (obj, unit) => {
        if (unit !== 'hour') {
          obj[unit] = obj.rem % 60;
          obj.rem = (obj.rem - obj[unit]) / 60;
        } else {
          obj[unit] = obj.rem;
        }
        return obj;
      },
      { rem: remainingSecondsDiff }
    );

  let float;
  return timeUnits.slice(0, 3).reduce((obj, unit, i, arr) => {
    if (i === 0) {
      float = now.diff(dob, 'y', true);
    } else {
      float = (float - obj[arr[i - 1]]) * multiplier[unit];
    }
    obj[unit] = Math.floor(float);
    return obj;
  }, ageObj);
}
