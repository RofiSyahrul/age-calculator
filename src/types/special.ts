import type { Colors } from './colors';

export interface SpecialSetting extends Colors {
  dob: string;
  confettiLive: number;
  runningTexts: string[];
}

export type SpecialData = Partial<Record<string, SpecialSetting>>;
