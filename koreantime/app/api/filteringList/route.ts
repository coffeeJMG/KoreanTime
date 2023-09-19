import { getCurrentTime } from "@/app/actions/getCurrentTime";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import { addDays, format } from "date-fns";

export async function POST(req: Request, res: Response) {
    const body = await req.json();
    const { mail, user, ReactSelect } = body;
    const today = getCurrentTime();

    let startDate = `${today.today.substring(4)}-${today.today.substring(
        0,
        2
    )}-${today.today.substring(2, 4)}`;
    let scheduleDate = today.today;
    let endDate;

    console.log(ReactSelect.value);
    if (ReactSelect.value !== "") {
        switch (ReactSelect.value) {
            case "오늘":
                endDate = format(addDays(new Date(startDate), 0), "MMddyyyy"); // 오늘까지
                break;
            case "7일":
                endDate = format(addDays(new Date(startDate), 7), "MMddyyyy"); // 7일 후까지
                break;
            case "30일":
                endDate = format(addDays(new Date(startDate), 30), "MMddyyyy"); // 30일 후까지
                break;
            default:
                endDate = startDate;
        }
    }

    try {
        const vailedUser = await prisma.user.findUnique({
            where: {
                email: mail,
            },
        });

        if (mail !== "") {
            if (!vailedUser) {
                return new NextResponse(
                    JSON.stringify("존재하지 않는 유저입니다."),
                    { status: 400 }
                );
            }
        }

        let mailFiltering;

        if (mail !== "" && !ReactSelect.value) {
            mailFiltering = await prisma.schedule.findMany({
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
                orderBy: {
                    date: "asc",
                },
            });
        }

        if (mail == "" && ReactSelect.value) {
            mailFiltering = await prisma.schedule.findMany({
                where: {
                    date: {
                        gte: scheduleDate,
                        lte: endDate,
                    },
                },
                orderBy: {
                    date: "asc",
                },
            });
        }

        if (mail && ReactSelect.value) {
            mailFiltering = await prisma.schedule.findMany({
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
                        {
                            date: {
                                gte: scheduleDate,
                                lte: endDate,
                            },
                        },
                    ],
                },
                orderBy: {
                    date: "asc",
                },
            });
        }

        return NextResponse.json(mailFiltering); // 응답으로 데이터 반환
    } catch (error) {}
}
