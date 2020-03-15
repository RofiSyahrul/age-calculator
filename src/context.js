import {
  useState,
  useContext,
  createContext,
  useEffect
} from 'react';
import { getDob, setLocalStorage } from './utils/helpers';
import { defaultDob } from './utils/constants';

export const useAppState = () => {
  const [birthDate, setBirthDate] = useState(defaultDob);

  useEffect(() => {
    getDob().then(dob => setBirthDate(dob));
  }, []);

  const changeBirthDate = date => {
    const newBirthDate = new Date(
      date.year(),
      date.month(),
      date.date()
    );
    setBirthDate(newBirthDate);
    setLocalStorage('dob', newBirthDate.toISOString());
  };

  return { states: { birthDate }, actions: { changeBirthDate } };
};

export const AppContext = createContext({ states: {}, actions: {} });

export const useAppContext = () => useContext(AppContext);
