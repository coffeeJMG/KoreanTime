import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
export async function POST(request: Request) {
    const body = await request.json();
    const currentUser = await getCurrentUser();

    const {
        title,
        place,
        time,
        date,
        maximumPeople,
        lat,
        lng,
        hostUser,
        editId,
    } = body;

    console.log(editId);
    if (!currentUser) {
        return null; // 현재 사용자가 인증되지 않은 경우
    }

    // editId를 사용하여 해당 일정(schedule)을 검색
    const existingSchedule = await prisma.schedule.findUnique({
        where: {
            id: editId,
        },
    });

    if (!existingSchedule) {
        return new NextResponse(JSON.stringify("존재하지 않는 일정입니다"), {
            status: 400,
        });
    }

    // 권한 검사: 현재 사용자가 일정의 호스트인지 확인
    if (hostUser !== currentUser.email) {
        return new NextResponse(
            JSON.stringify("일정을 변경할 권한이 없습니다."),
            { status: 400 },
        );
    }

    // 데이터 유효성 검사 및 업데이트
    try {
        const updatedSchedule = await prisma.schedule.update({
            where: {
                id: editId,
            },
            data: {
                title,
                place,
                time,
                date,
                maximumPeople,
                lat,
                lng,
            },
        });

        return NextResponse.json(updatedSchedule);
    } catch (error) {
        return new NextResponse(JSON.stringify("일정변경 실패"), {
            status: 500,
        });
    }
}
