import React from 'react';

import { Settings } from '@material-ui/icons';
import { mergeClass } from 'goods-core';
import { Button } from 'goods-ui';

import { useAppContext } from 'src/context';

const SettingButton: React.FC = () => {
  const {
    states: { isPickerShown, colors },
    actions: { togglePicker },
  } = useAppContext();

  return (
    <Button
      w='fit-content'
      minW='48px'
      px='xxs'
      posi='fixed'
      top='16px'
      left='16px'
      z='speedDial'
      shadow='high'
      bg={colors.primary}
      className={mergeClass(
        'setting-btn',
        isPickerShown ? 'hidden' : '',
      )}
      onClick={togglePicker}
    >
      <Settings />
    </Button>
  );
};

export default SettingButton;
