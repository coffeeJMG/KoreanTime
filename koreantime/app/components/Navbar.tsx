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
            <div className="grid grid-cols-[1fr,3fr,1fr] items-center gap-3 p-10 md:p-15 mt-3 relative border-b-2">
                <div>
                    <CgSandClock size={32} />
                </div>

                <div className="justify-self-center">
                    <p
                        className={`text-xl md:text-3xl cursor-pointer`}
                        onClick={() => router.push("/startPage")}
                    >
                        일찍 와주길 바래
                    </p>
                </div>

                <div className="flex justify-end gap-3 items-center flex-col md:flex-row">
                    {currentUser ? (
                        <p className="text-sm md:text-xl">
                            {currentUser.name}{" "}
                        </p>
                    ) : null}
                    <div className="flex flex-row gap-1">
                        <FcInvite
                            className="cursor-pointer"
                            size={32}
                            onClick={invitationModal.onOpen}
                        />
                        <AiOutlineHome
                            className="cursor-pointer pb-1"
                            onClick={() => router.push("/startPage")}
                            size={32}
                        />
                        <SlLogout
                            className="cursor-pointer pb-2"
                            onClick={async () =>
                                await signOut({
                                    callbackUrl:
                                        "https://korean-time.com/login",
                                })
                            }
                            size={32}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};
