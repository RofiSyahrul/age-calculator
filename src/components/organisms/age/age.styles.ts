import styled from 'styled-components';

import colorVars from 'src/utils/color-vars';

export const AgeWrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 700px;
  opacity: 1;
  transition: inherit;
  transition-property: opacity;

  &.with-picker {
    ${props => props.theme.breakpoint.md} {
      > h1 {
        font-size: 5rem;
      }
    }

    ${props => props.theme.breakpoint.sm} {
      opacity: 0;
    }
  }
`;

export const Title = styled.h1`
  font-size: 5.5rem;
  font-weight: bold;
  line-height: 1.3em;
  color: ${colorVars.secondary};

  ${props => props.theme.breakpoint.sm} {
    font-size: 4.0625rem;
  }

  ${props => props.theme.breakpoint.xs} {
    font-size: 2.4375rem;
  }
`;

export const MajorTimeUnitWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1rem 0.5rem;
`;

export const MinorTimeUnitWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 600px;
`;
