"use client";

import { useNewSchedule } from "../hooks/useScheduleModal";
import { colors } from "@/app/types/constant";

interface ScheduleListProps {
    scheduleList:
        | {
              id: string;
              title: string | null;
              place: string | null;
              time: string | null;
              date: string | null;
              member: string | null;
              members: string;
          }[];
}

const ScheduleList: React.FC<ScheduleListProps> = ({ scheduleList }) => {
    const newSchedule = useNewSchedule();

    return (
        <>
            <div className="w-4/5 flex flex-col items-center mr-40 mt-10">
                <div
                    className={`md:full ${colors.bgColor} rounded-full hover:scale-[0.95] transition`}
                >
                    <p
                        className={`${colors.textColor} text-2xl p-5 text-center cursor-pointer whitespace-nowrap`}
                        onClick={newSchedule.onOpen}
                    >
                        모임 생성하기
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-10 border-2 p-10 mt-10 ">
                    {scheduleList.map((item, i) => (
                        <div
                            key={item.id}
                            className={`flex flex-col gap-4 md:w-full lg:w-full ${colors.bgColor} p-5 rounded-2xl ${colors.textColor} hover:scale-[0.98] transition cursor-pointer`}
                        >
                            <div>
                                <p className="font-medium">{item.title}</p>
                            </div>

                            <div className="flex flex-col">
                                <p>날짜 : {item.date}</p>
                                <p>시간 : {item.time}</p>
                                <p className="hidden xl:block">
                                    장소 : {item.place}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ScheduleList;
