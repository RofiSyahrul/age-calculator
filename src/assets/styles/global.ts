import { css } from 'styled-components';
import { colors, pickersWidth } from 'src/utils/constants';

interface GlobalCssProps {
  background: string;
  btnColor: string;
  isReady: boolean;
}

const GlobalCss = css<GlobalCssProps>`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  * {
    color: inherit;
    transition: inherit;
    font-family: ${({ theme }) => {
      return theme.fontBase;
    }};
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  p {
    margin: 0;
    color: inherit;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  body {
    margin: 0px;
    padding: 0px auto;
    width: 100vw;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: ${({ background }) => {
      return background || colors.background;
    }};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: 'Source Sans Pro';
  }

  #index {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    transition-property: width, padding;
    transition-duration: 400ms;
    transition-timing-function: ease-in;
    ${({ isReady }) => {
      if (isReady) {
        return css`
          align-items: flex-end;
        `;
      }
      return css`
        align-items: center;
        min-height: calc(100vh - 80px);
      `;
    }}
  }

  .setting-btn {
    transition: inherit;
    transition-property: transform, opacity;
    &.hidden {
      transform: translateX(min(${pickersWidth}, 100vw))
        translateX(-100%) translateX(-32px);
      opacity: 0;
      z-index: 0;
      pointer-events: none;
    }
    svg {
      fill: ${({ btnColor }) => {
        return btnColor || colors.secondary;
      }};
    }
  }

  @media (max-width: 649.95px) {
    .time-unit,
    footer,
    main {
      &.with-picker {
        span,
        h1 {
          transform: scale(0.8);
        }
      }
      span,
      h1 {
        transition-property: transform;
      }
    }
  }

  @media (max-width: 599.95px) {
    .time-unit,
    footer,
    main {
      &.with-picker {
        span,
        h1 {
          transform: scale(0.65);
        }
      }
    }
  }

  @media (max-width: 549.95px) {
    .time-unit,
    footer,
    main {
      &.with-picker {
        span,
        h1 {
          transform: scale(0.5);
        }
      }
    }
  }
`;

export default GlobalCss;
