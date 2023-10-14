// 위도,경도 값으로 거리 구하는 함수

export default function getUserDistance(
    scheduleLat: number,
    scheduleLng: number,
    userLat: number,
    userLng: number,
) {
    const startLatRads = degreesToRadians(scheduleLat);
    const startLongRads = degreesToRadians(scheduleLng);
    const destLatRads = degreesToRadians(userLat);
    const destLongRads = degreesToRadians(userLng);

    const RADIUS = 6371; //지구의 반경(km)
    const distance =
        Math.acos(
            Math.min(
                Math.max(
                    Math.sin(startLatRads) * Math.sin(destLatRads) +
                        Math.cos(startLatRads) *
                            Math.cos(destLatRads) *
                            Math.cos(startLongRads - destLongRads),
                    -1,
                ),
                1,
            ),
        ) * RADIUS;

    return distance;
}
function degreesToRadians(degrees: number) {
    const radians = (degrees * Math.PI) / 180;
    return radians;
}
