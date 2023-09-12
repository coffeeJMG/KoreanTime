import { useEffect, useState } from "react";

export const getCurrentTime = () => {
    const [currentTime, setCurrentTime] = useState("");
    const [today, setToday] = useState("");
    const [time, setTime] = useState({
        hours: "",
        minutes: "",
        seconds: "",
    });

    useEffect(() => {
        const updateTime = () => {
            const date = new Date();
            const year = String(date.getFullYear()).padStart(2, "0");
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            const hours = String(date.getHours()).padStart(2, "0");
            const minutes = String(date.getMinutes()).padStart(2, "0");
            const seconds = String(date.getSeconds()).padStart(2, "0");

            setToday(`${month}${day}${year}`);
            setTime({ hours, minutes, seconds });

            if (Number(hours) >= 13) {
                const formattedHours = String(Number(hours) - 12).padStart(
                    2,
                    "0"
                );
                setCurrentTime(`${formattedHours}:${minutes} PM`);
            } else {
                setCurrentTime(`${hours}:${minutes} AM`);
            }
        };

        updateTime(); // 컴포넌트가 마운트될 때 한 번 호출
        const interval = setInterval(updateTime, 1000);

        return () => clearInterval(interval); // 컴포넌트가 언마운트될 때 setInterval을 지웁니다.
    }, []);

    return { today, currentTime, ...time };
};
