"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useRouter } from "next/navigation";

interface IFormInput {
    email: string;
    password: string;
}

const LoginForm = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormInput>({
        defaultValues: {
            email: "",
            password: "",
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
                <p className="text-amber-500 text-2xl">로그인</p>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col p-10 w-full"
                >
                    <span className="text-amber-500">이메일</span>
                    <Input {...register("email")} />
                    <span className="mt-3 text-amber-500">비밀번호</span>
                    <Input {...register("password")} />

                    <div>
                        <Button full>로그인</Button>
                    </div>
                </form>

                <div className="flex">
                    <span className="text-amber-400 mr-3 mb-10">
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
