import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
    const body = await request.json();
    const { email, pwCheck, password, nickname, name, invited, point } = body;

    const hashedPassword = await bcrypt.hash(password, 12);

    // 새로운 유저 생성
    const user = await prisma.user.create({
        data: {
            point,
            name,
            email,
            pwCheck,
            hashedPassword,
            nickname,
            invited,
        },
    });

    return NextResponse.json(user);
}
