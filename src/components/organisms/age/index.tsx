import React from 'react';

import dynamic from 'next/dynamic';

import TimeUnit from '@molecules/time-unit';
import { timeUnits } from 'src/utils/constants';

import { useAge } from './age.hook';
import {
  AgeWrapper,
  MajorTimeUnitWrapper,
  MinorTimeUnitWrapper,
  Title,
} from './age.styles';

const Confetti = dynamic(() => import('@atoms/confetti'), {
  ssr: false,
});

const RunningText = dynamic(() => import('@molecules/running-text'), {
  ssr: false,
});

export default function Age() {
  const { age, isBirthdayParty, isPickerShown, runningTexts } =
    useAge();

  return (
    <AgeWrapper className={isPickerShown ? 'with-picker' : ''}>
      {isBirthdayParty && <Confetti />}
      <Title>Age</Title>
      <MajorTimeUnitWrapper>
        {timeUnits.slice(0, 3).map(unit => (
          <TimeUnit key={unit} value={age[unit]} unit={unit} />
        ))}
      </MajorTimeUnitWrapper>
      <MinorTimeUnitWrapper>
        {timeUnits.slice(3).map(unit => (
          <TimeUnit key={unit} value={age[unit]} unit={unit} />
        ))}
      </MinorTimeUnitWrapper>
      {isBirthdayParty && runningTexts.length > 0 && (
        <RunningText texts={runningTexts} />
      )}
    </AgeWrapper>
  );
}
