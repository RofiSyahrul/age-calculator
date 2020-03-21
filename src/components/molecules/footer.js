import React from 'react';
import { version } from 'src/utils/constants';
import { useAppContext } from 'src/context';
import Wrapper from '../atoms/wrapper';
import Text from '../atoms/text';

export default function Footer() {
  const {
    states: { colors }
  } = useAppContext();

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
