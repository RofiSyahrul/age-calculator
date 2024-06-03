import { birthdate } from '~/stores/birthdate';
import { colors, subscribeToColorsChange } from '~/stores/colors';
import { subscribeSidebarStore } from '~/stores/sidebar';
import { getStorageValues } from '~/utils/storage';

import {
  getSpecialSetting,
  initStoresFromSpecialSetting,
  removeSettingButtonAndSidebar,
} from './non-extension-mode';

const initStoresFromStorage = async () => {
  const storageValues = await getStorageValues();
  const { dob, ...storageValuesForColors } = storageValues;
  birthdate.set(dob);
  colors.set(storageValuesForColors);
};

const init = async (win: Window, doc: Document) => {
  subscribeSidebarStore(doc);
  subscribeToColorsChange(doc);

  if (!import.meta.env.IS_EXTENSION) {
    const specialSetting = getSpecialSetting(win, doc);
    if (specialSetting) {
      initStoresFromSpecialSetting(specialSetting);
      removeSettingButtonAndSidebar(doc);
      return;
    }
  }

  await initStoresFromStorage();
};

export default init;
