import { css } from 'styled-components';

import colorVars from 'src/utils/color-vars';

interface GlobalCssProps {
  isReady: boolean;
  colors: Colors;
}

const GlobalCss = css<GlobalCssProps>`
  ${props => css`
    :root {
      --primary: ${props.colors.primary};
      --secondary: ${props.colors.secondary};
      --background: ${props.colors.background};
      --text: ${props.colors.white};
    }
  `}

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  * {
    color: inherit;
    transition: inherit;
    font-family: ${props => props.theme.fontBase};
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
    background: ${colorVars.background};
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
