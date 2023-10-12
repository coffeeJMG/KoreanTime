import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { email, scheduleId, title } = body;

    const inviteUser = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });

    if (inviteUser?.email === currentUser?.email) {
        return new NextResponse(
            JSON.stringify("자기 자신은 초대할 수 없습니다."),
            { status: 400 },
        );
    } else if (!inviteUser) {
        return new NextResponse(JSON.stringify("존재하지 않는 유저입니다"), {
            status: 400,
        });
    }

    const invitedUser = await prisma.invitedScheduleList.findFirst({
        where: {
            invitedUser: email,
            invitedSchedule: scheduleId,
        },
    });

    if (invitedUser) {
        return new NextResponse(JSON.stringify("이미 초대한 유저입니다"), {
            status: 400,
        });
    }
    const existingMember = await prisma.member.findFirst({
        where: {
            email: email,
            scheduleId: scheduleId,
        },
    });

    if (existingMember) {
        return new NextResponse(JSON.stringify("이미 참여한 유저입니다"), {
            status: 400,
        });
    }
    await prisma.invitedScheduleList.create({
        data: {
            invitedSchedule: scheduleId,
            title: title,
            user: {
                connect: {
                    email: email,
                },
            },
        },
    });

    return NextResponse.json(`${email} 을 초대하셨습니다.`);
}
