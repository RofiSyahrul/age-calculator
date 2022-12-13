import type { FC } from 'react';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import type {
  DefaultTheme,
  ThemeProviderProps,
} from 'styled-components';
import { ThemeProvider as ThemeProviderBase } from 'styled-components';

import Footer from '@molecules/footer';
import GlobalStyle from 'src/assets/styles';
import theme from 'src/assets/theme';
import { manifest } from 'src/config';
import singleLineNoSpace from 'src/utils/single-line-no-space';

const { description, name, theme_color: themeColor } = manifest;
const favicon = '/rho-pi.ico';
const imageURL = singleLineNoSpace`https://res.cloudinary.com/rofi
  /image/upload/v1640233522/samples/rho-pi.png`;
const title = IS_EXTENSION ? 'New Tab' : 'Calculate your age';

const ThemeProvider = ThemeProviderBase as unknown as FC<
  ThemeProviderProps<DefaultTheme>
>;

function AppHeadContent() {
  return (
    <Head>
      <meta charSet='utf-8' />
      <meta httpEquiv='x-UA-Compatible' content='ie=edge' />
      <link rel='shortcut icon' href={favicon} />
      <link rel='manifest' href='/manifest.json' />
      <link key='canonical' rel='canonical' href={APP_URL} />
      <title>{title}</title>

      <base href='/' />
      <link rel='apple-touch-icon' href={favicon} />

      <meta name='og:type' property='og:type' content='website' />
      <meta name='og:title' property='og:title' content={title} />
      <meta name='og:image' property='og:image' content={imageURL} />
      <meta name='og:url' property='og:url' content={APP_URL} />
      <meta
        name='og:description'
        property='og:description'
        content={description}
      />

      <meta
        name='viewport'
        content='width=device-width, initial-scale=1.0, maximum-scale=5.0'
      />
      <meta name='description' content={description} />
      <meta name='author' content='Rofi' />
      <meta name='image' content={imageURL} />
      <meta
        name='keywords'
        content='chrome, extension, chrome extension, age calculator, calculate your age'
      />
      <meta name='mobile-web-app-capable' content='yes' />
      <meta name='apple-mobile-web-app-capable' content='yes' />
      <meta name='apple-mobile-web-app-title' content={name} />
      <meta
        name='apple-mobile-web-app-status-bar-style'
        content='black-translucent'
      />
      <meta name='apple-touch-icon' content={favicon} />
      <meta name='application-name' content={name} />
      <meta name='theme-color' content={themeColor} />
      <meta name='msapplication-TileColor' content={themeColor} />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={imageURL} />
      <meta name='twitter:creator' content='@RofiSyahrul' />
      <meta name='twitter:dnt' content='on' />
      <meta name='twitter:card' content='summary_large_image' />
      {!IS_EXTENSION && (
        <meta
          name='google-site-verification'
          content='NUXK5NcVGFp_nAVVgvjMZYHSC2ZvTsva-XCCzJ85hvA'
        />
      )}
    </Head>
  );
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <AppHeadContent />
      <GlobalStyle />
      <Component {...pageProps} />
      <Footer />
    </ThemeProvider>
  );
}
