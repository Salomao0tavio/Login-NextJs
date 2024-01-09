import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';

const MyDocument = () => {
    return (
        <Html>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700" rel="stylesheet" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}


MyDocument.getInitialProps = async (ctx) => {

    const sheet = new ServerStyleSheet();

    const cache = createCache();
    const originalRenderPage = ctx.renderPage;
    ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp: (App) => (props) => (
                <StyleProvider cache={cache}>
                    {sheet.collectStyles(<App {...props} />)}
                </StyleProvider>
            ),
        });

    const initialProps = await Document.getInitialProps(ctx);
    const style = extractStyle(cache, true);
    return {
        ...initialProps,
        styles: (
            <>
                {initialProps.styles}
                {sheet.getStyleElement()}
                <style dangerouslySetInnerHTML={{ __html: style }} />
            </>
        ),
    }
}

export default MyDocument;