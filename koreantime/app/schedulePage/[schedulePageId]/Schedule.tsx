"use client";

import { scheduleProps } from "@/app/types";
import { Map, MapMarker, useKakaoLoader } from "react-kakao-maps-sdk";

export const Schedule: React.FC<scheduleProps> = ({ schedule }) => {
    const lat = Number(schedule.lat);
    const lng = Number(schedule.lng);

    console.log(schedule);
    console.log(lat);
    console.log(lng);

    if (!lat || !lng) {
        return null;
    }

    const { loading, error } = useKakaoLoader({
        appkey: `${process.env.NEXT_PUBLIC_KAKAO_MAPS_JS_KEY}`, // 발급 받은 APPKEY
        // 추가 옵션
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
                    height: "450px",
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
