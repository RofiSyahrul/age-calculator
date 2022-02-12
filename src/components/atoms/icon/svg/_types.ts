import type { ReactNode, SVGProps } from 'react';

export type IconSize = 'small' | 'medium' | 'large';

export type IconRotate = 'up' | 'right' | 'down' | 'left';

export interface SvgProps {
  $rotate?: IconRotate | number;
  $size?: IconSize | number;
}

export interface IconProps
  extends Omit<SVGProps<SVGSVGElement>, 'rotate' | 'ref'> {
  className?: string;
  rotate?: IconRotate | number;
  size?: IconSize | number;
  color?: string;
}

export interface SvgIconProps extends Omit<IconProps, 'color'> {
  children: ReactNode;
}

export interface ColoredPathProps
  extends Omit<SVGProps<SVGPathElement>, 'ref'> {
  color?: string;
}
