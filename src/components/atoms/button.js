import styled from 'styled-components';

const Button = styled.button`
  display: ${({ display = 'flex' }) => display};
  align-self: ${({ alignSelf }) => alignSelf || null};
  align-items: ${({ align = 'center' }) => align};
  justify-content: ${({ justify = 'center' }) => justify};
  flex-direction: ${({ direction = 'column' }) => direction};
  width: ${({ width }) => width || null};
  height: ${({ height }) => height || null};
  max-height: ${({ maxHeight }) => maxHeight || null};
  box-sizing: ${({ boxSizing }) => boxSizing || null};
  background: ${({ background }) => background || 'transparent'};
  overflow-y: ${({ overflowY }) => overflowY || null};
  overflow-x: ${({ overflowX }) => overflowX || null};
  position: ${({ position = 'static' }) => position};
  top: ${({ top }) => top || null};
  right: ${({ right }) => right || null};
  bottom: ${({ bottom }) => bottom || null};
  left: ${({ left }) => left || null};
  z-index: ${({ zIndex }) => zIndex || null};
  margin: ${({ margin }) => margin || null};
  padding: ${({ padding }) => padding || null};
  border: ${({ border }) => border || null};
  border-radius: ${({ radius = '0' }) => radius};
  box-shadow: ${({ shadow }) => shadow || 'none'};
  color: ${({ color }) => color || 'black'};
  font-size: ${({ size = '16px' }) => size};
  font-family: ${({ fontFamily = "'Source Sans Pro'" }) =>
    fontFamily};
  font-weight: ${({ weight = 'normal' }) =>
    weight === 'bold' ? '900' : '400'};
  font-style: ${({ fontStyle = 'normal' }) => fontStyle};
  line-height: ${({ lineHeight = '1.3em' }) => lineHeight};
  cursor: pointer;

  &:hover {
    filter: brightness(0.8);
  }

  &:disabled {
    cursor: not-allowed;
    background: ${({ disabledBackground }) =>
      disabledBackground || 'grey'};
  }
`;

export default Button;
