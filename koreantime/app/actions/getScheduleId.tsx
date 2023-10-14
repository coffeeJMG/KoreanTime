import prisma from "@/app/libs/prismadb";

interface IParams {
    schedulePageId?: string | undefined;
}

export const getScheduleId = async (params: IParams) => {
    const { schedulePageId } = params;

    const schedule = await prisma.schedule.findUnique({
        // schedulePageId 와 일치하는 값을 schedule 의 id필드에서 찾는다
        where: {
            id: schedulePageId,
        },

        // 포함해야하는 정보들
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
