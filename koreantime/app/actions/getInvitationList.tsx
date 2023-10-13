import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getinvitationList() {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return null;
    }

    try {
        const invitation = await prisma.user.findFirst({
            where: {
                invitedScheduleList: {
                    some: {
                        invitedUser: currentUser.email,
                    },
                },
            },
            include: {
                invitedScheduleList: {
                    select: {
                        invitedSchedule: true,
                        title: true,
                    },
                },
            },
        });

        if (!invitation?.invitedScheduleList) {
            return null;
        }

        return invitation.invitedScheduleList;
    } catch (error) {
        console.error(error);
        return null;
    }
}
