import { useState, useEffect } from "react";

interface locationType {
    loaded: boolean;
    coordinates: { lat: number; lng: number };
    error?: { code: number; message: string };
}

const useGetCurrentLocation = () => {
    const [location, setLocation] = useState<locationType>({
        loaded: false,
        coordinates: { lat: 0, lng: 0 },
    });

    // 성공에 대한 로직
    const onSuccess = (location: {
        coords: { latitude: number; longitude: number };
    }) => {
        if (
            typeof location.coords.latitude === "number" &&
            typeof location.coords.longitude === "number"
        ) {
            setLocation({
                loaded: true,
                coordinates: {
                    lat: location.coords.latitude,
                    lng: location.coords.longitude,
                },
            });
        }
    };

    // 에러에 대한 로직
    const onError = (error: { code: number; message: string }) => {
        setLocation({
            loaded: true,
            coordinates: { lat: 0, lng: 0 }, // <-- 기본 좌표값 설정
            error,
        });
    };
    useEffect(() => {
        if (!("geolocation" in navigator)) {
            onError({
                code: 0,
                message: "현재 위치를 찾을 수 없습니다.",
            });
            return; // 위치 정보를 사용할 수 없는 경우, 이후의 코드를 실행하지 않음.
        }

        // 위치 정보를 처음 실행 후, 30초마다 위치 정보를 가져옵니다.
        const locationInterval = setInterval(() => {
            navigator.geolocation.getCurrentPosition(onSuccess, onError);
        }, 30000);

        // 초기 위치 정보를 한 번만 가져옵니다.
        navigator.geolocation.getCurrentPosition(onSuccess, onError);

        // 컴포넌트 unmount 시 타이머를 제거합니다.
        return () => clearInterval(locationInterval);
    }, []);

    return location;
};

export default useGetCurrentLocation;
