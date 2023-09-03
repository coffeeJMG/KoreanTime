"use client";

import { useNewSchedule } from "../hooks/useScheduleModal";

const StartPage = () => {
    const newSchedule = useNewSchedule();
    return (
        <>
            <div className="w-1/2 flex flex-col p-20 items-center">
                <div className="w-1/2 border-neutral-400 bg-yellow-100 rounded-full ">
                    <p
                        className="text-amber-500 text-2xl p-5 text-center cursor-pointer"
                        onClick={newSchedule.onOpen}
                    >
                        모임 생성하기
                    </p>
                </div>
            </div>
        </>
    );
};

export default StartPage;
