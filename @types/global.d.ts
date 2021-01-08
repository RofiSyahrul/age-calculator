/// <reference types='@types/chrome' />
export {};

declare global {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const __DEV__: boolean;
  const APP_VERSION: string;
  const IS_EXTENSION: boolean;

  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      BUILD_ENV: 'extension' | undefined;
    }
  }

  type Colors = {
    primary: string;
    secondary: string;
    background: string;
    white: string;
  };

  type ColorName = keyof Colors;

  type Age = {
    rem: number;
    second?: number;
    minute?: number;
    hour?: number;
    day?: number;
    month?: number;
    year?: number;
  };

  type AgeKey = keyof Omit<Age, 'rem'>;
}
