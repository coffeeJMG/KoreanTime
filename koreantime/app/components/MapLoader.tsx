"use client";
declare global {
    interface Window {
        kakao: any;
    }
}
import React, { useEffect, useState } from "react";

interface MemberLocation {
    memberEmail: string;
    lat: number;
    lng: number;
    scheduleId?: string;
}

interface MapLoaderProps {
    lat: number;
    lng: number;
    height: string | undefined;
    id: string;
    membersLocation?: MemberLocation[];
    opacity?: number;
}

const MapLoader: React.FC<MapLoaderProps> = ({
    lat,
    lng,
    height,
    membersLocation,
    id,
    opacity = 0,
}) => {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (lat && lng) {
            setIsLoading(true);
        }
    }, [lat, lng]);

    useEffect(() => {
        // 카카오 맵 라이브러리 사용
        const mapScript = document.createElement("script");
        mapScript.async = true;
        mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAPS_JS_KEY}&autoload=false`;
        document.head.appendChild(mapScript);
        const onLoadKakaoMap = () => {
            window.kakao.maps.load(() => {
                // 각 지도 별 id 부여
                const mapContainer = document.getElementById(`${id}`);

                // 카카오맵 중심좌표 및 zoom 레벨
                const option = {
                    center: new window.kakao.maps.LatLng(lat, lng),
                    level: 3,
                };

                if (!mapContainer) {
                    return null;
                }

                // mapContainer, option 2가지를 인자로 map 생성
                const map = new window.kakao.maps.Map(mapContainer, option);

                // 각 유저 지도가 아닌 전체 지도
                if (membersLocation) {
                    map.setDraggable(false);
                    //줌 막기
                    map.setZoomable(false);
                    const schedulePosition = new window.kakao.maps.LatLng(
                        lat,
                        lng,
                    );

                    // 도착지의 좌표를 받아 지도에 표시
                    const scheduleMarker = new window.kakao.maps.Marker({
                        position: schedulePosition,
                    });

                    scheduleMarker.setMap(map);

                    // 도착지 관련 정보
                    const iwContent = `<div style="padding:5px">도착지</div>`,
                        iwPosition = new window.kakao.maps.LatLng(lat, lng),
                        iwRemoveable = true;

                    // marker 위 텍스트 표시
                    const infowindow = new window.kakao.maps.InfoWindow({
                        map: map,
                        position: iwPosition,
                        content: iwContent,
                        removable: iwRemoveable,
                    });

                    infowindow.open(map, scheduleMarker);

                    // 유저들의 위치를 차례대로 반환
                    membersLocation.forEach((member) => {
                        const memberPosition = new window.kakao.maps.LatLng(
                            member.lat,
                            member.lng,
                        );

                        // 유저들의 mapMarker 표시
                        const memberMarker = new window.kakao.maps.Marker({
                            position: memberPosition,
                        });

                        memberMarker.setMap(map);

                        // 유저들의 정보 반환
                        const iwContent = `<div style="padding:5px">${member.memberEmail}</div>`,
                            iwPosition = new window.kakao.maps.LatLng(lat, lng),
                            iwRemoveable = true;

                        //user 별 마커 위 정보 반환
                        const infowindow = new window.kakao.maps.InfoWindow({
                            map: map,
                            position: iwPosition,
                            content: iwContent,
                            removable: iwRemoveable,
                        });

                        infowindow.open(map, memberMarker);
                    });
                } else {
                    // 각 유저 개인의 위치 지도
                    const markerPosition = new window.kakao.maps.LatLng(
                        lat,
                        lng,
                    );
                    const marker = new window.kakao.maps.Marker({
                        position: markerPosition,
                    });
                    const iwContent = '<div style="padding:5px">현 위치</div>',
                        iwPosition = new window.kakao.maps.LatLng(lat, lng),
                        iwRemoveable = true;

                    const infowindow = new window.kakao.maps.InfoWindow({
                        map: map,
                        position: iwPosition,
                        content: iwContent,
                        removable: iwRemoveable,
                    });
                    marker.setMap(map);
                    infowindow.open(map, marker);
                }
            });
        };

        mapScript.addEventListener("load", onLoadKakaoMap, { passive: true });
        return () => {
            mapScript.removeEventListener("load", onLoadKakaoMap);
        };
    }, [id, lat, lng, membersLocation]);

    return (
        <div>
            {lat === 0 && lng === 0 ? (
                <div
                    style={{
                        width: "100%",
                        height: height,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    유저의 최초 접속이 필요합니다
                </div>
            ) : (
                <div
                    id={id}
                    style={{
                        width: "100%",
                        height: height,
                        opacity: opacity,
                    }}
                ></div>
            )}
        </div>
    );
};

export default MapLoader;
