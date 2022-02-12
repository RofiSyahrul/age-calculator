import React, { lazy, Suspense } from 'react';

import styled, { ThemeProvider } from 'styled-components';

import Spinner from '@atoms/spinner';
import Footer from '@molecules/footer';
import SettingButton from '@molecules/setting-button';

import GlobalStyles from './assets/styles';
import theme from './assets/theme';
import { useAppState, AppContext, useAppContext } from './context';
import { pickersWidth } from './utils/constants';

const Age = lazy(() => import('@organisms/age'));
const Pickers = lazy(() => import('@organisms/pickers'));

const MainWrapper = styled.div<{ $isPickerShown: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${props =>
    props.$isPickerShown ? `calc(100% - ${pickersWidth})` : '100%'};
  min-height: calc(100vh - 80px);
  position: relative;
  transition: inherit;
`;

const Main: React.FC = () => {
  const {
    states: { isPickerShown, isReady, specialSetting },
  } = useAppContext();

  if (isReady) {
    return (
      <MainWrapper $isPickerShown={isPickerShown}>
        <Suspense fallback={<Spinner />}>
          {!specialSetting && <Pickers />}
          <Age />
        </Suspense>
      </MainWrapper>
    );
  }

  return <Spinner />;
};

export default function App(): JSX.Element {
  const { states, actions } = useAppState();
  return (
    <AppContext.Provider value={{ states, actions }}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {!states.specialSetting && <SettingButton />}
        <Main />
        <Footer />
      </ThemeProvider>
    </AppContext.Provider>
  );
}
