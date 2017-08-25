import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import { getContext, setContext } from '../styles/context';

/* eslint-disable react/react-in-jsx-scope, jsx-a11y/html-has-lang, react/no-danger */
export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    // Reset the context for handling a new request.
    setContext();
    const page = ctx.renderPage();
    // Get the context with the collected side effects.
    const context = getContext();
    return {
      ...page,
      styles: <style id="jss-server-side" dangerouslySetInnerHTML={{ __html: context.sheetsRegistry.toString() }} />,
    };
  }

  render() {
    const sheet = new ServerStyleSheet();
    const main = sheet.collectStyles(<Main />);
    const styleTags = sheet.getStyleElement();
    return (
      <html lang="en">
        <Head>
          <meta charSet="utf-8" />
          {/* Use minimum-scale=1 to enable GPU rasterization */}
          <meta
            name="viewport"
            content={
              'initial-scale=1, maximum-scale=1, ' +
              'minimum-scale=1, width=device-width, height=device-height'
            }
          />
          {/* PWA primary color */}
          <meta content="IE=edge" httpEquiv="" />
          <base href="/" />
          <link href="/static/favicon.png" rel="shortcut icon" type="image/x-icon" />
          <meta content="yes" name="mobile-web-app-capable" />
          <meta content="#ed7622" name="theme-color" />
          <meta content="Xcidic" name="apple-mobile-web-app-title" />
          <meta content="black" name="apple-mobile-web-app-status-bar-style" />
          <meta content="#ed7622" name="msapplication-navbutton-color" />
          <meta property="fb:app_id" content="114410789213723" />
          <link href="/static/manifest.json" rel="manifest" />
          <style
            dangerouslySetInnerHTML={{ __html: `
              @font-face {
                font-family: 'Gotham';
                src: url('/static/resources/fonts/gotham-bold.ttf') format('truetype');
                font-weight: 700;
                font-style: normal;
              }

              @font-face {
                font-family: 'Gotham';
                src: url('/static/resources/fonts/gotham-medium.ttf') format('truetype');
                font-weight: 500;
                font-style: normal;
              }

              @font-face {
                font-family: 'Gotham';
                src: url('/static/resources/fonts/gothamHTF-book.woff') format('woff');
                font-weight: 400;
                font-style: normal;
              }
          ` }}
          />
          {styleTags}
        </Head>
        <body>
          <div className="root">
            {main}
          </div>
          <NextScript />
        </body>
      </html>
    );
  }
}
