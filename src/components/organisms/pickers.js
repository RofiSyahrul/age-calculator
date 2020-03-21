import React from 'react';
import Wrapper from '../atoms/wrapper';
import BirthdatePicker from '../molecules/birthdate-picker';
import ColorPicker from '../molecules/color-picker';

const colors = [
  { colorKey: 'background', label: 'Background color' },
  {
    colorKey: 'primary',
    label: 'Circle and picker color'
  },
  { colorKey: 'secondary', label: 'Age, units, and numbers color' },
  { colorKey: 'white', label: 'Text color' }
];

const Pickers = () => (
  <Wrapper
    width="300px"
    position="absolute"
    top="0"
    right="0"
    padding="16px"
    align="flex-start"
  >
    <BirthdatePicker />
    {colors.map(item => (
      <ColorPicker key={item.colorKey} {...item} />
    ))}
  </Wrapper>
);

export default Pickers;
