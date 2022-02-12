import React, { lazy, Suspense } from 'react';

import TimeUnit from '@molecules/time-unit';
import { timeUnits } from 'src/utils/constants';

import { useAge } from './age.hook';
import {
  AgeWrapper,
  MajorTimeUnitWrapper,
  MinorTimeUnitWrapper,
  Title,
} from './age.styles';

const Confetti = lazy(() => import('@atoms/confetti'));
const RunningText = lazy(() => import('@molecules/running-text'));

export default function Age() {
  const { age, isBirthdayParty, isPickerShown, runningTexts } =
    useAge();

  return (
    <AgeWrapper className={isPickerShown ? 'with-picker' : ''}>
      {isBirthdayParty && (
        <Suspense fallback={<div style={{ position: 'fixed' }} />}>
          <Confetti />
        </Suspense>
      )}
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
        <Suspense fallback={<div />}>
          <RunningText texts={runningTexts} />
        </Suspense>
      )}
    </AgeWrapper>
  );
}
