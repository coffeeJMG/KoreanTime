import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
    const body = await request.json();
    const currentUser = await getCurrentUser();

    const { title, place, time, date, maximumPeople, lat, lng, hostUser } =
        body;

    const schedule = await prisma.schedule.create({
        data: {
            title,
            place,
            time,
            date,
            maximumPeople,
            lat,
            lng,
            hostUser,
            members: {
                create: [{ email: currentUser?.email }],
            },
        },
    });

    return NextResponse.json(schedule);
}
