import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
    const body = await request.json();
    const { membersRanking } = body;

    const keys = Object.keys(membersRanking);
    const first = keys[0];
    const last = keys[keys.length - 1];

    // 첫 번째 사용자의 포인트를 +10 증가
    await prisma.user.update({
        where: { email: first },
        data: { point: { increment: 10 } },
    });

    // 마지막 사용자의 포인트를 확인
    const lastUser = await prisma.user.findUnique({
        where: { email: last },
        select: { point: true },
    });

    // 마지막 사용자의 포인트가 0보다 클 때만 감소
    if (lastUser && lastUser.point > 0) {
        await prisma.user.update({
            where: { email: last },
            data: { point: { increment: -10 } },
        });
    }

    return NextResponse.json("응답성공");
}
