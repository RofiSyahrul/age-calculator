import { useState, useEffect } from 'react';
import { getAge } from 'src/utils/helpers';

export const useAge = () => {
  const [age, setAge] = useState(getAge());

  useEffect(() => {
    const interval = setInterval(() => {
      setAge(getAge());
    }, 1000);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, []);
  return age;
};
