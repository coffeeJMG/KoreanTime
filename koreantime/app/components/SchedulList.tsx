"use client";

import { useRouter } from "next/navigation";
import { useNewSchedule } from "../hooks/useScheduleModal";
import { colors, size } from "@/app/types/constant";
import { ScheduleListProps, currentUserType } from "../types";
import useScheduleListStore from "../stores/updateScheduleList";
import { useEffect } from "react";

type userSchedule = ScheduleListProps & currentUserType;

const ScheduleList: React.FC<userSchedule> = ({
    scheduleList,
    currentUser,
}) => {
    const newSchedule = useNewSchedule(); // 스케쥴 정보
    const { updateScheduleList } = useScheduleListStore(); // 유저가 속한 스케쥴
    const router = useRouter();

    // 로그인이 안되어있을 시 로그인 페이지 이동
    useEffect(() => {
        if (!currentUser) {
            router.push("/login");
        }
        router.refresh();
    }, [updateScheduleList]);

    return (
        <>
            <div className="w-full flex flex-col items-center mt-10">
                <div
                    className={`md:full ${colors.bgColor} rounded-full hover:scale-[0.95] transition`}
                >
                    <p
                        className={`${colors.textColor} ${size.titleSize} p-5 text-center cursor-pointer whitespace-nowrap`}
                        onClick={newSchedule.onOpen}
                    >
                        모임 생성하기
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-10 border-2 p-10 mt-10">
                    {scheduleList && scheduleList.length > 0 ? (
                        scheduleList.map((item) => (
                            <div
                                onClick={() =>
                                    router.push(`/schedulePage/${item.id}`)
                                }
                                key={item.id}
                                className={`flex flex-col gap-4 md:w-full lg:w-full ${colors.bgColor} p-5 rounded-2xl ${colors.textColor} hover:scale-[0.98] transition cursor-pointer`}
                            >
                                <div>
                                    <p
                                        className={`font-medium ${size.titleSize}`}
                                    >
                                        {item.title}
                                    </p>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <p className={`${size.listSize}`}>
                                        날짜 : {item.date}
                                    </p>
                                    <p className={`${size.listSize}`}>
                                        시간 : {item.time}
                                    </p>
                                    <p
                                        className={`hidden xl:block ${size.listSize}`}
                                    >
                                        장소 : {item.place}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>속해 있는 모임이 없습니다.</div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ScheduleList;
