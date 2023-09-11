import { useState, useEffect } from "react";

interface locationType {
    loaded: boolean;
    coordinates?: { lat: number; lng: number };
    error?: { code: number; message: string };
}

const getCurrentLocation = () => {
    const [location, setLocation] = useState<locationType>({
        loaded: false,
        coordinates: { lat: 0, lng: 0 },
    });

    // 성공에 대한 로직
    const onSuccess = (location: {
        coords: { latitude: number; longitude: number };
    }) => {
        setLocation({
            loaded: true,
            coordinates: {
                lat: location.coords.latitude,
                lng: location.coords.longitude,
            },
        });
    };

    // 에러에 대한 로직
    const onError = (error: { code: number; message: string }) => {
        setLocation({
            loaded: true,
            error,
        });
    };

    useEffect(() => {
        // navigator 객체 안에 geolocation이 없다면
        // 위치 정보가 없는 것.
        if (!("geolocation" in navigator)) {
            onError({
                code: 0,
                message: "현재 위치를 찾을 수 없습니다.",
            });
        }
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }, []);

    return location;
};

export default getCurrentLocation;
