import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";
import { getCurrentTime } from "./getCurrentTime";

export default async function getScheduleList() {
    const currentUser = await getCurrentUser();
    const useCurrentTime = getCurrentTime();

    const today = Number(useCurrentTime.comparisonToday);
    const currentTime = Number(useCurrentTime.comparisonTime);

    console.log(today);
    console.log(currentTime);

    if (!currentUser) {
        return null;
    }

    try {
        const scheduleList = await prisma.schedule.findMany({
            where: {
                members: {
                    some: {
                        email: currentUser.email,
                    },
                },
            },
            include: {
                members: {
                    select: {
                        email: true, // Add other member properties as needed
                    },
                },
            },
        });

        // Extract member emails from the array of objects
        const formattedScheduleList = scheduleList.map((schedule) => ({
            ...schedule,
            members: schedule.members.map((member) => member.email),
            formattedTime: Number(schedule.time.replace(":", "")),
            formattedDate: Number(
                schedule.date.slice(4) + schedule.date.slice(0, 4)
            ),
        }));

        // Filter schedules based on current time and today's date
        const upcomingSchedules = formattedScheduleList.filter(
            (schedule) =>
                schedule.formattedDate > today ||
                (schedule.formattedDate === today &&
                    schedule.formattedTime > currentTime)
        );

        return upcomingSchedules;
    } catch (error: any) {
        console.error(error);
        return null;
    }
}
