import React from 'react';
import { colors, shadow } from 'src/utils/constants';
import Wrapper from './wrapper';
import Text from './text';

const TimeUnit = ({ value = 0, unit = '' }) => (
  <Wrapper justify="space-between" height="200px" width="200px">
    <Wrapper
      height="150px"
      width="150px"
      radius="50%"
      padding="4px"
      background={colors.primary}
      shadow={shadow}
    >
      <Text size="75px" weight="bold" align="center">
        {isNaN(value) ? '-' : value}
      </Text>
    </Wrapper>
    <Text size="30px" align="center">
      {`${value > 1 ? `${unit}s` : unit}`.replace(/^\S/g, match =>
        match.toUpperCase()
      )}
    </Text>
  </Wrapper>
);

export default TimeUnit;
