"use client";

import { SlLogout } from "react-icons/sl";
import { CgSandClock } from "react-icons/cg";
import { AiOutlineHome } from "react-icons/ai";
import { currentUserType } from "../types";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { size } from "../types/constant";

export const Navbar: React.FC<currentUserType> = ({ currentUser }) => {
    const router = useRouter();

    useEffect(() => {
        if (!currentUser) {
            router.push("/login");
        }
    }, [currentUser, router]);

    return (
        <>
            <div className="py-4 border-b-[5px] w-full">
                <div className="flex flex-row items-center justify-between gap-3 md:gap-0 px-10">
                    <CgSandClock size={28} />
                    <p
                        className={`${size.bannerSize}`}
                        onClick={() => {
                            router.push("/login");
                        }}
                    >
                        Korean Time
                    </p>
                    <div className="flex justify-end gap-3">
                        {currentUser ? (
                            <p>{currentUser.name}님 안녕하세요 </p>
                        ) : null}
                        <AiOutlineHome
                            className="cursor-pointer"
                            onClick={() => router.push("/startPage")}
                            size={28}
                        />
                        <SlLogout
                            className="cursor-pointer"
                            onClick={async () => {
                                await signOut();
                            }}
                            size={28}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};
