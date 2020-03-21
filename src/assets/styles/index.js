import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { useAppContext } from 'src/context';
import GlobalCSS from './global';

const Styles = createGlobalStyle`
  ${GlobalCSS}
`;

const GlobalStyle = () => {
  const {
    states: { colors }
  } = useAppContext();

  return <Styles background={colors.background} />;
};

export default GlobalStyle;
