import React from 'react';

import { createMediaQuery } from 'goods-core';
import styled, { keyframes } from 'styled-components';

import { useAppContext } from 'src/context';

interface RunningTextProps {
  texts: string[];
}

const RunningTextWrapper = styled.div<{ $bg: string }>`
  width: 100%;
  background-color: ${props => props.$bg};
  box-shadow: ${props => props.theme.shadows?.low};
  overflow: hidden;
  padding: 0.5rem 0rem;
  margin-top: 1.5rem;
  z-index: 3;
`;

const rightToLeftScrollingAnimation = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(-100%);
  }
`;

const animationDurationPerText = 4;

const RunningTextInnerWrapper = styled.ul<{
  $totalText: number;
  $c: string;
}>`
  list-style: none;
  font-family: ${props => props.theme.fontBase};
  font-size: 0.8375rem;
  line-height: 1.0625rem;
  color: ${props => props.$c};

  display: flex;
  align-items: center;
  margin: 0rem;
  padding: 0rem;
  white-space: nowrap;
  vertical-align: middle;
  overflow: hidden;
  width: max-content;

  animation: ${rightToLeftScrollingAnimation} linear infinite;
  animation-duration: ${props =>
    props.$totalText * animationDurationPerText}s;

  ${props => createMediaQuery(props.theme.breakpoints?.lg ?? '')} {
    font-size: 1.375rem;
    line-height: 1.5rem;
  }

  > li {
    display: flex;
    align-items: center;
    &:not(:last-child)::after {
      content: '\u25CF';
      font-size: 0.75rem;
      line-height: 1rem;
      margin: 0rem 0.25rem;
    }
  }
`;

export default function RunningText({ texts }: RunningTextProps) {
  const {
    states: { colors },
  } = useAppContext();

  return (
    <RunningTextWrapper $bg={colors.primary}>
      <RunningTextInnerWrapper
        $c={colors.secondary}
        $totalText={texts.length}
      >
        {texts.map((text, index) => (
          <li key={index}>{text}</li>
        ))}
      </RunningTextInnerWrapper>
    </RunningTextWrapper>
  );
}
