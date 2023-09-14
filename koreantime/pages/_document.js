import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html>
            <Head />
            <body>
                <Main />
                <NextScript />
                <script
                    src="//dapi.kakao.com/v2/maps/sdk.js?appkey=9b50e09b61345369e8dbd464a6a583e4&libraries=services,clusterer&autoload=false"
                    strategy="beforeInteractive"
                />
                <script
                    type="text/javascript"
                    src="https://developers.kakao.com/sdk/js/kakao.min.js"
                ></script>
            </body>
            <Main />
            <NextScript />
        </Html>
    );
}
