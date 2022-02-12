import React, { memo, useMemo } from 'react';

import styled from 'styled-components';

import { useAppContext } from 'src/context';
import classnames from 'src/utils/classnames';
import colorVars from 'src/utils/color-vars';

interface TimeUnitProps {
  value?: number;
  unit?: AgeKey | '';
}

const TimeUnitWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-top: 100%;
  position: relative;

  &.with-picker {
    ${props => props.theme.breakpoint.md} {
      span.circle-text {
        font-size: 3.25rem;
      }
      span.unit-label {
        font-size: 1.5rem;
      }
    }
  }
`;

const Circle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 75%;
  width: 75%;
  border-radius: 50%;
  padding: 0.25rem;
  background-color: ${colorVars.primary};
  box-shadow: ${props => props.theme.shadow.high};
  position: absolute;
  top: 0rem;
  left: 50%;
  transform: translateX(-50%);
`;

const CircleText = styled.span`
  font-size: 4.6875rem;
  line-height: 1.3em;
  font-weight: bold;
  text-align: center;
  color: ${colorVars.secondary};

  ${props => props.theme.breakpoint.sm} {
    font-size: 2.8125rem;
  }

  ${props => props.theme.breakpoint.xs} {
    font-size: 1.875rem;
  }
`;

const UnitLabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: absolute;
  bottom: 0rem;
  left: 0rem;
  height: 25%;
`;

const UnitLabel = styled.span`
  font-size: 1.875rem;
  text-align: center;
  line-height: 1.3em;
  color: ${colorVars.secondary};
  margin-top: 0.25rem;

  ${props => props.theme.breakpoint.sm} {
    font-size: 1.125rem;
  }

  ${props => props.theme.breakpoint.xs} {
    font-size: 0.75rem;
  }
`;

const TimeUnit = memo<TimeUnitProps>(({ value = 0, unit = '' }) => {
  const {
    states: { isPickerShown },
  } = useAppContext();

  const label = useMemo(
    () =>
      `${value > 1 ? `${unit}s` : unit}`.replace(/^\S/g, match =>
        match.toUpperCase(),
      ),
    [value, unit],
  );

  const className = useMemo(() => {
    return classnames('time-unit', { 'with-picker': isPickerShown });
  }, [isPickerShown]);

  return (
    <TimeUnitWrapper className={className}>
      <Circle>
        <CircleText className='circle-text'>
          {Number.isNaN(value) ? '-' : value}
        </CircleText>
      </Circle>
      <UnitLabelWrapper>
        <UnitLabel className='unit-label'>{label}</UnitLabel>
      </UnitLabelWrapper>
    </TimeUnitWrapper>
  );
});

export default TimeUnit;
