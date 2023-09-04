"use client";

import { useState } from "react";
import { Modal } from "./Modal";

import { useNewSchedule } from "../../hooks/useScheduleModal";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../Input";
import ReactSelect from "react-select";

import { Post } from "../Post";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "../Button";
import axios from "axios";
import { currentUserType } from "@/app/types";

interface MakingPlan {
    name: string;
    place: string;
    time: string;
    ReactSelect: { value: string; label: string };
    ReactDatepicker: Date;
    dutyAddr: string;
    members: string;
}

export const NewScheduleModal: React.FC<currentUserType> = ({
    currentUser,
}) => {
    const newSchedule = useNewSchedule();
    const [isLoading, setIsLoading] = useState(false);
    const [addr1, setAddr1] = useState<string>(""); // 시,도 주소
    const [addr2, setAddr2] = useState<string>(""); // 상세주소
    const [lat, setLat] = useState<number | null>(0); // 위도
    const [lng, setLng] = useState<number | null>(0); // 경도
    const [fullAddress, setFullAddress] = useState<string>(""); //전체주소
    const [dutyAddr, setDutyAddr] = useState<string>("");

    const getAddrData = (
        addr1: string,
        addr2: string,
        lat: number | null,
        lng: number | null,
        fullAddress: string
    ): void => {
        setAddr1(addr1);
        setAddr2(addr2);
        setLat(lat);
        setLng(lng);
        setFullAddress(fullAddress);
        setDutyAddr(fullAddress);
    };
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        control,
    } = useForm<MakingPlan>({
        defaultValues: {
            name: "",
            place: "",
            ReactSelect: { value: "", label: "" },
            time: "",
            members: "",
        },
    });

    function formatDateToCustomString(dateString: string) {
        const date = new Date(dateString);
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const year = String(date.getFullYear());

        return `${month}${day}${year}`;
    }

    const onSubmit: SubmitHandler<MakingPlan> = async (data) => {
        try {
            data.place = fullAddress;

            const selectDate = data.ReactDatepicker;
            const FormattedDate = formatDateToCustomString(String(selectDate));

            console.log(FormattedDate);

            const scheduleData = {
                time: data.time,
                place: data.place,
                title: data.name,
                member: data.ReactSelect.value,
                date: FormattedDate,
                members: currentUser?.email,
            };

            await axios.post("/api/schedule", scheduleData);
        } catch (erros) {}
    };
    const bodyContent = (
        <>
            <form
                className="flex flex-col gap-4"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="flex flex-row items-center gap-10">
                    <p className="text-2xl w-48">모임 이름</p>
                    <Input
                        type="text"
                        {...register("name", {
                            required: "모임 이름을 입력해주세요",
                        })}
                        placeholder="모임 이름을 입력해주세요"
                    />
                </div>
                <Controller
                    name="place"
                    control={control}
                    render={({ field }) => (
                        <Post
                            getAddrData={getAddrData}
                            {...field} // register 대신 field를 전달
                        />
                    )}
                />

                <div className="flex flex-row items-center gap-10">
                    <p className="text-2xl w-48">인원 수</p>
                    <div className="w-full flex gap-10">
                        <div className="w-36">
                            <Controller
                                render={({ field }) => (
                                    <ReactSelect
                                        {...field}
                                        options={[
                                            { value: "1", label: "1" },
                                            { value: "2", label: "2" },
                                            { value: "3", label: "3" },
                                            { value: "4", label: "4" },
                                            { value: "5", label: "5" },
                                            { value: "6", label: "6" },
                                            { value: "7", label: "7" },
                                            { value: "8", label: "8" },
                                        ]}
                                        isClearable
                                    />
                                )}
                                name="ReactSelect"
                                control={control}
                            />
                        </div>

                        <Controller
                            control={control}
                            name="ReactDatepicker"
                            render={({ field: { value, ...fieldProps } }) => {
                                return (
                                    <ReactDatePicker
                                        {...fieldProps}
                                        className="input"
                                        placeholderText="날짜 선택"
                                        selected={value}
                                    />
                                );
                            }}
                        />
                    </div>
                </div>
                <div className="flex flex-row items-center gap-10">
                    <p className="text-2xl w-48">모임 시간</p>
                    <Input
                        type="text"
                        {...register("time", {
                            required: "모임 시간을 입력해주세요",
                            pattern: {
                                value: /\d{2}:\d{2}/,
                                message: "00:00양식으로 입력해주세요",
                            },
                        })}
                        placeholder="00:00 양식으로 입력해주세요"
                    />
                </div>
                <Button full>일정 생성하기</Button>
            </form>
        </>
    );

    return (
        <>
            <Modal
                disabled={isLoading}
                isOpen={newSchedule.isOpen}
                title="일정 만들기"
                onClose={newSchedule.onClose}
                onSubmit={() => {}}
                body={bodyContent}
                children={undefined}
            />
        </>
    );
};
