import React from 'react';

import { createGlobalStyle } from 'styled-components';

import { useAppContext } from 'src/context';

import type { GlobalCssProps } from './global';
import GlobalCSS from './global';

const Styles = createGlobalStyle`
  ${GlobalCSS}
` as unknown as React.FC<GlobalCssProps>;

const GlobalStyle: React.FC = () => {
  const {
    states: { colors, isReady },
  } = useAppContext();

  return <Styles isReady={isReady} colors={colors} />;
};

export default GlobalStyle;
