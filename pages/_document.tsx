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
          <meta name="viewport" content="width=device-width, viewport-fit=cover, initial-scale=1.0" />
          <meta name="description" content="BIM/CAD talent marketplace optimized for remote workflows" />
          <meta name="keywords" content="bim jobs, cad jobs, bim modeler jobs, bim manager jobs, bim coordinator jobs" />
          <meta name="author" content="CADteams" />
          <meta property="og:url" content="https://cadteams.com/" />
          <meta property="og:site_name" content="CADteams" />
          <meta property="og:description" content="BIM/CAD talent marketplace optimized for remote workflows" />
          <meta property="og:type" content="website" />
          <meta property="og:locale" content="en_GB" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:title" content="CADteams" />
          <meta name="twitter:description" content="BIM/CAD talent marketplace optimized for remote workflows" />
          <meta name="twitter:image:alt" content="CADteams" />
          <meta name="theme-color" content="#fff" />
          <script async defer src="/hotjar.js" />
          <script async defer src="https://www.googletagmanager.com/gtag/js?id=UA-164283269-1" />
          <script async defer src="/gtag.js" />
          <script
            data-cookie-notice={`{
              "learnMoreLinkEnabled": true,
              "learnMoreLinkHref": "https://www.cookiepolicygenerator.com/live.php?token=f4fTQvPPdUy8KwCfathBsjZZF5YfrKsv",
              "buttonBgColor": "#dfdede",
              "buttonTextColor": "#000",
              "noticeBgColor": "#1b5faa",
              "linkColor": "#fcf6f5",
              "linkTarget": "_blank"
            }`}
            src="/cookie.notice.min.js"
          />
          <script async defer src="/cookie.js" />
          <script id="hs-script-loader" async defer src="//js.hs-scripts.com/6921417.js" />
          <script async defer src="/pixel.js" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
