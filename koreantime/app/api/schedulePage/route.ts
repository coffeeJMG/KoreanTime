import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();

    // 스케쥴에서 해당 유저 제외
    const deleteId = await prisma.schedule.delete({
        where: {
            id: body.id,
        },
    });
    return NextResponse.json(deleteId);
}
