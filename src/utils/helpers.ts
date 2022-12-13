/* global chrome  */
import dayjs from 'dayjs';

import { decode, encode } from './codec';
import { defaultDob, timeUnits } from './constants';

export function getLocalStorage(key = ''): Promise<string> {
  return new Promise(resolve => {
    try {
      chrome.storage.local.get([key], result => {
        const res = result[key];
        resolve(typeof res !== 'string' ? '' : res);
      });
    } catch {
      if (typeof localStorage === 'undefined') {
        resolve('');
        return;
      }
      resolve(localStorage.getItem(key) || '');
    }
  });
}

export function setLocalStorage(
  key = '',
  value = '',
): Promise<string | void> {
  return new Promise(resolve => {
    try {
      chrome.storage.local.set({ [key]: value }, () => {
        resolve('OK');
      });
    } catch {
      if (typeof localStorage === 'undefined') {
        resolve('');
        return;
      }

      if (!value) {
        localStorage.removeItem(key);
        resolve('');
        return;
      }

      localStorage.setItem(key, value);
      resolve('');
    }
  });
}

export function getSpecialSetting(
  specialData?: Special,
): Setting | null {
  if (!specialData) return null;

  const qs = new URLSearchParams(window.location.search);
  const name = qs.get('untuk');

  if (!name) return null;

  const encodedName = encode(name);
  const specialSetting = specialData[encodedName];
  if (!specialSetting) return null;

  return { ...specialSetting, dob: decode(specialSetting.dob) };
}

export async function getDob(): Promise<string> {
  const dob = await getLocalStorage('dob');
  return dob || defaultDob;
}

export function getDaysInMonth(date = new Date()): number {
  return new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0,
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

export function getAge(birthDate?: string | Date): Age {
  if (!birthDate) {
    return { rem: 0 };
  }

  const now = dayjs();
  const dob = dayjs(birthDate);
  const daysDiffInSeconds = now.diff(dob, 'd') * 24 * 60 * 60;
  const actualSecondsDiff = now.diff(dob, 's');
  const remainingSecondsDiff = actualSecondsDiff - daysDiffInSeconds;

  const ageObj: Age = timeUnits
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
      { rem: remainingSecondsDiff },
    );

  ageObj.day = getDays(now, dob);

  let float: number;
  return timeUnits.slice(0, 2).reduce((obj, unit, i, arr) => {
    if (i === 0) {
      float = now.diff(dob, 'y', true);
    } else {
      float = (float - (obj[arr[i - 1]] || 0)) * 12;
    }
    obj[unit] = Math.floor(float);
    return obj;
  }, ageObj);
}

export function getMaxDaysInMonth(birthDate?: string | Date): number {
  if (!birthDate) return 30;
  const dob = dayjs(birthDate);
  const now = dayjs();
  const dobThisMonthAndYear = dob.month(now.month()).year(now.year());
  const diff = now.diff(dobThisMonthAndYear, 'millisecond');
  if (diff >= 0) return now.daysInMonth() - 1;
  return now.subtract(1, 'month').daysInMonth() - 1;
}
