"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

interface IFormInput {
    email: string;
    password: string;
    nickname: string;
    pwCheck: string;
}

const RegisterForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormInput>({
        defaultValues: {
            email: "",
            password: "",
            nickname: "",
            pwCheck: "",
        },
    });

    const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

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
                <h2 className="text-amber-500 m-auto mt-10 mb-10 text-2xl">
                    당신은 오늘도 지각입니까?
                </h2>
                <p className="text-amber-500 text-2xl">회원가입</p>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col p-10 w-full"
                >
                    <span className="text-amber-500">이메일</span>
                    <Input {...register("email")} />
                    <span className="mt-3 text-amber-500">닉네임</span>
                    <Input {...register("nickname")} />
                    <span className="mt-3 text-amber-500">비밀번호</span>
                    <Input {...register("email")} />
                    <span className="mt-3 text-amber-500">비밀번호확인</span>
                    <Input {...register("pwCheck")} />
                    <div className="flex justify-around mt-4">
                        <Button>회원가입</Button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default RegisterForm;
