import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();

    const deleteId = await prisma.schedule.delete({
        where: {
            id: body.id,
        },
    });
    return NextResponse.json(deleteId);
}
