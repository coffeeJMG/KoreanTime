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
    height: string;
    id: string;
    membersLocation?: MemberLocation[];
}

const MapLoader: React.FC<MapLoaderProps> = ({
    lat,
    lng,
    height,
    membersLocation,
    id,
}) => {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (lat && lng) {
            setIsLoading(true);
        }
    }, [lat, lng]);

    useEffect(() => {
        const mapScript = document.createElement("script");
        mapScript.async = true;
        mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAPS_JS_KEY}&autoload=false`;
        document.head.appendChild(mapScript);
        const onLoadKakaoMap = () => {
            window.kakao.maps.load(() => {
                const mapContainer = document.getElementById(`${id}`);
                const option = {
                    center: new window.kakao.maps.LatLng(lat, lng),
                    level: 3,
                };

                if (!mapContainer) {
                    return null;
                }
                const map = new window.kakao.maps.Map(mapContainer, option);

                if (membersLocation) {
                    const schedulePosition = new window.kakao.maps.LatLng(
                        lat,
                        lng,
                    );

                    const scheduleMarker = new window.kakao.maps.Marker({
                        position: schedulePosition,
                    });

                    scheduleMarker.setMap(map);

                    const iwContent = `<div style="padding:5px">도착지</div>`,
                        iwPosition = new window.kakao.maps.LatLng(lat, lng),
                        iwRemoveable = true;

                    const infowindow = new window.kakao.maps.InfoWindow({
                        map: map,
                        position: iwPosition,
                        content: iwContent,
                        removable: iwRemoveable,
                    });

                    infowindow.open(map, scheduleMarker);
                    membersLocation.forEach((member) => {
                        const memberPosition = new window.kakao.maps.LatLng(
                            member.lat,
                            member.lng,
                        );

                        const memberMarker = new window.kakao.maps.Marker({
                            position: memberPosition,
                        });

                        memberMarker.setMap(map);
                        const iwContent = `<div style="padding:5px">${member.memberEmail}</div>`,
                            iwPosition = new window.kakao.maps.LatLng(lat, lng),
                            iwRemoveable = true;

                        const infowindow = new window.kakao.maps.InfoWindow({
                            map: map,
                            position: iwPosition,
                            content: iwContent,
                            removable: iwRemoveable,
                        });

                        infowindow.open(map, memberMarker);
                    });
                } else {
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

        mapScript.addEventListener("load", onLoadKakaoMap);
        return () => {
            mapScript.removeEventListener("load", onLoadKakaoMap);
        };
    }, [id, lat, lng, membersLocation]);

    return (
        <div>
            <div id={id} style={{ width: "100%", height: height }}></div>
        </div>
    );
};

export default MapLoader;
