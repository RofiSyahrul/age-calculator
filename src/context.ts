import {
  useState,
  useContext,
  createContext,
  useEffect,
  useCallback,
  useReducer,
  useMemo,
} from 'react';

import type { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { produce } from 'immer';

import {
  defaultDob,
  colors as defaultColors,
} from './utils/constants';
import {
  getDob,
  setLocalStorage,
  getLocalStorage,
} from './utils/helpers';

type State = {
  isReady: boolean;
  isPickerShown: boolean;
  birthDate: string | Date;
  colors: Colors;
  totalOpened: number;
};

type ReducerState = Pick<
  State,
  'isReady' | 'birthDate' | 'colors' | 'isPickerShown'
>;

type InitializeStateAction = {
  type: 'INITIALIZE_STATE';
  payload: {
    list: string[];
  };
};

type ChangeBirthDateAction = {
  type: 'CHANGE_BIRTH_DATE';
  payload: { date: MaterialUiPickersDate };
};

type ChangeColorAction = {
  type: 'CHANGE_COLOR';
  payload: { key: ColorName; value: string };
};

type SaveChangeColorAction = {
  type: 'SAVE_CHANGE_COLOR';
  payload: { key: ColorName };
};

type TogglePickerAction = {
  type: 'TOGGLE_PICKER';
};

type ReducerAction =
  | InitializeStateAction
  | ChangeBirthDateAction
  | ChangeColorAction
  | SaveChangeColorAction
  | TogglePickerAction;

const keys: ColorName[] = [
  'primary',
  'secondary',
  'background',
  'white',
];

const promises = [getDob(), ...keys.map(getLocalStorage)];

const initialState: ReducerState = {
  isReady: false,
  isPickerShown: window.innerWidth >= 768,
  birthDate: defaultDob,
  colors: defaultColors,
};

const reducer = produce(
  (draft: ReducerState, action: ReducerAction) => {
    switch (action.type) {
      case 'INITIALIZE_STATE':
        if (action.payload.list) {
          const [birthDate, ...colors] = action.payload.list;
          draft.birthDate = birthDate;
          colors.forEach((color, i) => {
            if (color) draft.colors[keys[i]] = color;
          });
        }
        draft.isReady = true;
        return;
      case 'CHANGE_BIRTH_DATE':
        if (action.payload.date) {
          const { date } = action.payload;
          const newBirthDate = new Date(
            date.year(),
            date.month(),
            date.date(),
          );
          draft.birthDate = newBirthDate;
          setLocalStorage('dob', newBirthDate.toISOString());
        }
        return;
      case 'CHANGE_COLOR':
        draft.colors[action.payload.key] = action.payload.value;
        return;
      case 'SAVE_CHANGE_COLOR':
        setLocalStorage(
          action.payload.key,
          draft.colors[action.payload.key],
        );
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
  changeBirthDate(date: MaterialUiPickersDate): void;
  previewColor(key: ColorName, value: string): void;
  saveChangeColor(key: ColorName): void;
  cancelChangeColor(key: ColorName): Promise<void>;
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
      const value = await getLocalStorage(key);
      previewColor(key, value || defaultColors[key]);
    },
    [],
  );

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
        togglePicker,
      },
    }),
    [state, totalOpened],
  );

  useEffect(() => {
    Promise.all(promises).then(results => {
      dispatch({
        type: 'INITIALIZE_STATE',
        payload: { list: results },
      });
    });
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
    cancelChangeColor() {
      return Promise.resolve();
    },
  },
});

export const useAppContext = (): Context => useContext(AppContext);
