import type {
  HsvaColor,
  RgbaColor,
} from 'svelte-awesome-color-picker';

export function isHsvEqual(
  hsv: HsvaColor,
  otherHsv: HsvaColor,
): boolean {
  return (
    hsv.h === otherHsv.h &&
    hsv.s === otherHsv.s &&
    hsv.v === otherHsv.v &&
    hsv.a === otherHsv.a
  );
}

export function isRgbEqual(
  rgb: RgbaColor,
  othterRgb: RgbaColor,
): boolean {
  return (
    rgb.r === othterRgb.r &&
    rgb.g === othterRgb.g &&
    rgb.b === othterRgb.b &&
    rgb.a === othterRgb.a
  );
}
