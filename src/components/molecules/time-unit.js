import React from 'react';
import { shadow } from 'src/utils/constants';
import { useAppContext } from 'src/context';
import Wrapper from '../atoms/wrapper';
import Text from '../atoms/text';

const TimeUnit = ({ value = 0, unit = '' }) => {
  const {
    states: { colors }
  } = useAppContext();

  return (
    <Wrapper justify="space-between" height="200px" width="200px">
      <Wrapper
        height="150px"
        width="150px"
        radius="50%"
        padding="4px"
        background={colors.primary}
        shadow={shadow}
      >
        <Text
          size="75px"
          weight="bold"
          align="center"
          color={colors.secondary}
        >
          {isNaN(value) ? '-' : value}
        </Text>
      </Wrapper>
      <Text size="30px" align="center" color={colors.secondary}>
        {`${value > 1 ? `${unit}s` : unit}`.replace(/^\S/g, match =>
          match.toUpperCase()
        )}
      </Text>
    </Wrapper>
  );
};

export default TimeUnit;