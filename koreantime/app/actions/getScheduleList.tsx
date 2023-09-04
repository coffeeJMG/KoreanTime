import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";
import { Prisma } from "@prisma/client"; // Import Prisma types

export default async function getScheduleList() {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return null;
    }

    try {
        const scheduleList = await prisma.schedule.findMany({
            where: {
                members: {
                    equals: String(currentUser.email),
                },
            },
        });
        return scheduleList;
    } catch (error: any) {
        console.error(error);
        return null;
    }
}
