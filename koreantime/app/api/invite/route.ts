import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
    const body = await request.json();
    const { email, scheduleId } = body;

    const inviteUser = await prisma.user.findUniqueOrThrow({
        where: {
            email: email,
        },
    });

    if (!inviteUser) {
        return NextResponse.json("존재하지 않는 유저입니다");
    }

    await prisma.invitedScheduleList.create({
        data: {
            invitedSchedule: scheduleId,
            user: {
                connect: {
                    email: email,
                },
            },
        },
    });

    return NextResponse.json(`${email} 을 초대하셨습니다.`);
}
