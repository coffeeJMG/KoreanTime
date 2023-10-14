import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { email, scheduleId, title } = body;

    // 초대할 user를 db에서 검색
    const inviteUser = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });

    // 자기 자신일 경우 예외처리
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

    // 초대받은 리스트에서 초대 유저를 검색
    const invitedUser = await prisma.invitedScheduleList.findFirst({
        where: {
            invitedUser: email,
            invitedSchedule: scheduleId,
        },
    });

    // 이미 초대를 한 경우 예외처리
    if (invitedUser) {
        return new NextResponse(JSON.stringify("이미 초대한 유저입니다"), {
            status: 400,
        });
    }

    // schedule의 member에 이미 해당 유저가 존재하는 지 조회
    const existingMember = await prisma.member.findFirst({
        where: {
            email: email,
            scheduleId: scheduleId,
        },
    });

    // 이미 참여된 멤버일 경우 예외처리
    if (existingMember) {
        return new NextResponse(JSON.stringify("이미 참여한 유저입니다"), {
            status: 400,
        });
    }

    // 모든 예외가 아닌 경우 초대받은 리스트에 새로 추가
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
