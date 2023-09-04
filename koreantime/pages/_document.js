import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
    return (
        <Html>
            <Head />
            <body>
                <Main />
                <NextScript />
                <script
                    type="text/javascript"
                    src="http://dapi.kakao.com/v2/maps/sdk.js?appkey=%REACT_APP_KAKAO_MAPS_JS_KEY%&autoload=false"
                ></script>
            </body>
        </Html>
    );
}
