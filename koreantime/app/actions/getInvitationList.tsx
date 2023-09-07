import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getinvitationList() {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return null;
    }

    try {
        const invitationList = await prisma.user.findMany({
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
                        invitedSchedule: true, // Add other member properties as needed
                    },
                },
            },
        });

        const invitation = invitationList[0].invitedScheduleList;

        return invitation;
    } catch (error: any) {
        console.error(error);
        return null;
    }
}
