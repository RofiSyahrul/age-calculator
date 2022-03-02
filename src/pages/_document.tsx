import React from 'react';

import type {
  DocumentContext,
  DocumentInitialProps,
} from 'next/document';
import NextDocument, {
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class Document extends NextDocument {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const orginalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () => {
        return orginalRenderPage({
          enhanceApp: App => props =>
            sheet.collectStyles(<App {...props} />),
        });
      };
      const initialProps = await NextDocument.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang='en'>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
