import React from 'react';
import Wrapper from 'src/components/wrapper';
import Text from 'src/components/text';
import TimeUnit from 'src/components/time-unit';
import Confetti from 'src/components/confetti';
import { timeUnits } from 'src/utils/constants';
import { useAge } from './age.hook';

export default function Age() {
  const age = useAge();

  return (
    <Wrapper width="700px">
      {age.month === 0 && age.day === 0 && <Confetti />}
      <Text size="100px" weight="bold">
        Age
      </Text>
      <Wrapper
        width="100%"
        direction="row"
        justify="space-between"
        padding="32px 8px"
      >
        {timeUnits.slice(0, 3).map(unit => (
          <TimeUnit key={unit} value={age[unit]} unit={unit} />
        ))}
      </Wrapper>
      <Wrapper width="600px" direction="row">
        {timeUnits.slice(3).map(unit => (
          <TimeUnit key={unit} value={age[unit]} unit={unit} />
        ))}
      </Wrapper>
    </Wrapper>
  );
}
