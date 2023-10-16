export const getCurrentTime = () => {
    const date = new Date();
    const year = String(date.getFullYear()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    const today = `${month}${day}${year}`; // 오늘 날짜

    const comparisonToday = `${year}${month}${day}`; // 모임날짜와 비교를 위한 변수

    let currentTime; // 렌더링을 위한 현재시간 변수
    const comparisonTime = `${hours}${minutes}`; // 계산을 위한 현재시간 변수

    if (Number(hours) >= 13) {
        const formattedHours = String(Number(hours) - 12).padStart(2, "0");
        currentTime = `${formattedHours}:${minutes} PM`; // 12시~23시 PM 표기
    } else {
        currentTime = `${hours}:${minutes} AM`; // 00시~11시 AM 표기
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

// 모임 생성 및 수정시 오늘 이후의 날짜예약을 위한 변수

export const isPossibleDate = (time: Date) => {
    const { comparisonToday, comparisonTime } = getCurrentTime();
    const year = time.getFullYear();
    const month = String(time.getMonth() + 1).padStart(2, "0");
    const day = String(time.getDate()).padStart(2, "0");
    const hours = String(time.getHours()).padStart(2, "0");
    const minutes = String(time.getMinutes()).padStart(2, "0");

    const timeDate = `${year}${month}${day}`;
    const timeValue = `${hours}${minutes}`;

    if (timeDate === comparisonToday) {
        return timeValue >= comparisonTime;
    }

    return true;
};
