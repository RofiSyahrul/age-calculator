import type { FC } from 'react';
import {
  forwardRef,
  useState,
  useImperativeHandle,
  memo,
  createRef,
  useCallback,
  useEffect,
} from 'react';

import type { ColorChangeHandler } from 'react-color';
import type { SketchPickerProps } from 'react-color/lib/components/sketch/Sketch';
import Sketch from 'react-color/lib/components/sketch/Sketch';
import styled, { useTheme } from 'styled-components';

import Button from '@atoms/button';
import { appAction, useAppState } from 'src/store';
import colorVars from 'src/utils/color-vars';

interface PickerProps {
  colorKey: ColorName;
}

interface ColorPickerProps extends PickerProps {
  label: string;
}

interface PickerHandler {
  togglePicker(): void;
}

const SketchPicker = Sketch as unknown as FC<SketchPickerProps>;

const getOtherColors = (colors = {}, colorKey = '') => {
  const newObj = { ...colors };
  delete newObj[colorKey];
  return Object.values(newObj);
};

const SketchPickerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  top: 100%;
  z-index: 10;
  width: 100%;
  background: white;
  border-radius: 0.5rem;
  margin-top: 0.375rem;

  &[aria-hidden='true'] {
    display: none;
  }
`;

const ActionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  width: 100%;
  box-shadow: ${props => props.theme.shadow.medium};
`;

const ActionButton = styled(Button)`
  border-radius: 0.5rem;
  padding: 0.5rem;
  width: 70px;
  min-height: 2rem;
  color: white;
`;

const {
  cancelChangeColor,
  previewColor,
  saveChangeColor,
  setTotalOpened,
} = appAction;

const Picker = forwardRef<PickerHandler, PickerProps>(
  (props, ref) => {
    const { colorKey } = props;
    const theme = useTheme();
    const [isVisible, setIsVisible] = useState(false);
    const { colors, isPickerShown, totalOpened } = useAppState();

    const togglePicker = useCallback(() => {
      setIsVisible(prev => {
        if (!prev && totalOpened > 0) {
          return false;
        }
        return !prev;
      });
    }, [colorKey, totalOpened]);

    const handleCancel = useCallback(() => {
      setIsVisible(false);
      setTotalOpened(prevTotal => Math.max(prevTotal - 1, 0));
      cancelChangeColor(colorKey);
    }, [colorKey]);

    const handleChange = useCallback<ColorChangeHandler>(
      color => {
        const otherColors = getOtherColors(colors, colorKey);
        if (otherColors.includes(color.hex)) {
          return previewColor(colorKey, colors[colorKey]);
        }
        previewColor(colorKey, color.hex);
      },
      [colors, colorKey],
    );

    const handleSave = useCallback(() => {
      setIsVisible(false);
      setTotalOpened(prevTotal => prevTotal - 1);
      saveChangeColor(colorKey);
    }, [colorKey]);

    useImperativeHandle(ref, () => ({ togglePicker }), [totalOpened]);

    useEffect(() => {
      if (isVisible) {
        setTotalOpened(prev => prev + 1);
      } else {
        setTotalOpened(prev => Math.max(prev - 1, 0));
      }
    }, [isVisible]);

    useEffect(() => {
      if (!isPickerShown) handleCancel();
    }, [isPickerShown]);

    return (
      <SketchPickerWrapper aria-hidden={!isVisible}>
        <SketchPicker
          width='initial'
          onChangeComplete={handleChange}
          color={colors[colorKey]}
          disableAlpha
        />
        <ActionWrapper>
          <ActionButton
            $bg={theme.color.red.t60}
            onClick={handleCancel}
          >
            Cancel
          </ActionButton>
          <ActionButton onClick={handleSave}>Save</ActionButton>
        </ActionWrapper>
      </SketchPickerWrapper>
    );
  },
);

const ColorPickerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 0.75rem 0rem;
  position: relative;
  transition: inherit;
  transition-property: opacity;
  opacity: 1;

  &[aria-hidden='true'] {
    opacity: 0;
  }
`;

const PickerWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.75rem;
  border-radius: 0.5rem;
  background-color: ${colorVars.primary};
  box-shadow: ${props => props.theme.shadow.medium};
`;

const ColorButton = styled(Button)`
  border-radius: 50% !important;
  width: 1.25rem !important;
  min-height: 1.25rem !important;
  border: 1px solid ${colorVars.white} !important;
`;

const Label = styled.label`
  font-size: 0.875rem;
  line-height: 1.3em;
  margin: 0rem 0.5rem;
  color: ${colorVars.white};
`;

const ColorPicker = memo<ColorPickerProps>(({ colorKey, label }) => {
  const pickerRef = createRef<PickerHandler>();
  const buttonId = `color-picker-btn__${colorKey}`;
  const labelId = `color-picker-label__${colorKey}`;

  const { isPickerShown } = useAppState();

  const handleClickColor = useCallback(() => {
    if (pickerRef.current) pickerRef.current.togglePicker();
  }, [pickerRef]);

  return (
    <ColorPickerWrapper aria-hidden={!isPickerShown}>
      <PickerWrapper>
        <ColorButton
          $bg={colorVars[colorKey]}
          onClick={handleClickColor}
          id={buttonId}
          aria-labelledby={labelId}
        />
        <Label id={labelId} htmlFor={buttonId}>
          {label}
        </Label>
      </PickerWrapper>
      <Picker ref={pickerRef} colorKey={colorKey} />
    </ColorPickerWrapper>
  );
});

export default ColorPicker;
