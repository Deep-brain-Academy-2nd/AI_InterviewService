import Document, { Head, Main, NextScript } from 'next/document';
import React from 'react';
import { ServerStyleSheets } from "@material-ui/styles";

interface IProps {
  styleTags: Array<React.ReactElement<{}>>;
}

export default class MyDocument extends Document<IProps> {
  static async getInitialProps(ctx) {

    const sheets = new ServerStyleSheets();
        const originalRenderPage = ctx.renderPage;

        ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp: App => props => sheets.collect(<App {...props} />),
        });

        const initialProps = await Document.getInitialProps(ctx);

        return {
            ...initialProps,
            
            // Styles fragment is rendered after the app and page rendering finish.
            styles: (
                <React.Fragment>
                    {sheets.getStyleElement()}
                </React.Fragment>
            ),
        };
  }

  render() {
    return (
      <html>
        <Head>
          <title>AI Interview Service</title>
        </Head>
        <body>
          <Main/>
          <NextScript />
        </body>
      </html>
    );
  }
}