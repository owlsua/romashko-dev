import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="Romashko" content="Romashko - web developer" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.cdnfonts.com/css/cascadia-code"
          rel="stylesheet"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          // @ts-expect-error - crossorigin is not in the link element type
          crossOrigin={'crossorigin'}
        />
        <link
          href="https://fonts.googleapis.com/css2?family=VT323&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
