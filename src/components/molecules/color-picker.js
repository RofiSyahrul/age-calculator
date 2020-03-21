import React, {
  forwardRef,
  useRef,
  useState,
  useImperativeHandle
} from 'react';
import { SketchPicker } from 'react-color';
import { useAppContext } from 'src/context';
import { shadow as defaultShadow } from 'src/utils/constants';
import Wrapper from '../atoms/wrapper';
import Button from '../atoms/button';
import Text from '../atoms/text';

const shadow =
  'rgba(0, 0, 0, 0.15) 0px 0px 0px 1px, rgba(0, 0, 0, 0.15) 0px 8px 16px';

const getOtherColors = (colors = {}, colorKey = '') => {
  const newObj = { ...colors };
  delete newObj[colorKey];
  return Object.values(newObj);
};

const Picker = forwardRef((props, ref) => {
  const { colorKey } = props;
  const [show, setShow] = useState(false);
  const {
    states: { colors, totalOpened },
    actions: {
      previewColor,
      saveChangeColor,
      cancelChangeColor,
      setTotalOpened
    }
  } = useAppContext();

  const togglePicker = () => {
    setShow(prev => {
      if (prev) {
        cancelChangeColor(colorKey);
        setTotalOpened(prevTotal => prevTotal - 1);
      } else if (totalOpened > 0) {
        return false;
      } else {
        setTotalOpened(prevTotal => prevTotal + 1);
      }
      return !prev;
    });
  };

  const onCancel = () => {
    setShow(false);
    setTotalOpened(prevTotal => prevTotal - 1);
    cancelChangeColor(colorKey);
  };

  const onChange = color => {
    const otherColors = getOtherColors(colors, colorKey);
    if (otherColors.includes(color.hex)) {
      return previewColor(colorKey, colors[colorKey]);
    }
    previewColor(colorKey, color.hex);
  };

  const onSave = () => {
    setShow(false);
    setTotalOpened(prevTotal => prevTotal - 1);
    saveChangeColor(colorKey);
  };

  useImperativeHandle(ref, () => ({ togglePicker }), [totalOpened]);

  return (
    <Wrapper
      display={show ? 'flex' : 'none'}
      position="absolute"
      top="100%"
      zIndex="10"
      width="100%"
      background="white"
      align="flex-start"
      radius="8px"
      margin="5px 0 0"
    >
      <SketchPicker
        width="initial"
        onChangeComplete={onChange}
        color={colors[colorKey]}
        disableAlpha
      />
      <Wrapper
        padding="8px"
        direction="row"
        justify="space-between"
        width="100%"
        shadow={shadow}
      >
        <Button
          background="red"
          radius="8px"
          padding="8px"
          color="white"
          width="70px"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          background="blue"
          radius="8px"
          padding="8px"
          color="white"
          width="70px"
          onClick={onSave}
        >
          Save
        </Button>
      </Wrapper>
    </Wrapper>
  );
});

export default function ColorPicker({ colorKey, label }) {
  const pickerRef = useRef();

  const {
    states: { colors }
  } = useAppContext();

  const onClickColor = () => {
    pickerRef.current.togglePicker();
  };

  return (
    <Wrapper width="100%" margin="12px 0" position="relative">
      <Wrapper
        width="100%"
        padding="8px"
        background={colors.primary}
        radius="8px"
        direction="row"
        justify="flex-start"
        shadow={defaultShadow}
      >
        <Button
          background={colors[colorKey]}
          radius="50%"
          width="20px"
          height="20px"
          onClick={onClickColor}
          border={`1px solid ${colors.white}`}
        />
        <Text color={colors.white} size="14px" margin="0 8px">
          {label}
        </Text>
      </Wrapper>
      <Picker ref={pickerRef} colorKey={colorKey} />
    </Wrapper>
  );
}
