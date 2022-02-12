import React, { forwardRef } from 'react';

import styled, { css } from 'styled-components';

import classnames from 'src/utils/classnames';

import type {
  ColoredPathProps,
  IconRotate,
  IconSize,
  SvgIconProps,
  SvgProps,
} from './_types';

const iconSizeMapping: Record<IconSize, string> = {
  small: '1rem',
  medium: '1.5rem',
  large: '2rem',
};

const iconRotateMapping: Record<IconRotate, number> = {
  up: 0,
  right: 90,
  down: 180,
  left: 270,
};

const Svg = styled.svg<SvgProps>`
  ${({ $rotate, $size }) => {
    let size = iconSizeMapping.medium;
    if (typeof $size === 'number') {
      size = `${$size}px`;
    } else if ($size) {
      size = iconSizeMapping[$size];
    }

    let transform = '';
    if (typeof $rotate === 'number') {
      transform = `rotate(${$rotate}deg)`;
    } else if ($rotate) {
      transform = `rotate(${iconRotateMapping[$rotate]}deg)`;
    }

    return css`
      width: ${size};
      height: ${size};
      transform: ${transform};
    `;
  }}
`;

export const SvgIcon = forwardRef<SVGSVGElement, SvgIconProps>(
  ({ children, className, rotate, size, ...props }, ref) => {
    return (
      <Svg
        xmlns='http://www.w3.org/2000/svg'
        xmlnsXlink='http://www.w3.org/1999/xlink'
        className={className}
        $rotate={rotate}
        $size={size}
        {...props}
        ref={ref}
      >
        {children}
      </Svg>
    );
  },
);

const StyledColoredPath = styled.path<{ $color?: string }>`
  fill: ${props => props.$color || props.theme.color.blue.t50};
`;

export function ColoredPath({
  className,
  color,
  ...props
}: ColoredPathProps) {
  return (
    <StyledColoredPath
      className={classnames('colored-path', className)}
      $color={color}
      {...props}
    />
  );
}
