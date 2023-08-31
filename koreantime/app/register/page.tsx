"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Input, PwInput } from "../components/Input";
import { Button } from "../components/Button";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";

const RegisterForm = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            email: "",
            password: "",
            nickname: "",
            pwCheck: "",
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        axios
            .post("/api/register", data)
            .then(() => {
                toast.success("Success!");
                router.push("/login");
            })
            .catch((err) => {
                toast.error("Something Went Wrong");
            })
            .finally(() => {});
    };

    return (
        <>
            <div
                className="
                flex 
                flex-col
                justify-center
                items-center
                bg-yellow-100
                w-2/5    
                mx-auto
                mt-40
                border-amber-500
            "
            >
                <h2 className="text-amber-500 m-auto mt-10 text-2xl hidden lg:block">
                    코리안타임에 오신 것을 환영합니다.
                </h2>
                <p className="text-amber-500 text-2xl mt-10">회원가입</p>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col p-10 w-full"
                >
                    <span className="text-amber-500">이메일</span>
                    <Input {...register("email")} />
                    <span className="mt-3 text-amber-500">닉네임</span>
                    <Input {...register("nickname")} />
                    <span className="mt-3 text-amber-500">비밀번호</span>
                    <PwInput {...register("password")} />
                    <span className="mt-3 text-amber-500">비밀번호확인</span>
                    <PwInput {...register("pwCheck")} />

                    <Button full>회원가입</Button>
                </form>
            </div>
        </>
    );
};

export default RegisterForm;
