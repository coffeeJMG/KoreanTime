"use client";

import {
    Map,
    MapInfoWindow,
    MapMarker,
    useKakaoLoader,
} from "react-kakao-maps-sdk";

interface MemberLocation {
    memberEmail: string;
    lat: number;
    lng: number;
    scheduleId?: string;
}

interface MapLoaderProps {
    lat?: number;
    lng?: number;
    height: string;
    membersLocation?: MemberLocation[];
}

const MapLoader: React.FC<MapLoaderProps> = ({
    lat,
    lng,
    height,
    membersLocation,
}) => {
    if (typeof lat !== "number" || typeof lng !== "number") {
        alert("위치를 찾을 수 없습니다.");
    }

    useKakaoLoader({
        appkey: `${process.env.NEXT_PUBLIC_KAKAO_MAPS_JS_KEY}`,
    });

    return (
        <Map
            center={{
                lat: lat || (membersLocation && membersLocation[0]?.lat) || 0,
                lng: lng || (membersLocation && membersLocation[0]?.lng) || 0,
            }}
            style={{
                width: "100%",
                height: height,
            }}
            level={3}
        >
            {membersLocation ? (
                membersLocation.map((member, index) => (
                    <div key={index}>
                        <MapMarker
                            position={{ lat: member.lat, lng: member.lng }}
                        >
                            <div style={{ padding: "5px", color: "#000" }}>
                                {member.memberEmail}
                            </div>
                        </MapMarker>
                    </div>
                ))
            ) : (
                <MapMarker position={{ lat: lat!, lng: lng! }} />
            )}
        </Map>
    );
};

export default MapLoader;
