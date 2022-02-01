import React from 'react';

import { createGlobalStyle } from 'styled-components';

import { useAppContext } from 'src/context';

import GlobalCSS from './global';

const Styles = createGlobalStyle`
  ${GlobalCSS}
`;

const GlobalStyle: React.FC = () => {
  const {
    states: { colors, isReady },
  } = useAppContext();

  return (
    <Styles
      background={colors.background}
      btnColor={colors.secondary}
      isReady={isReady}
    />
  );
};

export default GlobalStyle;
