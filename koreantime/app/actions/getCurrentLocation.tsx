import { useState, useEffect } from "react";

interface locationType {
    loaded: boolean;
    coordinates: { lat: number; lng: number };
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

export default getCurrentLocation;

// import { useState, useEffect, useRef } from "react";

// type latlng = {
//     latitude: number;
//     longitude: number;
// };

// const getCurrentLocation = (options = {}) => {
//     // 내 위치 정보 저장
//     const [location, setLocation] = useState<latlng>({
//         latitude: 0,
//         longitude: 0,
//     });
//     // 에러 메세지 저장
//     const [error, setError] = useState({ message: "" });
//     // watch 인스턴스를 취소할 수 있도록 Geolocation의 `watchPosition`에서 반환된 ID를 저장합니다.
//     const locationWatchId = useRef(0);

//     // Geolocation의 `watchPosition` 메소드에 대한 성공 callback 핸들러
//     const handleSuccess = (pos: {
//         coords: { latitude: number; longitude: number };
//     }) => {
//         const { latitude, longitude } = pos.coords;

//         setLocation({
//             latitude,
//             longitude,
//         });
//     };

//     // Geolocation의 `watchPosition` 메소드에 대한 실패 callback 핸들러
//     const handleError = (error: any) => {
//         setError(error);
//     };

//     // 저장된 `watchPosition` ID를 기반으로 감시 인스턴스를 지웁니다.
//     const cancelLocationWatch = () => {
//         const { geolocation } = navigator;

//         if (locationWatchId.current && geolocation) {
//             geolocation.clearWatch(locationWatchId.current);
//         }
//     };

//     useEffect(() => {
//         const { geolocation } = navigator;

//         // 사용된 브라우저에서 지리적 위치(Geolocation)가 정의되지 않은 경우 오류로 처리합니다.
//         if (!geolocation) {
//             setError({ message: "위치를 찾지 못했습니다." });
//             return;
//         }

//         // Geolocation API로 위치 감시 시작
//         locationWatchId.current = geolocation.watchPosition(
//             handleSuccess,
//             handleError,
//             options
//         );

//         // React가 사용된 구성 요소를 마운트 해제할 때 위치 감시 인스턴스를 지웁니다.
//         return cancelLocationWatch;
//     }, [options]);

//     return { location, cancelLocationWatch, error };
// };

// export default getCurrentLocation;

// const geolocationOptions = {
//     enableHighAccuracy: true,
//     timeout: 1000 * 60 * 1, // 1 min (1000 ms * 60 sec * 1 minute = 60 000ms)
//     maximumAge: 1000 * 3600 * 24, // 24 hour
// };

// export const userLatLng = () => {
//     const { location, cancelLocationWatch, error } =
//         getCurrentLocation(geolocationOptions);
//     useEffect(() => {
//         if (!location) return;

//         // 3초후에 watch 종료
//         setTimeout(() => {
//             cancelLocationWatch();
//         }, 30000);
//     }, []);

//     return [location.latitude, location.longitude];
// };
