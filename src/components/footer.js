import React from 'react';
import { version, colors } from 'src/utils/constants';
import Wrapper from './wrapper';
import Text from './text';

export default function Footer() {
  return (
    <Wrapper position="absolute" bottom="24px" width="100%">
      <Text color={colors.white} size="20px">
        {`Copyright © ${new Date().getFullYear()} S. Rofi.`}
      </Text>
      <Text color={colors.white} size="20px">
        {`v${version}`}
      </Text>
    </Wrapper>
  );
}
