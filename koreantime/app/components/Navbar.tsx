"use client";

import { SlLogout } from "react-icons/sl";
import { CgSandClock } from "react-icons/cg";
import { AiOutlineHome } from "react-icons/ai";
import { currentUserType } from "../types";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { size } from "../types/constant";
import { FcInvite } from "react-icons/fc";
import { useInvitationModal } from "../hooks/useInvitationModal";

export const Navbar: React.FC<currentUserType> = ({ currentUser }) => {
    const router = useRouter();
    const invitationModal = useInvitationModal();

    useEffect(() => {
        if (!currentUser) {
            router.push("/login");
        }
    }, [currentUser, router]);

    return (
        <>
            <div className="grid grid-cols-3 items-center gap-3 px-10 mt-3">
                <div>
                    <CgSandClock size={28} />
                </div>

                <div className="justify-self-center">
                    <p
                        className={`${size.bannerSize} cursor-pointer`}
                        onClick={() => router.push("/startPage")}
                    >
                        일찍 와주길 바래
                    </p>
                </div>

                <div className="flex justify-end gap-3">
                    {currentUser ? (
                        <p>{currentUser.name}님 안녕하세요 </p>
                    ) : null}
                    <FcInvite
                        className="cursor-pointer"
                        size={28}
                        onClick={invitationModal.onOpen}
                    />
                    <AiOutlineHome
                        className="cursor-pointer"
                        onClick={() => router.push("/startPage")}
                        size={28}
                    />
                    <SlLogout
                        className="cursor-pointer"
                        onClick={async () => await signOut()}
                        size={28}
                    />
                </div>
            </div>
        </>
    );
};
