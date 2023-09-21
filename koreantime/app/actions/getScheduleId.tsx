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
                    email: true,
                    nickname: true,
                    point: true,
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
