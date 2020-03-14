import {
  useState,
  useContext,
  createContext,
  useEffect
} from 'react';
import { getDob, setLocalStorage } from './utils/helpers';

export const useAppState = () => {
  const [birthDate, setBirthDate] = useState('');

  useEffect(() => {
    getDob().then(dob => {
      setBirthDate(dob);
    });
  }, []);

  const changeBirthDate = date => {
    const newBirthDate = new Date(
      date.year(),
      date.month(),
      date.date()
    );
    setBirthDate(newBirthDate);
    setLocalStorage('dob', newBirthDate);
  };

  return { states: { birthDate }, actions: { changeBirthDate } };
};

export const AppContext = createContext({ states: {}, actions: {} });

export const useAppContext = () => useContext(AppContext);
