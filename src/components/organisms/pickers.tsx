import React from 'react';

import styled from 'styled-components';

import Button from '@atoms/button';
import { CloseIcon } from '@atoms/icon';
import BirthdatePicker from '@molecules/birthdate-picker';
import ColorPicker from '@molecules/color-picker';
import { useAppContext } from 'src/context';
import colorVars from 'src/utils/color-vars';
import { pickersWidth } from 'src/utils/constants';

const colors: { colorKey: ColorName; label: string }[] = [
  { colorKey: 'background', label: 'Background color' },
  {
    colorKey: 'primary',
    label: 'Circle and picker color',
  },
  {
    colorKey: 'secondary',
    label: 'Age, units, icons, and numbers color',
  },
  { colorKey: 'white', label: 'Text color' },
];

const Aside = styled.aside`
  display: flex;
  flex-direction: column;
  width: ${pickersWidth};
  max-width: 100%;
  height: 100%;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 1200;
  overflow: auto;
  padding: 1rem;

  background-color: ${colorVars.primary};
  box-shadow: ${props => props.theme.shadow.high};
  transition: inherit;
  transition-property: transform;

  &[aria-hidden='true'] {
    transform: translateX(-100%);
    box-shadow: none;
    z-index: 0;
    overflow: hidden;
  }
`;

const ActionWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  margin-bottom: 1rem;
  transition: inherit;
  transition-property: opacity;
  opacity: 1;

  &[aria-hidden='true'] {
    opacity: 0;
  }
`;

const CloseButton = styled(Button)`
  padding: 0rem;
  min-height: 2rem;
  color: ${colorVars.white};

  &:hover,
  &:focus {
    color: ${colorVars.secondary};
  }
`;

const ResetButton = styled(Button)`
  min-height: 2.5rem;
  max-width: 100%;
  margin-top: 0.75rem;
  padding: 0rem 0.75rem;
  width: fit-content;
  align-self: flex-end;
  color: ${colorVars.background};
`;

const buttonTitle = 'Close picker setting';

export default function Pickers() {
  const {
    states: { isDefaultColors, isPickerShown },
    actions: { resetColors, togglePicker },
  } = useAppContext();

  return (
    <Aside aria-hidden={!isPickerShown}>
      <ActionWrapper aria-hidden={!isPickerShown}>
        <CloseButton
          $bg='transparent'
          onClick={togglePicker}
          title={buttonTitle}
          aria-label={buttonTitle}
        >
          <CloseIcon color='currentColor' size='large' />
        </CloseButton>
      </ActionWrapper>
      <BirthdatePicker />
      {colors.map(item => (
        <ColorPicker key={item.colorKey} {...item} />
      ))}
      <ResetButton
        $bg={colorVars.secondary}
        onClick={resetColors}
        disabled={isDefaultColors}
      >
        Reset colors to default
      </ResetButton>
    </Aside>
  );
}
