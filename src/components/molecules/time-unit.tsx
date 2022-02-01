import React, { memo } from 'react';

import { Box, mergeClass, Text } from 'goods-core';

import { useAppContext } from 'src/context';
import { shadow } from 'src/utils/constants';

interface TimeUnitProps {
  value?: number;
  unit?: AgeKey | '';
}

const TimeUnit = memo<TimeUnitProps>(({ value = 0, unit = '' }) => {
  const {
    states: { colors, isPickerShown },
  } = useAppContext();

  const label = `${value > 1 ? `${unit}s` : unit}`.replace(
    /^\S/g,
    match => match.toUpperCase(),
  );

  return (
    <Box
      fJustify='space-between'
      fAlign='center'
      w
      pt='100%'
      posi='relative'
      className={mergeClass(
        'time-unit',
        isPickerShown ? 'with-picker' : '',
      )}
    >
      <Box
        h='75%'
        w='75%'
        radius='50%'
        p='4px'
        bg={colors.primary}
        shadow={shadow}
        posi='absolute'
        top='0px'
        left='50%'
        transform='translateX(-50%)'
        fAlign='center'
        fJustify='center'
      >
        <Text
          as='span'
          fSize={{
            xs: '30px',
            sm: '45px',
            md: isPickerShown ? '52px' : '75px',
            lg: '75px',
          }}
          lineHeight='1.3em'
          weight='bold'
          textAlign='center'
          c={colors.secondary}
        >
          {Number.isNaN(value) ? '-' : value}
        </Text>
      </Box>
      <Box
        w
        posi='absolute'
        bottom='0px'
        left='0px'
        fAlign='center'
        fJustify='center'
        h='25%'
      >
        <Text
          as='span'
          fSize={{
            xs: '12px',
            sm: '18px',
            md: isPickerShown ? '24px' : '30px',
            lg: '30px',
          }}
          textAlign='center'
          c={colors.secondary}
          lineHeight='1.3em'
          mt='xxxs'
        >
          {label}
        </Text>
      </Box>
    </Box>
  );
});

export default TimeUnit;
