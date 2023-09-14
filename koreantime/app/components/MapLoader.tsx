"use client";

import { Map, MapMarker, useKakaoLoader } from "react-kakao-maps-sdk";

interface MapLoaderProps {
    lat: number;
    lng: number;
    height: string;
}

const MapLoader: React.FC<MapLoaderProps> = ({ lat, lng, height }) => {
    // 카카오 지도 api
    useKakaoLoader({
        appkey: `${process.env.NEXT_PUBLIC_KAKAO_MAPS_JS_KEY}`,
    });
    return (
        <>
            <Map // 지도를 표시할 Container
                center={{
                    // 지도의 중심좌표
                    lat: lat,
                    lng: lng,
                }}
                style={{
                    // 지도의 크기
                    width: "100%",
                    height: height,
                }}
                level={3} // 지도의 확대 레벨
            >
                <MapMarker // 마커를 생성합니다
                    position={{
                        // 마커가 표시될 위치입니다
                        lat: lat,
                        lng: lng,
                    }}
                />
            </Map>
        </>
    );
};

export default MapLoader;
