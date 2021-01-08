import React from 'react';
import { Box, Icon } from 'goods-core';
import BirthdatePicker from '@molecules/birthdate-picker';
import ColorPicker from '@molecules/color-picker';
import { useAppContext } from 'src/context';
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

const Pickers: React.FC = () => {
  const {
    states: {
      colors: { primary, secondary },
      isPickerShown,
    },
    actions: { togglePicker },
  } = useAppContext();

  return (
    <Box
      as='aside'
      w={pickersWidth}
      maxW='100%'
      posi='fixed'
      top='0'
      left='0'
      p='16px'
      bg={primary}
      shadow='high'
      h='100%'
      z='drawer'
      overflow='auto'
      transition='inherit'
      tProperty='transform'
      {...(!isPickerShown && {
        transform: 'translateX(-100%)',
        shadow: 'none',
        z: 0,
        overflow: 'hidden',
      })}
    >
      <Box
        w
        minH='48px'
        pr='8px'
        fJustify='center'
        fAlign='flex-end'
        transition='inherit'
        tProperty='opacity'
        opacity={isPickerShown ? 1 : 0}
      >
        <Icon
          name='close'
          c={secondary}
          cursor='pointer'
          size='large'
          onClick={togglePicker}
        />
      </Box>
      <BirthdatePicker />
      {colors.map(item => (
        <ColorPicker key={item.colorKey} {...item} />
      ))}
    </Box>
  );
};

export default Pickers;
