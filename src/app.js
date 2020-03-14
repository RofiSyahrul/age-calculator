import React from 'react';
import { useAppState, AppContext } from './context';
import GlobalStyles from './assets/styles';
import Age from './components/age';
import BirthdatePicker from './components/birthdate-picker';
import Wrapper from './components/wrapper';
import Footer from './components/footer';

export default function App() {
  const { states, actions } = useAppState();
  return (
    <AppContext.Provider value={{ states, actions }}>
      <GlobalStyles />
      <Wrapper width="100%" position="relative">
        <BirthdatePicker />
        <Age />
      </Wrapper>
      <Footer />
    </AppContext.Provider>
  );
}
