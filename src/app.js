import React from 'react';
import { useAppState, AppContext } from './context';
import GlobalStyles from './assets/styles';
import Age from './components/organisms/age';
import Pickers from './components/organisms/pickers';
import Wrapper from './components/atoms/wrapper';
import Footer from './components/molecules/footer';

export default function App() {
  const { states, actions } = useAppState();
  return (
    <AppContext.Provider value={{ states, actions }}>
      <GlobalStyles />
      <Wrapper width="100%" position="relative">
        <Pickers />
        <Age />
      </Wrapper>
      <Footer />
    </AppContext.Provider>
  );
}
