import React from 'react';
import Wrapper from 'src/components/atoms/wrapper';
import Text from 'src/components/atoms/text';
import TimeUnit from 'src/components/molecules/time-unit';
import Confetti from 'src/components/atoms/confetti';
import { timeUnits } from 'src/utils/constants';
import { useAge } from './age.hook';

export default function Age() {
  const { age, colors } = useAge();

  return (
    <Wrapper width="700px">
      {age.month === 0 && age.day === 0 && <Confetti />}
      <Text size="100px" weight="bold" color={colors.secondary}>
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
