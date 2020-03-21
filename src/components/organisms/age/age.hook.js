import { useState, useEffect } from 'react';
import { useAppContext } from 'src/context';
import { getAge } from 'src/utils/helpers';

export const useAge = () => {
  const {
    states: { birthDate, colors }
  } = useAppContext();

  const [age, setAge] = useState(getAge(birthDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setAge(getAge(birthDate));
    }, 1000);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [birthDate]);

  return { age, colors };
};
