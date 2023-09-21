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
            <div className="grid grid-cols-3 items-center gap-3 p-5 mt-3 relative border-b-orange-400 border-b-2">
                <div>
                    <CgSandClock size={64} />
                </div>

                <div className="justify-self-center">
                    <p
                        className={`${size.mobileBanner} md:${size.bannerSize} cursor-pointer`}
                        onClick={() => router.push("/startPage")}
                    >
                        일찍 와주길 바래
                    </p>
                </div>

                <div className="flex justify-end gap-3 items-center">
                    {currentUser ? <p>{currentUser.name} </p> : null}
                    <FcInvite
                        className="cursor-pointer"
                        size={64}
                        onClick={invitationModal.onOpen}
                    />
                    <AiOutlineHome
                        className="cursor-pointer pb-1"
                        onClick={() => router.push("/startPage")}
                        size={64}
                    />
                    <SlLogout
                        className="cursor-pointer pb-2"
                        onClick={async () => await signOut()}
                        size={64}
                    />
                </div>
            </div>
        </>
    );
};
