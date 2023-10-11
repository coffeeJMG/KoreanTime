"use client";

import { useRouter } from "next/navigation";
import { useNewSchedule } from "../hooks/useScheduleModal";
import { colors, size } from "@/app/types/constant";
import { ScheduleItem, ScheduleListProps, currentUserType } from "../types";
import { useEffect, useState } from "react";
import {
    Controller,
    FieldValues,
    SubmitHandler,
    useForm,
} from "react-hook-form";
import { Input } from "./Input";
import ReactSelect, { StylesConfig } from "react-select";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { Button } from "./Button";

type userSchedule = ScheduleListProps & currentUserType;

const scheduleSelectStyles: StylesConfig = {
    container: (provided) => ({
        ...provided,
        width: "100%",
    }),
    control: (provided) => ({
        ...provided,
        padding: "3%",
        backgroundColor: "rgb(254, 240, 138)",
        borderRadius: "5px",
    }),
    option: (styles) => {
        return {
            ...styles,
            color: "#9A3435",
            background: "rgb(254, 240, 138)",
            padding: "3%",
            margin: "3%",
            width: "90%",
            borderRadius: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        };
    },

    singleValue: (styles) => {
        return {
            ...styles,
            color: "#9A3435",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        };
    },
    placeholder: (styles) => ({ ...styles }),
    input: (styles) => ({ ...styles }),
};

const ScheduleList: React.FC<userSchedule> = ({
    scheduleList,
    currentUser,
}) => {
    const newSchedule = useNewSchedule(); // 스케쥴 정보
    const router = useRouter();
    const [mailFilterdList, setMailFilterdList] = useState<ScheduleItem[]>([]);
    // 로그인이 안되어있을 시 로그인 페이지 이동
    useEffect(() => {
        if (!currentUser) {
            router.push("/login");
        }
        router.refresh();
    }, []);

    useEffect(() => {
        setMailFilterdList(scheduleList);
    }, [scheduleList, mailFilterdList]);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm<FieldValues>({
        defaultValues: {
            mail: "",
            ReactSelect: {
                value: "조회기간",
                label: "조회기간",
            },
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
            data.user = currentUser?.email;
            const response = await axios.post("api/filteringList", data);

            if (response.status == 200) {
                setMailFilterdList(response.data);
            } else {
                const message = String(response.data);
                toast.error(message);
            }

            reset({
                ReactSelect: { value: "", label: "조회기간" },
                mail: "",
            });
        } catch (error) {
            const axiosError = error as AxiosError;
            if (axiosError.response) {
                const message = String(axiosError.response.data);
                toast.error(message);
            } else {
                console.log("오류가 발생했습니다.");
            }
        }
    };

    return (
        <>
            <div className="w-full flex flex-col items-center mt-10">
                <div
                    className={`md:full ${colors.bgColor} rounded-full hover:scale-[0.95] transition`}
                >
                    <p
                        className={`${colors.textColor} ${size.titleSize} p-5 text-center cursor-pointer whitespace-nowrap`}
                        onClick={newSchedule.onOpen}
                    >
                        모임 생성하기
                    </p>
                </div>
                <div className="grid xs:grid-cols-1 sm:grid-cols-3 gap-10 p-10 items-center">
                    <Button
                        full
                        onClick={() => {
                            setMailFilterdList(scheduleList);
                        }}
                    >
                        전체보기
                    </Button>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col items-start">
                            <Input
                                type="text"
                                radius
                                {...register("mail")}
                                placeholder="이메일을 입력해주세요"
                                onKeyPress={(
                                    e: React.KeyboardEvent<HTMLInputElement>,
                                ) => {
                                    if (e.key === "Enter") {
                                        handleSubmit(onSubmit)();
                                    }
                                }}
                            />
                        </div>
                    </form>
                    <div className=" mt-3">
                        <Controller
                            render={({ field }) => (
                                <ReactSelect
                                    styles={scheduleSelectStyles}
                                    {...field}
                                    options={[
                                        { value: "오늘", label: "오늘" },
                                        {
                                            value: "7일",
                                            label: "7일",
                                        },
                                        { value: "30일", label: "30일" },
                                    ]}
                                    isClearable={false}
                                    instanceId="filterId"
                                    isSearchable={false}
                                    onChange={(value) => {
                                        field.onChange(value); // 필요한 경우 기존의 onChange 로직을 유지
                                        handleSubmit(onSubmit)(); // 옵션을 선택할 때마다 폼 제출
                                    }}
                                />
                            )}
                            name="ReactSelect"
                            control={control}
                        />
                    </div>
                </div>

                <div className="grid xs:grid-cols-1 sm:grid-cols-2 gap-10 border-2 p-10 mt-10">
                    {mailFilterdList && mailFilterdList.length > 0 ? (
                        mailFilterdList.map((item) => (
                            <div
                                onClick={() =>
                                    router.push(`/schedulePage/${item.id}`)
                                }
                                key={item.id}
                                className={`flex flex-col gap-4 md:w-full lg:w-full ${colors.bgColor} p-5 rounded-2xl ${colors.textColor} hover:scale-[0.98] transition cursor-pointer`}
                            >
                                <div>
                                    <p
                                        className={`font-medium ${size.titleSize}`}
                                    >
                                        {item.title}
                                    </p>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <p className={`${size.listSize}`}>
                                        날짜 : {item.date}
                                    </p>
                                    <p className={`${size.listSize}`}>
                                        시간 : {item.time}
                                    </p>
                                    <p
                                        className={`hidden sm:block ${size.listSize}`}
                                    >
                                        장소 : {item.place}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>속해 있는 모임이 없습니다.</div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ScheduleList;
