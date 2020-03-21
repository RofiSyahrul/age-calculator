import styled from 'styled-components';

const Wrapper = styled.div`
  display: ${({ display = 'flex' }) => display};
  align-self: ${({ alignSelf }) => alignSelf || null};
  align-items: ${({ align = 'center' }) => align};
  justify-content: ${({ justify = 'center' }) => justify};
  flex-direction: ${({ direction = 'column' }) => direction};
  flex-wrap: ${({ wrap }) => wrap || null};
  width: ${({ width }) => width || null};
  height: ${({ height }) => height || null};
  max-height: ${({ maxHeight }) => maxHeight || null};
  box-sizing: ${({ boxSizing }) => boxSizing || null};
  background-color: ${({ background }) => background || null};
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
  box-shadow: ${({ shadow }) => shadow || null};
  animation: ${({ animation }) => animation || null};
  transform: ${({ transform }) => transform || null};
  transition: ${({ transition }) => transition || null};
`;

export default Wrapper;
