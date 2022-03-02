import { useEffect, useMemo, useReducer, useRef } from 'react';

import { produce } from 'immer';
import isEqual from 'react-fast-compare';

import { useAppContext } from 'src/context';
import { decode } from 'src/utils/codec';
import { getAge, getMaxDaysInMonth } from 'src/utils/helpers';

type State = {
  age: Age;
  birthDate?: string | Date;
  maxDays: number;
};

type IncreaseAgeAction = {
  type: 'INCREASE_AGE';
};

type ChangeBirthDateAction = {
  type: 'CHANGE_BIRTH_DATE';
  payload: Pick<State, 'birthDate'>;
};

type Action = IncreaseAgeAction | ChangeBirthDateAction;

function initializeState(birthDate?: string | Date): State {
  return {
    birthDate,
    age: getAge(birthDate),
    maxDays: getMaxDaysInMonth(birthDate),
  };
}

const reducer = produce((draft: State, action: Action) => {
  const { age, maxDays } = draft;
  switch (action.type) {
    case 'CHANGE_BIRTH_DATE':
      if (!isEqual(draft.birthDate, action.payload.birthDate)) {
        const { birthDate } = action.payload;
        draft.birthDate = birthDate;
        draft.age = getAge(birthDate);
        draft.maxDays = getMaxDaysInMonth(birthDate);
      }
      return;
    case 'INCREASE_AGE':
      if (typeof age.second === 'undefined') return;
      if (age.second < 59) {
        draft.age.second = age.second + 1;
        return;
      }
      if (typeof age.minute === 'undefined') return;
      draft.age.second = 0;
      if (age.minute < 59) {
        draft.age.minute = age.minute + 1;
        return;
      }
      if (typeof age.hour === 'undefined') return;
      draft.age.minute = 0;
      if (age.hour < 23) {
        draft.age.hour = age.hour + 1;
        return;
      }
      if (typeof age.day === 'undefined') return;
      draft.age.hour = 0;
      if (age.day < maxDays) {
        draft.age.day = age.day + 1;
        return;
      }
      if (typeof age.month === 'undefined') return;
      draft.age.day = 0;
      if (age.month < 11) {
        draft.age.month = age.month + 1;
        return;
      }
      if (typeof age.year === 'undefined') return;
      draft.age.month = 0;
      draft.age.year = age.year + 1;
      return;
    default:
      throw new Error('Unknown action type for age reducer');
  }
});

type HookReturn = {
  age: Age;
  isBirthdayParty: boolean;
  isPickerShown: boolean;
  runningTexts: string[];
};

function parseRunningText(rawText: string, year?: number) {
  if (!rawText.includes('${year}')) return rawText;
  return rawText.replace(/\$\{year\}/g, (year ?? '').toString());
}

export const useAge = (): HookReturn => {
  const {
    states: { birthDate, isPickerShown, specialSetting },
  } = useAppContext();
  const prevBirthDateRef = useRef(birthDate);

  const { confettiLive, runningTexts } = specialSetting || {};

  const [{ age }, dispatch] = useReducer(
    reducer,
    birthDate,
    initializeState,
  );

  const isBirthdayParty = useMemo(() => {
    if (
      typeof confettiLive !== 'number' ||
      confettiLive < 1 ||
      typeof age.day !== 'number'
    ) {
      return age.month === 0 && age.day === 0;
    }

    return age.month === 0 && age.day < confettiLive;
  }, [confettiLive, age.month, age.day]);

  const parsedRunningTexts = useMemo(() => {
    if (!runningTexts) return [];
    return runningTexts.map(rawText =>
      parseRunningText(decode(rawText), age.year),
    );
  }, [runningTexts, age.year]);

  useEffect(() => {
    if (birthDate && prevBirthDateRef.current !== birthDate) {
      prevBirthDateRef.current = birthDate;
      dispatch({ type: 'CHANGE_BIRTH_DATE', payload: { birthDate } });
    }
  }, [birthDate]);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: 'INCREASE_AGE' });
    }, 1000);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, []);

  return {
    age,
    isBirthdayParty,
    isPickerShown,
    runningTexts: parsedRunningTexts,
  };
};
