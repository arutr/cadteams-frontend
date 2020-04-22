import React from 'react';
import Document, {
  Html, Head, Main, NextScript,
} from 'next/document';

export default class extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en-GB">
        <Head>
          <meta name="viewport" content="width=device-width, viewport-fit=cover, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
          <meta name="description" content="A platform for CAD and BIM specialists to showcase their best building designs." />
          <meta name="author" content="CADteams" />
          <meta property="og:url" content="https://cadteams.com/" />
          <meta property="og:site_name" content="CADteams" />
          <meta property="og:title" content="Showcase best building designs" />
          <meta property="og:description" content="A platform for CAD and BIM specialists to showcase their best building designs." />
          <meta property="og:type" content="website" />
          <meta property="og:locale" content="en_GB" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:title" content="CADteams" />
          <meta name="twitter:description" content="A platform for CAD and BIM specialists to showcase their best building designs." />
          <meta name="twitter:image:alt" content="CADteams" />
          <meta name="theme-color" content="#fff" />
          <script async src="/hotjar.js" />
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-164283269-1" />
          <script async src="/gtag.js" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
