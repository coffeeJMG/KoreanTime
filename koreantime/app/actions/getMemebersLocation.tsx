import prisma from "@/app/libs/prismadb";

export const getMembersLocation = async (schedulePageId: string) => {
    const membersLocation = await prisma.membersLocation.findMany({
        where: {
            scheduleId: schedulePageId,
        },
    });

    return membersLocation;
};
