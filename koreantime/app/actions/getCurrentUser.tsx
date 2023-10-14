import { getServerSession } from "next-auth/next";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/libs/prismadb";

export async function getSession() {
    return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
    try {
        const session = await getSession();

        // 유저의 메일 유효성 확인
        if (!session?.user?.email) {
            return null;
        }

        // db 에서 메일이 유효한 지 확인
        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string,
            },
        });

        // 유효하지 않으면 return null
        if (!currentUser) {
            return null;
        }

        // 유효하면 유저 정보 return
        return {
            ...currentUser,
            createdAt: currentUser.createdAt.toISOString(),
            updatedAt: currentUser.updatedAt.toISOString(),
        };
    } catch (error) {
        return null;
    }
}
