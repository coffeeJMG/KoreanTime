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
import { MakingPlan, currentUserType } from "@/app/types";
import { size } from "@/app/types/constant";
import { useRouter } from "next/navigation";
import { isTimeInFuture } from "@/app/actions/getCurrentTime";
import getCurrentLocation from "@/app/actions/getCurrentLocation";

export const NewScheduleModal: React.FC<currentUserType> = ({
    currentUser,
}) => {
    const newSchedule = useNewSchedule();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [lat, setLat] = useState<number | null>(0); // 위도
    const [lng, setLng] = useState<number | null>(0); // 경도
    const [fullAddress, setFullAddress] = useState<string>(""); //전체주소
    const userLocation = getCurrentLocation();

    console.log(userLocation.coordinates.lat);
    const getAddrData = (
        lat: number | null,
        lng: number | null,
        fullAddress: string
    ): void => {
        setLat(lat);
        setLng(lng);
        setFullAddress(fullAddress);
    };
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control,
        setValue,
    } = useForm<MakingPlan>({
        defaultValues: {
            name: "",
            place: "",
            ReactSelect: { value: "", label: "" },
            time: "",
            lat: 0,
            lng: 0,
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

            const scheduleData = {
                time: data.time,
                place: data.place,
                title: data.name,
                maximumPeople: Number(data.ReactSelect.value),
                date: FormattedDate,
                hostUser: currentUser?.email,
                lat: lat,
                lng: lng,
            };

            await axios.post("/api/schedule", scheduleData);

            reset({
                name: "",
                place: "",
                ReactSelect: { value: "", label: "" },
                time: "",
                lat: 0,
                lng: 0,
            });

            newSchedule.onClose();
            router.refresh();
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
                        <>
                            <Post
                                getAddrData={getAddrData}
                                {...field} // register 대신 field를 전달
                            />
                        </>
                    )}
                />

                <div className="flex flex-row items-center gap-10">
                    <p className={`items-center w-full ${size.titleSize}`}>
                        인원 수
                    </p>
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
                            render={({
                                field: { onChange, value, ...fieldProps },
                            }) => {
                                return (
                                    <ReactDatePicker
                                        {...fieldProps}
                                        className="input"
                                        placeholderText="날짜 선택"
                                        minDate={new Date()}
                                        selected={value}
                                        showDisabledMonthNavigation
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={15}
                                        timeCaption="time"
                                        filterTime={isTimeInFuture}
                                        onChange={(date) => {
                                            onChange(date);
                                            const selectedHours = String(
                                                date?.getHours()
                                            ).padStart(2, "0");
                                            const selectedMinutes = String(
                                                date?.getMinutes()
                                            ).padStart(2, "0");
                                            const formattedTime = `${selectedHours}:${selectedMinutes}`;
                                            setValue("time", formattedTime);
                                        }}
                                    />
                                );
                            }}
                        />
                    </div>
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
                body={bodyContent}
                children={undefined}
            />
        </>
    );
};
