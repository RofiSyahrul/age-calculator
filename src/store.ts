import create from 'zustand';

import { colors as defaultColors } from './utils/constants';
import {
  getDob,
  getLocalStorage,
  setLocalStorage,
} from './utils/helpers';

interface State {
  birthDate?: string | Date;
  colors: Colors;
  isDefaultColors: boolean;
  isPickerShown: boolean;
  isReady: boolean;
  totalOpened: number;
  specialSetting: Setting | null;
}

interface Action {
  _init(specialSetting: Setting | null): Promise<void>;
  cancelChangeColor(key: ColorName): Promise<void>;
  changeBirthDate(date: Date): void;
  previewColor(key: ColorName, value: string): void;
  resetColors(): void;
  saveChangeColor(key: ColorName): void;
  setTotalOpened(callback: (prevTotalOpened: number) => number): void;
  togglePicker(): void;
}

interface Store {
  action: Action;
  state: State;
}

const colorNames: ColorName[] = [
  'primary',
  'secondary',
  'background',
  'white',
];

const MIN_DESKTOP_WIDTH = 768;

const useStore = create<Store>((set, get) => {
  function getNewState(): State {
    const prevState = get().state;
    return { ...prevState, colors: { ...prevState.colors } };
  }

  async function init(specialSetting: Setting | null) {
    const newState = getNewState();
    newState.isReady = true;

    if (specialSetting) {
      const { background, dob, primary, secondary, white } =
        specialSetting;

      newState.birthDate = dob;
      newState.colors.background = background;
      newState.colors.primary = primary;
      newState.colors.secondary = secondary;
      newState.colors.white = white;
      newState.isPickerShown = false;
      newState.specialSetting = specialSetting;

      set({ state: newState });

      return;
    }

    const [birthDate, ...colors] = await Promise.all([
      getDob(),
      ...colorNames.map(getLocalStorage),
    ]);

    let isDefaultColors = true;
    colors.forEach((color, i) => {
      if (!color) return;
      const colorName = colorNames[i];
      newState.colors[colorName] = color;
      if (color !== defaultColors[colorName]) {
        isDefaultColors = false;
      }
    });

    newState.birthDate = birthDate;
    newState.isDefaultColors = isDefaultColors;
    newState.isPickerShown = window.innerWidth >= MIN_DESKTOP_WIDTH;
    set({ state: newState });
  }

  function previewColor(key: ColorName, value: string) {
    const newState = getNewState();
    newState.colors[key] = value;
    if (value !== defaultColors[key]) {
      newState.isDefaultColors = false;
    }
    set({ state: newState });
  }

  async function cancelChangeColor(key: ColorName) {
    const { specialSetting } = get().state;
    let value = specialSetting?.[key];
    if (value) {
      previewColor(key, value);
      return;
    }
    value = await getLocalStorage(key);
    previewColor(key, value || defaultColors[key]);
  }

  function changeBirthDate(date: Date) {
    const newState = getNewState();
    const birthDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    );
    newState.birthDate = birthDate;
    set({ state: newState });
    setLocalStorage('dob', birthDate.toISOString());
  }

  return {
    state: {
      colors: { ...defaultColors },
      isDefaultColors: true,
      isPickerShown: false,
      isReady: false,
      specialSetting: null,
      totalOpened: 0,
    },

    action: {
      _init: init,
      cancelChangeColor,
      changeBirthDate,
      previewColor,
      resetColors() {
        const newState = getNewState();
        newState.colors = defaultColors;
        newState.isDefaultColors = true;
        set({ state: newState });
        Promise.all(colorNames.map(key => setLocalStorage(key, '')));
      },
      saveChangeColor(key) {
        setLocalStorage(key, get().state.colors[key]);
      },
      setTotalOpened(callback) {
        const newState = getNewState();
        newState.totalOpened = callback(newState.totalOpened);
        set({ state: newState });
      },
      togglePicker() {
        const newState = getNewState();
        newState.isPickerShown = !newState.isPickerShown;
        set({ state: newState });
      },
    },
  };
});

export const useAppState = () => useStore(store => store.state);

export const appAction = useStore.getState().action;
