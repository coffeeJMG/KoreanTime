import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
    const body = await req.json();
    console.log(body);

    const deleteId = await prisma.schedule.delete({
        where: {
            id: body.id,
        },
    });
    return NextResponse.json(deleteId);
}
