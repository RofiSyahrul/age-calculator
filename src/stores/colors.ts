import { derived, writable } from 'svelte/store';

import { DEFAULT_COLORS } from '~/config/colors';
import type { ColorName } from '~/types/colors';

export const colors = writable(DEFAULT_COLORS);

export const isDefaultColors = derived(colors, $colors => {
  for (const key in $colors) {
    const colorName = key as ColorName;
    const newColor = $colors[colorName];
    if (newColor !== DEFAULT_COLORS[colorName]) {
      return false;
    }
  }
  return true;
});

let prevColors = { ...DEFAULT_COLORS };

const colorNameToStyleProperty: Record<ColorName, string> = {
  background: '--bg',
  primary: '--p',
  secondary: '--s',
  text: '--t',
};

export function subscribeToColorsChange() {
  return colors.subscribe(newColors => {
    for (const key in newColors) {
      const colorName = key as ColorName;
      const newColor = newColors[colorName];
      if (newColor !== prevColors[colorName]) {
        document.documentElement.style.setProperty(
          colorNameToStyleProperty[colorName],
          newColor,
        );
      }
    }
    prevColors = { ...newColors };
  });
}
