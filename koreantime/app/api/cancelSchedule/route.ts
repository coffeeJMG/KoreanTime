import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
    const body = await request.json();

    const { id, scheduleId } = body;
    console.log(scheduleId);

    console.log(typeof id, typeof scheduleId);

    // member 에서 scheduleId와 email과 일치하는 데이터 검색
    const targetMembers = await prisma.member.findMany({
        where: {
            scheduleId: scheduleId,
            email: id,
        },
    });

    // 해당 멤버의 아이디 삭제
    for (const member of targetMembers) {
        await prisma.member.delete({
            where: {
                id: member.id,
            },
        });
    }

    return NextResponse.json("유저 삭제성공");
}
