import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getScheduleList() {
    const currentUser = await getCurrentUser();

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
        }));

        return formattedScheduleList;
    } catch (error: any) {
        console.error(error);
        return null;
    }
}
