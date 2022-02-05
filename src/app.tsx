import React, { lazy, Suspense } from 'react';

import {
  Box,
  GoodsProvider,
  overrideGoodsTheme,
  Spinner,
} from 'goods-core';
import type { DefaultTheme } from 'styled-components';

import SettingButton from '@atoms/setting-button';
import Footer from '@molecules/footer';

import GlobalStyles from './assets/styles';
import { useAppState, AppContext, useAppContext } from './context';
import { pickersWidth, shadow } from './utils/constants';

const Age = lazy(() => import('@organisms/age'));
const Pickers = lazy(() => import('@organisms/pickers'));

const fontBase = [
  '-apple-system',
  'BlinkMacSystemFont',
  'Segoe UI',
  'Roboto',
  'Oxygen',
  'Ubuntu',
  'Cantarell',
  'Fira Sans',
  'Droid Sans',
  'Helvetica Neue',
  'sans-serif',
].join(', ');

const theme: DefaultTheme = {
  ...(overrideGoodsTheme({
    breakpoints: { sm: '320px', xl: '1081px' },
    shadows: { high: shadow },
  }) as DefaultTheme),
  fontBase,
};

const Main: React.FC = () => {
  const {
    states: { isPickerShown, isReady, specialSetting },
  } = useAppContext();

  if (isReady) {
    return (
      <Box
        w={isPickerShown ? `calc(100% - ${pickersWidth})` : '100%'}
        minH='calc(100vh - 80px)'
        fJustify='center'
        fAlign='center'
        posi='relative'
        transition='inherit'
      >
        <Suspense fallback={<Spinner s='150px' />}>
          {!specialSetting && <Pickers />}
          <Age />
        </Suspense>
      </Box>
    );
  }

  return <Spinner s='150px' />;
};

export default function App(): JSX.Element {
  const { states, actions } = useAppState();
  return (
    <AppContext.Provider value={{ states, actions }}>
      <GoodsProvider noGlobalStyle theme={theme}>
        <GlobalStyles />
        {!states.specialSetting && <SettingButton />}
        <Main />
        <Footer />
      </GoodsProvider>
    </AppContext.Provider>
  );
}
