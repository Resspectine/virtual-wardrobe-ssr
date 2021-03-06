import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  override render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css?family=Montserrat:400,300,500,600&display=swap"
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
}

export default MyDocument;
