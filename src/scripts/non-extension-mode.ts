import {
  birthdate,
  confettiLive,
  runningTexts,
} from '~/stores/birthdate';
import { colors } from '~/stores/colors';
import type { SpecialData, SpecialSetting } from '~/types/special';
import { encode, decode } from '~/utils/codec';

export const SPECIAL_DATA_SCRIPT_ID = '__SPECIAL__';

const getSpecialData = (doc: Document): SpecialData | null => {
  const raw = doc.getElementById(SPECIAL_DATA_SCRIPT_ID)?.textContent;
  try {
    return raw ? (JSON.parse(raw) as SpecialData) : null;
  } catch {
    return null;
  }
};

export const getSpecialSetting = (
  win: Window,
  doc: Document,
): SpecialSetting | null => {
  const specialData = getSpecialData(doc);
  if (!specialData) return null;

  const searchParams = new URLSearchParams(win.location.search);
  const name = searchParams.get('untuk');
  if (!name) return null;

  const encodedName = encode(name);
  const specialSetting = specialData[encodedName];
  if (!specialSetting) return null;

  return {
    ...specialSetting,
    dob: decode(specialSetting.dob),
    runningTexts: specialSetting.runningTexts.map(text =>
      decode(text),
    ),
  };
};

export const initStoresFromSpecialSetting = ({
  confettiLive: confettiLiveSpecialSetting,
  dob,
  runningTexts: runningTextsSpecialSetting,
  ...specialSettingColors
}: SpecialSetting) => {
  birthdate.set(new Date(dob));
  colors.set(specialSettingColors);
  confettiLive.set(confettiLiveSpecialSetting);
  runningTexts.set(runningTextsSpecialSetting);
};

export const removeSettingButtonAndSidebar = (doc: Document) => {
  const settingButton = doc.querySelector('button.setting-btn');
  const sidebar = doc.querySelector('aside');

  if (settingButton) {
    if (settingButton.parentElement?.tagName.startsWith('ASTRO-')) {
      settingButton.parentElement.remove();
    } else {
      settingButton.remove();
    }
  }

  sidebar?.remove();
};
