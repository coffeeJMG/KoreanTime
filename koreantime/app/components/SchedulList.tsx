"use client";

import { useNewSchedule } from "../hooks/useScheduleModal";

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
    console.log(scheduleList);

    return (
        <>
            <div className="w-4/5 flex flex-col p-20 items-center">
                <div className="md:full  border-neutral-400 bg-yellow-100 rounded-full ">
                    <p
                        className="text-amber-500 text-2xl p-5 text-center cursor-pointer whitespace-nowrap"
                        onClick={newSchedule.onOpen}
                    >
                        모임 생성하기
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-10">
                    {scheduleList.map((item, i) => (
                        <div
                            key={item.id}
                            className="flex flex-col gap-4 md:w-96 lg:w-96 mt-20 bg-yellow-100 p-5 rounded-2xl text-amber-500"
                        >
                            <div>
                                <p className="font-medium">{item.title}</p>
                            </div>

                            <div className="flex flex-col">
                                <p>시간 : {item.time}</p>
                                <p>장소 : {item.place}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ScheduleList;
