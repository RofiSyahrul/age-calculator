import { derived, writable } from 'svelte/store';

import type { AgeDetail, AgeKey } from '~/types/age';
import {
  HOURS_A_DAY,
  MINUTES_A_HOUR,
  MONTHS_A_YEAR,
  MS_A_SECOND,
  SECONDS_A_MINUTE,
  absFloor,
  addMonth,
  getDaysDiff,
  getDaysInMonth,
  getMonthDiff,
} from '~/utils/date';

const DEFAULT_BIRTHDATE = '1997-06-18T00:00:00+07:00';
export const birthdate = writable<Date | undefined>(
  new Date(DEFAULT_BIRTHDATE),
);

export function changeBirthdate(date: Date) {
  birthdate.set(date);
}

const ONE_DAY_UNITS: AgeKey[] = ['second', 'minute', 'hour'];

const ONE_DAY_UNIT_CONVERSIONS = [
  SECONDS_A_MINUTE,
  MINUTES_A_HOUR,
  HOURS_A_DAY,
];

function getAgeDetailForOneDay(
  currentDate: Date,
  dateOfBirth: Date,
): AgeDetail {
  const ageDetail: AgeDetail = {};
  let value = absFloor(
    (currentDate.getTime() - dateOfBirth.getTime()) / MS_A_SECOND,
  );

  ONE_DAY_UNITS.forEach((unit, index) => {
    const conversion = ONE_DAY_UNIT_CONVERSIONS[index];
    const remaining = (ageDetail[unit] = value % conversion);
    value = (value - remaining) / conversion;
  });

  return ageDetail;
}

function getRemainingDaysUnderAMonth(
  currentDate: Date,
  dateOfBirth: Date,
): number {
  const dateOnlyDOB = dateOfBirth.getDate();
  const birthdateInCurrentMonthAndYear = new Date(currentDate);
  birthdateInCurrentMonthAndYear.setDate(dateOnlyDOB);

  if (currentDate.getDate() === dateOnlyDOB) return 0;

  if (currentDate.getDate() > dateOnlyDOB) {
    return getDaysDiff(currentDate, birthdateInCurrentMonthAndYear);
  }

  const lastMonth = addMonth(birthdateInCurrentMonthAndYear, -1);
  return getDaysDiff(currentDate, lastMonth);
}

function getAgeDetail(dateOfBirth?: Date): AgeDetail {
  if (!dateOfBirth) return {};

  const now = new Date();
  const monthDiff = getMonthDiff(now, dateOfBirth);
  const ageDetail = getAgeDetailForOneDay(now, dateOfBirth);
  ageDetail.day = getRemainingDaysUnderAMonth(now, dateOfBirth);
  ageDetail.month = absFloor(monthDiff % MONTHS_A_YEAR);
  ageDetail.year = absFloor(monthDiff / MONTHS_A_YEAR);

  return ageDetail;
}

function getMaxDaysInCurrentMonth(dateOfBirth?: Date): number {
  if (!dateOfBirth) return 30;

  const now = new Date();
  const dobThisMonthAndYear = new Date(dateOfBirth);
  dobThisMonthAndYear.setFullYear(now.getFullYear(), now.getMonth());

  const diff = now.getTime() - dobThisMonthAndYear.getTime();
  if (diff >= 0) return getDaysInMonth(now);
  return getDaysInMonth(addMonth(now, -1));
}

export const age = derived<typeof birthdate, AgeDetail>(
  birthdate,
  ($birthdate, set) => {
    const ageDetail = getAgeDetail($birthdate);
    set(ageDetail);

    const maxDaysInMonth = getMaxDaysInCurrentMonth($birthdate);

    const interval = setInterval(() => {
      if (typeof ageDetail.second === 'undefined') return;

      if (ageDetail.second < SECONDS_A_MINUTE - 1) {
        ageDetail.second++;
        set({ ...ageDetail });
        return;
      }

      if (typeof ageDetail.minute === 'undefined') return;

      ageDetail.second = 0;
      if (ageDetail.minute < MINUTES_A_HOUR - 1) {
        ageDetail.minute++;
        set({ ...ageDetail });
        return;
      }

      if (typeof ageDetail.hour === 'undefined') return;

      ageDetail.minute = 0;
      if (ageDetail.hour < HOURS_A_DAY - 1) {
        ageDetail.hour++;
        set({ ...ageDetail });
        return;
      }

      if (typeof ageDetail.day === 'undefined') return;

      ageDetail.hour = 0;
      if (ageDetail.day < maxDaysInMonth - 1) {
        ageDetail.day++;
        set({ ...ageDetail });
        return;
      }

      if (typeof ageDetail.month === 'undefined') return;

      ageDetail.day = 0;
      if (ageDetail.month < MONTHS_A_YEAR - 1) {
        ageDetail.month++;
        set({ ...ageDetail });
        return;
      }

      if (typeof ageDetail.year === 'undefined') return;

      ageDetail.month = 0;
      ageDetail.year++;
      set({ ...ageDetail });
    }, MS_A_SECOND);

    return () => {
      clearInterval(interval);
    };
  },
  {},
);
