"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import { IFormInput } from "../register/page";
import React, { useEffect } from "react";
import { currentUserType } from "../types";
import { colors, size } from "../types/constant";

const LoginForm: React.FC<currentUserType> = ({ currentUser }) => {
    const router = useRouter();

    useEffect(() => {
        if (currentUser) {
            router.push("/startPage");
        }
    }, [currentUser, router]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
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
                router.push("/startPage");
                router.refresh();
            } else if (callback?.error) {
                if (callback.status !== 200) {
                    console.log(callback.error);
                }
                toast(callback.error);
            }
            reset({
                email: "",
                password: "",
            });
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    return (
        <div
            className={`flex flex-col justify-center items-center ${colors.bgColor} 
                    w-full  sm:w-1/2 md:w-1/2 lg:w-2/5 
                    mx-auto mt-10 ${colors.textColor}`}
        >
            <h2
                className={`${colors.textColor} m-auto mt-10 ${size.titleSize} hidden lg:block`}
            >
                환영합니다
            </h2>
            <p className={`${colors.textColor} ${size.titleSize} mt-10`}>
                로그인
            </p>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col p-10 w-full"
            >
                <span className={`${colors.textColor}`}>이메일</span>
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
                    <p
                        className={`${colors.errorColor} ml-2 mt-1 ${size.textSize}`}
                    >
                        {errors?.email?.message}
                    </p>
                ) : null}
                <span className={`${colors.textColor}`}>비밀번호</span>
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
                    <p
                        className={`${colors.errorColor} ml-2 mt-1 ${size.textSize}`}
                    >
                        {errors?.password?.message}
                    </p>
                ) : null}
                <div>
                    <Button full>로그인</Button>
                </div>
            </form>

            <div className="flex">
                <span
                    className={`${colors.textColor} mr-3 mb-10 hidden sm:block`}
                >
                    아직 계정이 없으시다면!
                </span>
                <span
                    className={`${colors.textColor} cursor-pointer`}
                    onClick={() => {
                        router.push("/register");
                    }}
                >
                    회원가입
                </span>
            </div>
        </div>
    );
};

const Login = React.memo(LoginForm);

export default Login;
