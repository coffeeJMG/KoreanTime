"use client";

import { useCallback, useState, useEffect } from "react";
import { Modal } from "./Modal";
import { useInvitationModal } from "@/app/hooks/useInvitationModal";
import { Button } from "../Button";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

type InvitedSchedule = {
    invitedSchedule: string | null;
};

type invitationListProps = {
    invitationList: InvitedSchedule[] | null;
};

export const InvitationModal: React.FC<invitationListProps> = ({
    invitationList,
}) => {
    const invitationModal = useInvitationModal();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [invitation, setInvitation] = useState<InvitedSchedule[] | null>(
        invitationList
    );

    useEffect(() => {
        setInvitation(invitationList);
    }, [invitationList]);

    const handleClose = useCallback(() => {
        setTimeout(() => {
            invitationModal.onClose();
        }, 300);
    }, []);

    const rejectInvitation = async (data: string | null) => {
        const res = await axios.delete("/api/invitationResponse", {
            data: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
        });

        if (res.status === 200) {
            setInvitation((prev) =>
                prev
                    ? prev.filter((invite) => invite.invitedSchedule !== data)
                    : null
            );
        }
        toast.success(res.data);
    };

    const joinSchedule = async (data: string | null) => {
        const res = await axios.post(
            "/api/invitationResponse",
            JSON.stringify(data),
            {
                headers: { "Content-Type": "application/json" },
            }
        );

        // toast.success(res.data);
    };

    const onSubmit = () => {};
    const bodyContent = (
        <>
            <p>초대장 리스트</p>
            {invitation ? (
                invitation.map((item, i) => {
                    return (
                        <div className="flex flex-col gap-4" key={i}>
                            <div className="flex flex-row items-center gao-4">
                                <div className="">{item.invitedSchedule}</div>
                                <Button
                                    onClick={() =>
                                        joinSchedule(item.invitedSchedule)
                                    }
                                >
                                    수락
                                </Button>
                                <Button
                                    onClick={() => {
                                        rejectInvitation(item.invitedSchedule);
                                    }}
                                >
                                    거절
                                </Button>
                            </div>
                        </div>
                    );
                })
            ) : (
                <>
                    <p>초대장이 없습니다.</p>
                </>
            )}
        </>
    );
    return (
        <>
            <Modal
                disabled={isLoading}
                isOpen={invitationModal.isOpen}
                title="초대장 리스트"
                onClose={invitationModal.onClose}
                body={bodyContent}
                children={undefined}
            />
        </>
    );
};
