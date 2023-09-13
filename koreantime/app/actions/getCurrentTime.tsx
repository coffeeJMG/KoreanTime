export const getCurrentTime = () => {
    const date = new Date();
    const year = String(date.getFullYear()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    const today = `${month}${day}${year}`; // 오늘 날짜
    const comparisonToday = `${year}${month}${day}`;

    let currentTime; // 렌더링을 위한 현재시간 변수
    let comparisonTime = `${hours}${minutes}`; // 계산을 위한 현재시간 변수

    if (Number(hours) >= 13) {
        const formattedHours = String(Number(hours) - 12).padStart(2, "0");
        currentTime = `${formattedHours}:${minutes} PM`;
    } else {
        currentTime = `${hours}:${minutes} AM`;
    }

    return {
        today,
        currentTime,
        hours,
        minutes,
        seconds,
        comparisonTime,
        comparisonToday,
    };
};
