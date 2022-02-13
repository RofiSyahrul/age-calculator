import {
  useState,
  useContext,
  createContext,
  useEffect,
  useCallback,
  useReducer,
  useMemo,
} from 'react';

import { produce } from 'immer';

import {
  defaultDob,
  colors as defaultColors,
} from './utils/constants';
import {
  getDob,
  setLocalStorage,
  getLocalStorage,
  getSpecialSetting,
} from './utils/helpers';

type State = {
  isDefaultColors: boolean;
  isReady: boolean;
  isPickerShown: boolean;
  birthDate: string | Date;
  colors: Colors;
  totalOpened: number;
  specialSetting: Setting | null;
};

type ReducerState = Pick<
  State,
  | 'isDefaultColors'
  | 'isReady'
  | 'birthDate'
  | 'colors'
  | 'isPickerShown'
  | 'specialSetting'
>;

type InitializeStateAction = {
  type: 'INITIALIZE_STATE';
  payload: {
    list: string[];
  };
};

type SetSpecialSettingAction = {
  type: 'SET_SPECIAL_SETTING';
  payload: Setting;
};

type ChangeBirthDateAction = {
  type: 'CHANGE_BIRTH_DATE';
  payload: { date: Date };
};

type ChangeColorAction = {
  type: 'CHANGE_COLOR';
  payload: { key: ColorName; value: string };
};

type SaveChangeColorAction = {
  type: 'SAVE_CHANGE_COLOR';
  payload: { key: ColorName };
};

type ResetColorsAction = {
  type: 'RESET_COLORS';
};

type TogglePickerAction = {
  type: 'TOGGLE_PICKER';
};

type ReducerAction =
  | InitializeStateAction
  | SetSpecialSettingAction
  | ChangeBirthDateAction
  | ChangeColorAction
  | SaveChangeColorAction
  | ResetColorsAction
  | TogglePickerAction;

const colorNames: ColorName[] = [
  'primary',
  'secondary',
  'background',
  'white',
];

const promises = [getDob(), ...colorNames.map(getLocalStorage)];

const initialState: ReducerState = {
  isDefaultColors: true,
  isReady: false,
  isPickerShown: window.innerWidth >= 768,
  birthDate: defaultDob,
  colors: defaultColors,
  specialSetting: null,
};

const reducer = produce(
  (draft: ReducerState, action: ReducerAction) => {
    switch (action.type) {
      case 'INITIALIZE_STATE':
        if (action.payload.list) {
          const [birthDate, ...colors] = action.payload.list;
          draft.birthDate = birthDate;
          let isDefaultColors = true;
          colors.forEach((color, i) => {
            if (color) {
              const colorName = colorNames[i];
              draft.colors[colorName] = color;
              if (color !== defaultColors[colorName]) {
                isDefaultColors = false;
              }
            }
          });
          draft.isDefaultColors = isDefaultColors;
        }
        draft.isReady = true;
        return;
      case 'SET_SPECIAL_SETTING':
        if (action.payload) {
          const { dob, primary, secondary, background, white } =
            action.payload;
          draft.specialSetting = action.payload;
          draft.birthDate = dob;
          draft.colors.primary = primary;
          draft.colors.secondary = secondary;
          draft.colors.background = background;
          draft.colors.white = white;
          draft.isPickerShown = false;
        }
        draft.isReady = true;
        return;
      case 'CHANGE_BIRTH_DATE':
        if (action.payload.date) {
          const { date } = action.payload;
          const newBirthDate = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
          );
          draft.birthDate = newBirthDate;
          setLocalStorage('dob', newBirthDate.toISOString());
        }
        return;
      case 'CHANGE_COLOR': {
        const { key, value } = action.payload;
        draft.colors[key] = value;
        if (value !== defaultColors[key]) {
          draft.isDefaultColors = false;
        }
        return;
      }
      case 'SAVE_CHANGE_COLOR':
        setLocalStorage(
          action.payload.key,
          draft.colors[action.payload.key],
        );
        return;
      case 'RESET_COLORS':
        draft.colors = defaultColors;
        draft.isDefaultColors = true;
        return;
      case 'TOGGLE_PICKER':
        draft.isPickerShown = !draft.isPickerShown;
        return;
      default:
        throw new Error('Unknown action type');
    }
  },
);

type Action = {
  changeBirthDate(date: Date): void;
  previewColor(key: ColorName, value: string): void;
  saveChangeColor(key: ColorName): void;
  cancelChangeColor(key: ColorName): Promise<void>;
  resetColors(): Promise<void>;
  togglePicker(): void;
  setTotalOpened: React.Dispatch<React.SetStateAction<number>>;
};

type Context = {
  states: State;
  actions: Action;
};

export const useAppState = (): Context => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [totalOpened, setTotalOpened] = useState(0);
  const { specialSetting } = state;

  const changeBirthDate = useCallback<Action['changeBirthDate']>(
    date => {
      dispatch({ type: 'CHANGE_BIRTH_DATE', payload: { date } });
    },
    [],
  );

  const previewColor = useCallback<Action['previewColor']>(
    (key, value) => {
      dispatch({ type: 'CHANGE_COLOR', payload: { key, value } });
    },
    [],
  );

  const saveChangeColor = useCallback<Action['saveChangeColor']>(
    key => {
      dispatch({ type: 'SAVE_CHANGE_COLOR', payload: { key } });
    },
    [],
  );

  const cancelChangeColor = useCallback<Action['cancelChangeColor']>(
    async key => {
      let value = specialSetting?.[key];
      if (value) {
        previewColor(key, value);
        return;
      }
      value = await getLocalStorage(key);
      previewColor(key, value || defaultColors[key]);
    },
    [specialSetting],
  );

  const resetColors = useCallback<Action['resetColors']>(async () => {
    dispatch({ type: 'RESET_COLORS' });
    try {
      await Promise.all(
        colorNames.map(key => setLocalStorage(key, '')),
      );
    } finally {
      return;
    }
  }, []);

  const togglePicker = useCallback(() => {
    dispatch({ type: 'TOGGLE_PICKER' });
  }, []);

  const contextValue = useMemo<Context>(
    () => ({
      states: { ...state, totalOpened },
      actions: {
        setTotalOpened,
        changeBirthDate,
        previewColor,
        cancelChangeColor,
        saveChangeColor,
        resetColors,
        togglePicker,
      },
    }),
    [state, totalOpened],
  );

  useEffect(() => {
    const special = IS_EXTENSION ? null : getSpecialSetting();
    if (special) {
      dispatch({
        type: 'SET_SPECIAL_SETTING',
        payload: special,
      });
    } else {
      Promise.all(promises).then(results => {
        dispatch({
          type: 'INITIALIZE_STATE',
          payload: { list: results },
        });
      });
    }
  }, []);

  return contextValue;
};

export const AppContext = createContext<Context>({
  states: { ...initialState, totalOpened: 0 },
  actions: {
    changeBirthDate() {},
    saveChangeColor() {},
    previewColor() {},
    setTotalOpened() {},
    togglePicker() {},
    resetColors() {
      return Promise.resolve();
    },
    cancelChangeColor() {
      return Promise.resolve();
    },
  },
});

export const useAppContext = (): Context => useContext(AppContext);
