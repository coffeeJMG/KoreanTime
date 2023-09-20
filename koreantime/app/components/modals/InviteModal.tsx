"use client";

import { useCallback, useState } from "react";
import { Modal } from "./Modal";
import {
    Controller,
    FieldValues,
    SubmitHandler,
    useForm,
} from "react-hook-form";
import { Input } from "../Input";
import { Button } from "../Button";
import axios, { AxiosError } from "axios";

import { useInviteModal } from "@/app/hooks/useInviteModal";
import { size } from "@/app/types/constant";
import { useShceduleIdStore } from "@/app/stores/scheduleIdStore";
import { toast } from "react-hot-toast";

export const InviteModal = () => {
    const inviteModal = useInviteModal();
    const { scheduleId, maximumPeople, memberLegnth, title } =
        useShceduleIdStore();

    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control,
    } = useForm<FieldValues>({
        defaultValues: {
            mail: "",
        },
    });

    const handleClose = useCallback(() => {
        setTimeout(() => {
            inviteModal.onClose();
        }, 300);
    }, [inviteModal]);

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
            const inviteData = {
                email: data.mail,
                scheduleId: scheduleId,
                maximumPeople: maximumPeople,
                title: title,
            };

            if (memberLegnth >= maximumPeople) {
                toast.error(`최대 인원은 ${maximumPeople}입니다.`);
            } else {
                const res = await axios.post("/api/invite", inviteData);
                toast.success(res.data);
                reset({
                    mail: "",
                });

                handleClose();
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorMessage = error.response?.data as string;
                toast.error(errorMessage);
            }
        }
    };
    const bodyContent = (
        <>
            <form
                className="flex flex-col gap-4"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="flex flex-row items-center gap-10">
                    <p className={`${size.titleSize} w-48`}>이메일</p>
                    <Input
                        type="text"
                        {...register("mail", {
                            required: "이메일을 입력해주세요",
                        })}
                        placeholder="초대하실 분의 이메일을 입력해주세요"
                    />
                </div>
                <Button full>초대하기</Button>
            </form>
        </>
    );

    return (
        <>
            <Modal
                disabled={isLoading}
                isOpen={inviteModal.isOpen}
                title="초대하기"
                onClose={inviteModal.onClose}
                body={bodyContent}
            />
        </>
    );
};
