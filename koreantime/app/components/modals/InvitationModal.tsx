"use client";

import { useCallback, useState } from "react";
import { Modal } from "./Modal";
import { useInvitationModal } from "@/app/hooks/useInvitationModal";
import { Button } from "../Button";
import axios from "axios";

type InvitedSchedule = {
    invitedSchedule: string | null;
};

type invitationListProps = {
    invitationList: InvitedSchedule[] | null;
};

export const InvitationModal: React.FC<invitationListProps> = ({
    invitationList,
}) => {
    if (!invitationList) {
        return <div>초대장이 없습니다</div>;
    }
    const invitationModal = useInvitationModal();

    const [isLoading, setIsLoading] = useState(false);

    const handleClose = useCallback(() => {
        setTimeout(() => {}, 300);
    }, []);

    const rejectInvitation = async (data: string | null) => {
        await axios.delete("/api/invitationResponse", {
            data: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
        });
    };

    const onSubmit = () => {};
    const bodyContent = (
        <>
            <p>초대장 리스트</p>
            {invitationList?.map((item, i) => {
                return (
                    <div className="flex flex-col gap-4" key={i}>
                        <div className="flex flex-row items-center gao-4">
                            <div className="">{item.invitedSchedule}</div>
                            <Button>수락</Button>
                            <Button
                                onClick={(e) => {
                                    rejectInvitation(item.invitedSchedule);
                                }}
                            >
                                거절
                            </Button>
                        </div>
                    </div>
                );
            })}
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
