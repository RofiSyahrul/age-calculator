import React, { forwardRef } from 'react';

import singleLine from 'src/utils/single-line';

import { ColoredPath, SvgIcon } from './_base';
import type { IconProps } from './_types';

export const CloseIcon = forwardRef<SVGSVGElement, IconProps>(
  ({ color, ...props }, ref) => {
    return (
      <SvgIcon viewBox='0 0 32 32' {...props} ref={ref}>
        <g fill='none'>
          <path fill='none' d='M0 0H32V32H0z' />
          <ColoredPath
            color={color}
            d={singleLine`M24 8c.187.186.292.44.292.703 0
            .264-.105.517-.292.704l-5.893 5.926c-.387.392-.387 1.022
            0 1.414L24 22.6c.299.398.259.955-.093
            1.307s-.909.392-1.307.093l-5.893-5.893c-.392-.387-1.022-.387-1.414
            0L9.4 24c-.331.442-.958.531-1.4.2-.442-.331-.531-.958-.2-1.4.06-.073.127-.14.2-.2l5.893-5.893c.387-.392.387-1.022
            0-1.414L8 9.4c-.442-.331-.531-.958-.2-1.4.331-.442.958-.531 1.4-.2.073.06.14.127.2.2l5.893 5.893c.392.387 1.022.387
            1.414 0L22.6 8c.185-.186.437-.291.7-.291.263 0 .515.105.7.291z`}
          />
        </g>
      </SvgIcon>
    );
  },
);
