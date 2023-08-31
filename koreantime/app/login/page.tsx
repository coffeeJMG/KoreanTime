"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import { IFormInput } from "../register/page";
import React from "react";

const LoginForm = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<IFormInput>({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        try {
            const callback = await signIn("credentials", {
                ...data,
                redirect: false,
            });

            if (callback?.ok) {
                toast.success("Logged in");
                router.refresh();
                router.push("/startPage");
            } else if (callback?.error) {
                if (callback.status !== 200) {
                    console.log(callback.error);
                }
                toast(callback.error);
            }
        } catch (error) {
            console.error("An error occurred:", error);
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
                <p className="text-amber-500 text-2xl mt-10">로그인</p>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col p-10 w-full"
                >
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
                    <div>
                        <Button full>로그인</Button>
                    </div>
                </form>

                <div className="flex">
                    <span className="text-amber-400 mr-3 mb-10 hidden sm:block">
                        아직 계정이 없으시다면!
                    </span>
                    <span
                        className="text-amber-500 cursor-pointer"
                        onClick={() => {
                            router.push("/register");
                        }}
                    >
                        회원가입
                    </span>
                </div>
            </div>
        </>
    );
};

export default LoginForm;
