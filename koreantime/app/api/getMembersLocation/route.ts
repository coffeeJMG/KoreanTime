import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();
    const { scheduleId } = body;

    try {
        const membersLocation = await prisma.membersLocation.findMany({
            where: {
                scheduleId: scheduleId,
            },
        });

        return NextResponse.json(membersLocation); // 응답으로 데이터 반환
    } catch (error) {
        return new NextResponse(
            JSON.stringify(
                "서버에서 문제가 발생했습니다. 나중에 다시 시도해 주세요.",
            ),
            { status: 500 },
        );
    }
}
