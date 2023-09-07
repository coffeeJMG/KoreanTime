import prisma from "@/app/libs/prismadb";

interface IParams {
    schedulePageId?: string | undefined;
}

export const getScheduleId = async (params: IParams) => {
    const { schedulePageId } = params;

    const schedule = await prisma.schedule.findUnique({
        where: {
            id: schedulePageId,
        },
        include: {
            users: true,
            members: {
                select: {
                    email: true, // Add other member properties as needed
                },
            },
        },
    });

    if (!schedule) {
        return null;
    }

    return {
        ...schedule,
    };
};
