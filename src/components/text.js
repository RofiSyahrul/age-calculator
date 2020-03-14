import styled from 'styled-components';
import { colors } from 'src/utils/constants';

const Text = styled.p`
  text-align: ${({ align = 'left' }) => align};
  color: ${({ color = colors.secondary }) => color};
  font-size: ${({ size = '16px' }) => size};
  font-family: ${({ fontFamily = "'Source Sans Pro'" }) =>
    fontFamily};
  font-weight: ${({ weight = 'normal' }) =>
    weight === 'bold' ? '900' : '400'};
  font-style: ${({ fontStyle = 'normal' }) => fontStyle};
  margin: ${({ margin = '0' }) => margin};
  line-height: ${({ lineHeight = '1.3em' }) => lineHeight};
  width: ${({ width }) => width || null};
  z-index: ${({ zIndex }) => zIndex || null};
`;

export default Text;
