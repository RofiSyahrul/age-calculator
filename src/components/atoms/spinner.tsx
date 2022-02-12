import type { SVGProps } from 'react';
import React, { forwardRef, memo } from 'react';

import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(360deg);
  }
`;

const circle = keyframes`
  0%, 25% {
    stroke-dashoffset: 260;
    transform: rotate(0);
  }

  50%, 75% {
    stroke-dashoffset: 80;
    transform: rotate(45deg);
  }

  100% {
    stroke-dashoffset: 260;
    transform: rotate(360deg);
  }
`;

const AnimatedSvg = styled.svg`
  color: ${props => props.theme.color.blue.t50};
  animation: ${rotate} 1.6s linear infinite;
  width: 10rem;
  height: 10rem;

  > circle {
    animation: ${circle} 1.4s linear infinite;
    width: 0.5rem;
    display: block;
    fill: transparent;
    stroke: currentColor;
    stroke-linecap: round;
    stroke-dasharray: 290;
    stroke-dashoffset: 280;
    stroke-width: 0.5rem;
    transform-origin: 50% 50%;
  }
`;

const Spinner = memo(
  forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>((props, ref) => {
    return (
      <AnimatedSvg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 100 100'
        preserveAspectRatio='xMidYMid'
        {...props}
        ref={ref}
      >
        <circle cx='50' cy='50' r='40' />
      </AnimatedSvg>
    );
  }),
);

export default Spinner;
