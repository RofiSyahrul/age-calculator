import React, { lazy, Suspense } from 'react';

import { Box, Text } from 'goods-core';

import TimeUnit from '@molecules/time-unit';
import { timeUnits } from 'src/utils/constants';

import { useAge } from './age.hook';

const Confetti = lazy(() => import('@atoms/confetti'));

const Age: React.FC = () => {
  const { age, colors, confettiLive, isPickerShown } = useAge();

  return (
    <Box
      as='main'
      w
      maxW='700px'
      fAlign='center'
      fJustify='center'
      opacity={{ xs: isPickerShown ? 0 : 1, md: 1 }}
      transition='inherit'
      tProperty='opacity'
      className={isPickerShown ? 'with-picker' : ''}
    >
      {age.month === 0 && age.day && age.day < confettiLive && (
        <Suspense fallback={<div style={{ position: 'fixed' }} />}>
          <Confetti />
        </Suspense>
      )}
      <Text
        as='h1'
        fSize={{
          xs: '39px',
          sm: '65px',
          md: isPickerShown ? '80px' : '100px',
          lg: '100px',
        }}
        weight='bold'
        c={colors.secondary}
        lineHeight='1.3em'
      >
        Age
      </Text>
      <Box
        w
        d='grid'
        gTempCol='repeat(3, 1fr)'
        fJustify='space-between'
        fAlign='center'
        py='l'
        px='xxs'
      >
        {timeUnits.slice(0, 3).map(unit => (
          <TimeUnit key={unit} value={age[unit]} unit={unit} />
        ))}
      </Box>
      <Box
        w
        maxW='600px'
        d='grid'
        gTempCol='repeat(3, 1fr)'
        fJustify='center'
        fAlign='center'
      >
        {timeUnits.slice(3).map(unit => (
          <TimeUnit key={unit} value={age[unit]} unit={unit} />
        ))}
      </Box>
    </Box>
  );
};

export default Age;
