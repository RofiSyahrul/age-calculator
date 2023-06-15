export const MS_A_SECOND = 1e3;
export const SECONDS_A_MINUTE = 60;
export const MINUTES_A_HOUR = 60;
export const HOURS_A_DAY = 24;
export const MONTHS_A_YEAR = 12;

export const MS_A_MINUTE = SECONDS_A_MINUTE * MS_A_SECOND;
export const MS_A_DAY = HOURS_A_DAY * MINUTES_A_HOUR * MS_A_MINUTE;

export function absFloor(value: number): number {
  return value < 0 ? Math.ceil(value) || 0 : Math.floor(value);
}

function utcOffset(date: Date): number {
  return -Math.round(date.getTimezoneOffset() / 15) * 15;
}

export function getDaysDiff(from: Date, to: Date): number {
  const zoneDelta = (utcOffset(to) - utcOffset(from)) / MS_A_MINUTE;
  const diff = from.getTime() - to.getTime();
  return absFloor((diff - zoneDelta) / MS_A_DAY);
}

export function getDaysInMonth(date: Date): number {
  return new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0,
  ).getDate();
}

export function addMonth(date: Date, month: number): Date {
  const result = new Date(date);
  result.setDate(1);
  result.setMonth(date.getMonth() + month);
  result.setDate(Math.min(date.getDate(), getDaysInMonth(result)));
  return result;
}

export function getMonthDiff(from: Date, to: Date): number {
  if (from.getDate() < to.getDate()) return -getMonthDiff(to, from);

  const wholeMonthDiff =
    (to.getFullYear() - from.getFullYear()) * MONTHS_A_YEAR +
    (to.getMonth() - from.getMonth());

  const firstAnchor = addMonth(from, wholeMonthDiff);
  const diffWithFirstAnchor = to.getTime() - firstAnchor.getTime();
  const isFirstAnchorExceed = diffWithFirstAnchor < 0;

  const secondAnchor = addMonth(
    from,
    wholeMonthDiff + (isFirstAnchorExceed ? -1 : 1),
  );

  const diffOfset =
    diffWithFirstAnchor /
    Math.abs(firstAnchor.getTime() - secondAnchor.getTime());

  return +(-(wholeMonthDiff + diffOfset) || 0);
}

function zeroPad(value: number): string {
  return value.toString().padStart(2, '0');
}

export function formatDate(date?: Date): string {
  if (!date) return '';
  return [
    zeroPad(date.getDate()),
    zeroPad(date.getMonth() + 1),
    date.getFullYear(),
  ].join('-');
}
