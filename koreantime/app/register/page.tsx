"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";

export interface IFormInput {
    email: string;
    password: string;
    nickname?: string;
    pwCheck: string;
    name?: string;
}

const RegisterForm = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm<IFormInput>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            nickname: "",
            pwCheck: "",
        },
    });

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        try {
            await axios.post("/api/register", data);
            toast.success("Success!");
            router.push("/login");
        } catch (errors) {
            toast.error("오류가 발생했습니다.");
            console.log(errors);
        }
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
                    <span className="text-amber-500">이름</span>
                    <Input
                        type="text"
                        {...register("name", {
                            required: "이름을 입력해주세요",
                        })}
                        placeholder="이름을 입력해주세요"
                    />
                    {errors?.name ? (
                        <p className="text-rose-700 ml-2 mt-1 text-sm">
                            {errors?.name?.message}
                        </p>
                    ) : null}
                    <span className="text-amber-500">이메일</span>
                    <Input
                        type="text"
                        {...register("email", {
                            required: "이메일을 입력해주세요",
                            pattern: {
                                value: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{3,3}$/i,
                                message: "이메일 형식이 맞지않습니다.",
                            },
                        })}
                        placeholder="abc@abc.com"
                    />
                    {errors?.email ? (
                        <p className="text-rose-700 ml-2 mt-1 text-sm">
                            {errors?.email?.message}
                        </p>
                    ) : null}
                    <span className="mt-3 text-amber-500">닉네임</span>
                    <Input
                        placeholder={"2글자 이상 입력해주세요"}
                        type="text"
                        {...register("nickname", {
                            required: "닉네임을 입력해주세요",
                            minLength: {
                                value: 2,
                                message: "2글자 이상 입력해주세요",
                            },
                            pattern: {
                                value: /^[a-zA-Z가-힣0-9]+$/,
                                message:
                                    "한글, 숫자, 영어 대소문자만 입력해주세요.",
                            },
                        })}
                    />
                    {errors?.nickname ? (
                        <p className="text-rose-700 ml-2 mt-1 text-sm">
                            {errors?.nickname?.message}
                        </p>
                    ) : null}
                    <span className="mt-3 text-amber-500">비밀번호</span>
                    <Input
                        type="password"
                        placeholder={"6글자 이상 입력해주세요"}
                        {...register("password", {
                            required: "비밀번호를 입력해주세요",
                            minLength: {
                                value: 6,
                                message: "6글자 이상 입력해주세요",
                            },
                        })}
                    />
                    {errors?.password ? (
                        <p className="text-rose-700 ml-2 mt-1 text-sm">
                            {errors?.password?.message}
                        </p>
                    ) : null}
                    <span className="mt-3 text-amber-500">비밀번호확인</span>
                    <Input
                        type="password"
                        placeholder={"6글자 이상 입력해주세요"}
                        {...register("pwCheck", {
                            required: "비밀번를 다시 한 번 입력해주세요",
                            minLength: {
                                value: 6,
                                message: "6글자 이상 입력해주세요",
                            },
                            validate: {
                                check: (val) => {
                                    if (getValues("password") !== val) {
                                        return "비밀번호가 일치하지 않습니다.";
                                    }
                                },
                            },
                        })}
                    />
                    {errors?.pwCheck ? (
                        <p className="text-rose-700 ml-2 mt-1 text-sm">
                            {errors?.pwCheck?.message}
                        </p>
                    ) : null}
                    <Button full>회원가입</Button>
                </form>
            </div>
        </>
    );
};

export default RegisterForm;
