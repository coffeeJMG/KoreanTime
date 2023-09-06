import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
    const body = await request.json();

    const { title, place, time, date, member, members, lat, lng } = body;

    const schedule = await prisma.schedule.create({
        data: {
            title,
            place,
            time,
            date,
            member,
            members,
            lat,
            lng,
        },
    });

    return NextResponse.json(schedule);
}
