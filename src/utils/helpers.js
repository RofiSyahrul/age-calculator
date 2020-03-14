/* global chrome  */
import dayjs from 'dayjs';
import { defaultDob, timeUnits } from './constants';

export const getLocalStorage = (key = '') =>
  new Promise(resolve => {
    try {
      chrome.storage.local.get([key], result => {
        resolve(result[key]);
      });
    } catch {
      resolve(localStorage.getItem(key));
    }
  });

export const setLocalStorage = (key = '', value = '') =>
  new Promise(resolve => {
    try {
      chrome.storage.local.set({ [key]: value }, () => {
        resolve('OK');
      });
    } catch {
      localStorage.setItem(key, value);
    }
  });

export async function getDob() {
  const dob = await getLocalStorage('dob');
  return dob || defaultDob;
}

export function getDaysInMonth(date = new Date()) {
  return new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();
}

function getDays(now = dayjs(), dob = dayjs()) {
  const bd = dob.date();
  const temp = now.date(bd);
  if (now.date() < bd) {
    const lastMonth = temp.subtract(1, 'M');
    return dayjs(now).diff(lastMonth, 'd');
  }
  return dayjs(now).diff(temp, 'd');
}

export function getAge(birthDate = defaultDob) {
  const now = dayjs();
  const dob = dayjs(birthDate);
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

  ageObj.day = getDays(now, dob);

  let float;
  return timeUnits.slice(0, 2).reduce((obj, unit, i, arr) => {
    if (i === 0) {
      float = now.diff(dob, 'y', true);
    } else {
      float = (float - obj[arr[i - 1]]) * 12;
    }
    obj[unit] = Math.floor(float);
    return obj;
  }, ageObj);
}
