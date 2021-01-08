import React, {
  forwardRef,
  useState,
  useImperativeHandle,
  memo,
  createRef,
  useCallback,
  useEffect,
} from 'react';
import { ColorChangeHandler, SketchPicker } from 'react-color';
import { Box, Text } from 'goods-core';
import { Button } from 'goods-ui';
import { useAppContext } from 'src/context';

const shadow =
  'rgba(0, 0, 0, 0.15) 0px 0px 0px 1px, rgba(0, 0, 0, 0.15) 0px 8px 16px';

interface PickerProps {
  colorKey: ColorName;
}

interface ColorPickerProps extends PickerProps {
  label: string;
}

interface PickerHandler {
  togglePicker(): void;
}

const getOtherColors = (colors = {}, colorKey = '') => {
  const newObj = { ...colors };
  delete newObj[colorKey];
  return Object.values(newObj);
};

const Picker = forwardRef<PickerHandler, PickerProps>(
  (props, ref) => {
    const { colorKey } = props;
    const [show, setShow] = useState(false);
    const {
      states: { colors, totalOpened, isPickerShown },
      actions: {
        previewColor,
        saveChangeColor,
        cancelChangeColor,
        setTotalOpened,
      },
    } = useAppContext();

    const togglePicker = useCallback(() => {
      setShow(prev => {
        if (!prev && totalOpened > 0) {
          return false;
        }
        return !prev;
      });
    }, [colorKey, totalOpened]);

    const onCancel = useCallback(() => {
      setShow(false);
      setTotalOpened(prevTotal => Math.max(prevTotal - 1, 0));
      cancelChangeColor(colorKey);
    }, [colorKey]);

    const onChange = useCallback<ColorChangeHandler>(
      color => {
        const otherColors = getOtherColors(colors, colorKey);
        if (otherColors.includes(color.hex)) {
          return previewColor(colorKey, colors[colorKey]);
        }
        previewColor(colorKey, color.hex);
      },
      [colorKey],
    );

    const onSave = useCallback(() => {
      setShow(false);
      setTotalOpened(prevTotal => prevTotal - 1);
      saveChangeColor(colorKey);
    }, [colorKey]);

    useImperativeHandle(ref, () => ({ togglePicker }), [totalOpened]);

    useEffect(() => {
      if (show) {
        setTotalOpened(prev => prev + 1);
      } else {
        setTotalOpened(prev => Math.max(prev - 1, 0));
      }
    }, [show]);

    useEffect(() => {
      if (!isPickerShown) onCancel();
    }, [isPickerShown]);

    return (
      <Box
        d={show ? 'flex' : 'none'}
        posi='absolute'
        top='100%'
        z={10}
        w
        bg='white'
        fJustify='center'
        radius='l'
        mt='5px'
      >
        <SketchPicker
          width='initial'
          onChangeComplete={onChange}
          color={colors[colorKey]}
          disableAlpha
        />
        <Box
          p='xxs'
          fDir='row'
          fJustify='space-between'
          fAlign='center'
          w
          shadow={shadow}
        >
          <Button
            bg='red60'
            radius='l'
            p='xxs'
            c='white'
            w='70px'
            minH='32px'
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            bg='blue50'
            radius='l'
            p='xxs'
            c='white'
            w='70px'
            minH='32px'
            onClick={onSave}
          >
            Save
          </Button>
        </Box>
      </Box>
    );
  },
);

const ColorPicker = memo<ColorPickerProps>(({ colorKey, label }) => {
  const pickerRef = createRef<PickerHandler>();

  const {
    states: { colors, isPickerShown },
  } = useAppContext();

  const onClickColor = useCallback(() => {
    if (pickerRef.current) pickerRef.current.togglePicker();
  }, [pickerRef]);

  return (
    <Box
      w
      my='xs'
      posi='relative'
      fAlign='center'
      fJustify='center'
      transition='inherit'
      tProperty='opacity'
      opacity={isPickerShown ? 1 : 0}
    >
      <Box
        w
        p='xxs'
        bg={colors.primary}
        radius='8px'
        fDir='row'
        fAlign='center'
        shadow={shadow}
      >
        <Button
          bg={colors[colorKey]}
          radius='50%'
          w='20px'
          minH='20px'
          onClick={onClickColor}
          b={`1px solid ${colors.white}`}
        />
        <Text
          c={colors.white}
          as='span'
          fSize='14px'
          mx='xxs'
          lineHeight='1.3em'
        >
          {label}
        </Text>
      </Box>
      <Picker ref={pickerRef} colorKey={colorKey} />
    </Box>
  );
});

export default ColorPicker;
