import React, { useState, useEffect } from 'react';
import ConfettiComponent from 'react-confetti';

const Confetti = () => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <ConfettiComponent
      width={size.width}
      height={size.height}
      numberOfPieces="700"
      style={{ position: 'fixed' }}
    />
  );
};

export default Confetti;
