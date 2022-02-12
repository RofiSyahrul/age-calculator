import type { DefaultTheme } from 'styled-components';

const screenTheme = {
  xs: '319px',
  sm: '479px',
  md: '768px',
  lg: '1079px',
  xl: '1366px',
} as const;

type ScreenTheme = typeof screenTheme;

function buildMediaQuery<T extends keyof ScreenTheme>(screenSize: T) {
  return `@media screen and (max-width: ${screenTheme[screenSize]})` as const;
}

const breakpoint = {
  xs: buildMediaQuery('xs'),
  sm: buildMediaQuery('sm'),
  md: buildMediaQuery('md'),
  lg: buildMediaQuery('lg'),
  xl: buildMediaQuery('xl'),
} as const;

type Breakpoint = typeof breakpoint;

const color = {
  blue: {
    t50: '#37A0F4',
  },
  white: {
    t10: '#FFFFFF',
  },
  red: {
    t60: '#EC4D3A',
  },
} as const;

type Color = typeof color;

const shadow = {
  flat: '0px',
  low: '0px 2px 8px -2px rgba(0, 0, 0, 0.16)',
  high: '0 1px 8px 8px rgba(0, 0, 0, 0.5)',
} as const;

type Shadow = typeof shadow;

export type Theme = {
  breakpoint: Breakpoint;
  color: Color;
  fontBase: string;
  screen: ScreenTheme;
  shadow: Shadow;
};

const fontBase = [
  '-apple-system',
  'BlinkMacSystemFont',
  'Segoe UI',
  'Roboto',
  'Oxygen',
  'Ubuntu',
  'Cantarell',
  'Fira Sans',
  'Droid Sans',
  'Helvetica Neue',
  'sans-serif',
].join(', ');

const theme: DefaultTheme = {
  breakpoint,
  color,
  fontBase,
  screen: screenTheme,
  shadow,
};

export default theme;
