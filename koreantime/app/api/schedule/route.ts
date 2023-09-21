import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
    const body = await request.json();
    const currentUser = await getCurrentUser();

    const { title, place, time, date, maximumPeople, lat, lng, hostUser } =
        body;

    if (!currentUser) {
        return null;
    }

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
                create: [
                    {
                        email: currentUser.email,
                        nickname: currentUser.nickname,
                        point: currentUser.point,
                    },
                ],
            },
        },
    });

    return NextResponse.json(schedule);
}
