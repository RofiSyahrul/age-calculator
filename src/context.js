import {
  useState,
  useContext,
  createContext,
  useEffect
} from 'react';
import {
  getDob,
  setLocalStorage,
  getLocalStorage
} from './utils/helpers';
import {
  defaultDob,
  colors as defaultColors
} from './utils/constants';

const keys = ['primary', 'secondary', 'background', 'white'];
const promises = keys.map(getLocalStorage);

export const useAppState = () => {
  const [birthDate, setBirthDate] = useState(defaultDob);
  const [colors, setColors] = useState(defaultColors);
  const [totalOpened, setTotalOpened] = useState(0);

  useEffect(() => {
    getDob().then(dob => setBirthDate(dob));
    Promise.all(promises).then(results => {
      const savedColors = results.reduce((obj, curr, i) => {
        if (curr) obj[keys[i]] = curr;
        return obj;
      }, {});
      setColors(prev => ({ ...prev, ...savedColors }));
    });
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

  const previewColor = (key, value) => {
    setColors(prev => ({ ...prev, [key]: value }));
  };

  const saveChangeColor = key => {
    setLocalStorage(key, colors[key]);
  };

  const cancelChangeColor = async key => {
    const value = await getLocalStorage(key);
    previewColor(key, value || defaultColors[key]);
  };

  return {
    states: { birthDate, colors, totalOpened },
    actions: {
      changeBirthDate,
      saveChangeColor,
      previewColor,
      cancelChangeColor,
      setTotalOpened
    }
  };
};

export const AppContext = createContext({ states: {}, actions: {} });

export const useAppContext = () => useContext(AppContext);
