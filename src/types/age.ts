export interface AgeDetail {
  second?: number;
  minute?: number;
  hour?: number;
  day?: number;
  month?: number;
  year?: number;
}

export type AgeKey = keyof AgeDetail;
