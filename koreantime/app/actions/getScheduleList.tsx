import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";
import { getCurrentTime } from "./getCurrentTime";

export default async function getScheduleList() {
    const currentUser = await getCurrentUser();
    const useCurrentTime = getCurrentTime();

    const today = Number(useCurrentTime.comparisonToday);
    const currentTime = Number(useCurrentTime.comparisonTime);

    if (!currentUser) {
        return null;
    }

    try {
        const scheduleList = await prisma.schedule.findMany({
            // currentUser.email 와 일치하는 값을 schedule 의 members 필드에 email과 일치하는 값들을 찾는다
            where: {
                members: {
                    some: {
                        email: currentUser.email,
                    },
                },
            },
            orderBy: {
                date: "asc", // 오름차순으로 정렬
            },

            // 포함하는 정보
            include: {
                members: {
                    select: {
                        email: true, // Add other member properties as needed
                    },
                },
            },
        });

        const formattedScheduleList = scheduleList.map((schedule) => ({
            ...schedule,

            members: schedule.members.map((member) => member.email), // 이메일만 반환
            formattedTime: Number(schedule.time.replace(":", "")), // : 없애고 숫자형으로 반환
            formattedDate: Number(
                schedule.date.slice(4) + schedule.date.slice(0, 4), // YYYYMMDD 형식으로 반환
            ),
        }));

        const isAfterCurrentTime = (schedule: {
            formattedDate: number;
            formattedTime: number;
        }) => {
            if (schedule.formattedDate > today) return true;
            if (
                schedule.formattedDate === today &&
                schedule.formattedTime > currentTime
            )
                return true;
            return false;
        };

        const filteredSchedules =
            formattedScheduleList.filter(isAfterCurrentTime);

        return filteredSchedules;
    } catch (error) {
        console.error(error);
        return null;
    }
}
