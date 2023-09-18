import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
    const body = await req.json();
    const { mail, user } = body;

    console.log(mail, user);
    try {
        const vailedUser = await prisma.user.findUnique({
            where: {
                email: mail,
            },
        });

        if (!vailedUser) {
            return new NextResponse(
                JSON.stringify("존재하지 않는 유저입니다."),
                { status: 400 }
            );
        }
        const mailFiltering = await prisma.schedule.findMany({
            where: {
                AND: [
                    {
                        members: {
                            some: {
                                email: mail,
                            },
                        },
                    },
                    {
                        members: {
                            some: {
                                email: user,
                            },
                        },
                    },
                ],
            },
        });

        return NextResponse.json(mailFiltering); // 응답으로 데이터 반환
    } catch (error) {}
}
