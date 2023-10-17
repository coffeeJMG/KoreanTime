import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />

                <link rel="manifest" href="/manifest.json" />
                <meta charSet={"utf-8"} />
                <meta name="theme-color" content="#000000" />
            </Head>
            <body>
                <Main />
                <NextScript
                    type="text/javascript"
                    src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAPS_JS_KEY}&libraries=services,clusterer`}
                />
            </body>
            <Main />
        </Html>
    );
}
