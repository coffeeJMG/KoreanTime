import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
    const body = await req.json();
    const { schedulePageId } = body;

    try {
        const membersLocation = await prisma.membersLocation.findMany({
            where: {
                scheduleId: schedulePageId,
            },
        });

        return NextResponse.json(membersLocation); // 응답으로 데이터 반환
    } catch (error) {}
}
