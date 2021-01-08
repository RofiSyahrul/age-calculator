import React from 'react';
import { Box, Text } from 'goods-core';
import { useAppContext } from 'src/context';
import { pickersWidth } from 'src/utils/constants';

const Footer: React.FC = () => {
  const {
    states: { colors, isPickerShown },
  } = useAppContext();

  return (
    <Box
      as='footer'
      posi='absolute'
      top='100%'
      fAlign='center'
      fJustify='center'
      transition='inherit'
      tProperty='width, opacity'
      className={isPickerShown ? 'with-picker' : ''}
      {...(isPickerShown
        ? {
            w: `calc(100% - ${pickersWidth})`,
            opacity: { xs: 0, md: 1 },
            mt: { xs: '0', lg: 's' },
          }
        : { w: '100%', mt: 's' })}
    >
      <Text
        as='span'
        c={colors.white}
        fSize={{ xs: '14px', sm: '20px' }}
        lineHeight='1.3em'
        textAlign='center'
      >
        {`Copyright © ${new Date().getFullYear()} S. Rofi.`}
      </Text>
      <Text
        as='span'
        c={colors.white}
        fSize={{ xs: '14px', sm: '20px' }}
        lineHeight='1.3em'
        textAlign='center'
      >
        {`v${APP_VERSION}`}
      </Text>
    </Box>
  );
};

export default Footer;
