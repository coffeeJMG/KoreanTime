import { getCurrentTime } from "@/app/actions/getCurrentTime";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import { addDays, format } from "date-fns";

export async function POST(req: Request) {
    const body = await req.json();
    const { mail, user, ReactSelect } = body; // user는 현재 로그인 된 계정 mail 은 특정유저와의 약속 검색을 위한 계정
    const today = getCurrentTime();

    // 시작날짜 구하는 연산
    const startDate = `${today.today.substring(4)}-${today.today.substring(
        0,
        2,
    )}-${today.today.substring(2, 4)}`;
    const scheduleDate = today.today;
    let endDate;

    // 유저가 선택하는 옵션에 따라 오늘, 일주일, 한달 간 있는 스케쥴 반환
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

    // 초대하는 유저(mail) 이 실제 존재하는 유저인 지 확인
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
                    { status: 400 },
                );
            }
        }

        let mailFiltering;

        // 특정 유저는 검색하고 날짜 옵션은 선택하지 않은 경우
        if (mail !== "" && !ReactSelect.value) {
            mailFiltering = await prisma.schedule.findMany({
                // schedule 중에 로그인 된 계정, 초대하는 유저가 모두 포함 된 스케쥴 필터링
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

        // 유저는 검색하지 않고 날짜 옵션만 선택한 경우
        if (mail == "" && ReactSelect.value) {
            mailFiltering = await prisma.schedule.findMany({
                // 오름차순 정렬로 스케쥴 검색
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

        // 유저 검색 및 날짜 옵션 모두 선택한 경우
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
    } catch (error) {
        return new NextResponse(
            JSON.stringify(
                "서버에서 문제가 발생했습니다. 나중에 다시 시도해 주세요.",
            ),
            { status: 500 },
        );
    }
}
