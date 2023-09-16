import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
    const body = await request.json();
    const currentUser = await getCurrentUser();

    const { email, lat, lng, scheduleId } = body;

    if (!currentUser) {
        return NextResponse.error(); // 인증되지 않은 유저
    }

    try {
        const location = await prisma.membersLocation.upsert({
            where: {
                memberEmail_scheduleId: {
                    memberEmail: email,
                    scheduleId: scheduleId,
                },
            },
            update: {
                lat: lat,
                lng: lng,
            },
            create: {
                memberEmail: email,
                lat: lat,
                lng: lng,
                scheduleId: scheduleId,
            },
        });

        return NextResponse.json(location);
    } catch (error) {
        console.error("위치 정보 저장 중 에러가 발생하였습니다.", error);
        return NextResponse.error();
    }
}
