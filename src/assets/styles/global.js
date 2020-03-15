import { css } from 'styled-components';
import { colors } from 'src/utils/constants';
import SourceSansProBold from '../fonts/source-sans-pro-v13-latin-900.woff';
import SourceSansProBold2 from '../fonts/source-sans-pro-v13-latin-900.woff2';
import SourceSansProBoldItalic from '../fonts/source-sans-pro-v13-latin-900italic.woff';
import SourceSansProBoldItalic2 from '../fonts/source-sans-pro-v13-latin-900italic.woff2';
import SourceSansProRegular from '../fonts/source-sans-pro-v13-latin-regular.woff';
import SourceSansProRegular2 from '../fonts/source-sans-pro-v13-latin-regular.woff2';
import SourceSansProItalic from '../fonts/source-sans-pro-v13-latin-italic.woff';
import SourceSansProItalic2 from '../fonts/source-sans-pro-v13-latin-italic.woff2';

const GlobalCss = css`
  @font-face {
    font-family: 'Source Sans Pro';
    font-style: normal;
    font-weight: 400;
    src: url(${SourceSansProRegular2}) format('woff2');
    src: url(${SourceSansProRegular}) format('woff');
  }
  @font-face {
    font-family: 'Source Sans Pro';
    font-style: italic;
    font-weight: 400;
    src: url(${SourceSansProItalic2}) format('woff2');
    src: url(${SourceSansProItalic}) format('woff');
  }
  @font-face {
    font-family: 'Source Sans Pro';
    font-style: normal;
    font-weight: 900;
    src: url(${SourceSansProBold2}) format('woff2');
    src: url(${SourceSansProBold}) format('woff');
  }
  @font-face {
    font-family: 'Source Sans Pro';
    font-style: italic;
    font-weight: 900;
    src: url(${SourceSansProBoldItalic2}) format('woff2');
    src: url(${SourceSansProBoldItalic}) format('woff');
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  * {
    color: inherit;
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
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: ${colors.background};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: 'Source Sans Pro';
  }
  body ::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 0;
    height: 0;
  }
`;

export default GlobalCss;
