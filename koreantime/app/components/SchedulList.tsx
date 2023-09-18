"use client";

import { useRouter } from "next/navigation";
import { useNewSchedule } from "../hooks/useScheduleModal";
import { colors, size } from "@/app/types/constant";
import { ScheduleListProps, currentUserType } from "../types";
import useScheduleListStore from "../stores/updateScheduleList";
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

type userSchedule = ScheduleListProps & currentUserType;

const customStyles: StylesConfig = {
    container: (provided) => ({
        ...provided,
        width: "300px",
    }),
    control: (provided) => ({
        ...provided,
        padding: "3%",
        backgroundColor: "rgb(254 240 138)",
    }),
};

const ScheduleList: React.FC<userSchedule> = ({
    scheduleList,
    currentUser,
}) => {
    const newSchedule = useNewSchedule(); // 스케쥴 정보
    const { updateScheduleList } = useScheduleListStore(); // 유저가 속한 스케쥴
    const router = useRouter();
    const [mailFilterdList, setMailFilterdList] = useState<ScheduleListProps[]>(
        []
    );
    // 로그인이 안되어있을 시 로그인 페이지 이동
    useEffect(() => {
        if (!currentUser) {
            router.push("/login");
        }
        router.refresh();
    }, [updateScheduleList]);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            mail: "",
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
            data.user = currentUser?.email;

            const response = await axios.post("api/filteringList", data);

            if (response.status == 200) {
                console.log(response);
                setMailFilterdList(response.data);
            } else {
                let message = String(response.data);
                toast.error(message);
            }
        } catch (error) {
            const axiosError = error as AxiosError;
            if (axiosError.response) {
                let message = String(axiosError.response.data);
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
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-row p-10 w-1/2 gap-10 items-start relative"
                >
                    <div className="flex flex-col items-start">
                        <Input
                            type="text"
                            {...register("mail")}
                            placeholder="이메일을 입력해주세요"
                            onKeyPress={(
                                e: React.KeyboardEvent<HTMLInputElement>
                            ) => {
                                if (e.key === "Enter") {
                                    handleSubmit(onSubmit)();
                                }
                            }}
                        />
                    </div>
                    <div className="w-1/2 mt-3">
                        <Controller
                            render={({ field }) => (
                                <ReactSelect
                                    styles={customStyles}
                                    {...field}
                                    options={[
                                        { value: "오늘", label: "오늘" },
                                        { value: "일주일", label: "일주일" },
                                        { value: "한달", label: "한달" },
                                    ]}
                                    isClearable
                                    instanceId="filterId"
                                    placeholder="기간을 선택해주세요"
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
                </form>
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-10 border-2 p-10 mt-10">
                    {scheduleList && scheduleList.length > 0 ? (
                        scheduleList.map((item) => (
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
                                        className={`hidden xl:block ${size.listSize}`}
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
