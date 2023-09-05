import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
    return (
        <Html>
            <Head />
            <body>
                <Main />
                <NextScript />
                <Script
                    src="//dapi.kakao.com/v2/maps/sdk.js?appkey=9b50e09b61345369e8dbd464a6a583e4&libraries=services,clusterer&autoload=false"
                    strategy="beforeInteractive"
                />
            </body>
        </Html>
    );
}
