import React from 'react';

import { createGlobalStyle } from 'styled-components';

import { useAppState } from 'src/store';

import type { GlobalCssProps } from './global';
import GlobalCSS from './global';

const Styles = createGlobalStyle`
  ${GlobalCSS}
` as unknown as React.FC<GlobalCssProps>;

const GlobalStyle: React.FC = () => {
  const { colors, isReady } = useAppState();

  return <Styles isReady={isReady} colors={colors} />;
};

export default GlobalStyle;
