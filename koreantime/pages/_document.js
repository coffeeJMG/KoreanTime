import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html>
            <Head />
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
