import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function DELETE(request: Request) {
    const currentUser = await getCurrentUser();
    const data = await request.text();

    if (!currentUser) {
        return null;
    }

    try {
        await prisma.invitedScheduleList.deleteMany({
            where: {
                invitedUser: currentUser.email,
                invitedSchedule: data,
            },
        });

        return NextResponse.json("초대를 거절했습니다");
    } catch (error) {
        return NextResponse.json("요청 데이터를 확인해주세요.");
    }
}

export async function POST(request: Request) {
    const currentUser = await getCurrentUser();
    const data = await request.text();

    if (!currentUser) {
        return null;
    }

    try {
        const body = JSON.parse(data);

        await prisma.member.create({
            data: {
                email: currentUser.email,
                nickname: currentUser.nickname,
                point: currentUser.point,
                schedule: {
                    connect: {
                        id: body, // assuming body contains the schedule ID
                    },
                },
            },
        });

        await prisma.invitedScheduleList.deleteMany({
            where: {
                invitedUser: currentUser.email,
                invitedSchedule: body,
            },
        });

        const scheduleList = await prisma.schedule.findMany({
            where: {
                members: {
                    some: {
                        email: currentUser.email,
                    },
                },
            },
        });

        return NextResponse.json({
            message: "모임에 참석하셨습니다.",
            scheduleList: scheduleList,
        });
    } catch (error) {
        return NextResponse.json({
            error: error,
        });
    }
}
