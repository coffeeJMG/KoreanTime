import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function DELETE(request: Request) {
    const currentUser = await getCurrentUser();
    const data = await request.text();

    if (!currentUser) {
        return null;
    }

    console.log(currentUser.email);

    try {
        const body = JSON.parse(data);

        console.log(body);

        await prisma.invitedScheduleList.deleteMany({
            where: {
                invitedUser: currentUser.email,
                invitedSchedule: body,
            },
        });

        return NextResponse.json("모임 초대를 거절했습니다.");
    } catch (error) {
        return NextResponse.json({ error: "Error processing the request." });
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

        // 여기서 body는 스케줄의 ID를 포함해야 합니다.

        await prisma.member.create({
            data: {
                email: currentUser.email,
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

        return NextResponse.json("환영합니다 모임에 참가하셨습니다.");
    } catch (error) {
        return NextResponse.json({
            error: error,
        });
    }
}
