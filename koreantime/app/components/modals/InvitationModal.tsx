"use client";

import { useState, useEffect } from "react";
import { Modal } from "./Modal";
import { useInvitationModal } from "@/app/hooks/useInvitationModal";
import { Button } from "../Button";
import axios from "axios";
import { toast } from "react-hot-toast";
import useScheduleListStore from "@/app/stores/updateScheduleList";
import { size } from "@/app/types/constant";

type InvitedSchedule = {
    invitedSchedule: string | null;
    title: string;
};

type invitationListProps = {
    invitationList: InvitedSchedule[] | null;
};

const InvitationModal: React.FC<invitationListProps> = ({ invitationList }) => {
    const invitationModal = useInvitationModal(); // 초대 modal open,close 함수
    const [invitation, setInvitation] = useState<InvitedSchedule[] | null>(
        invitationList,
    );

    const { setUpdateScheduleList } = useScheduleListStore(); // 모임 리스트를 전역상태관리

    // 유저가 가진 초대 리스트를 상태저장
    useEffect(() => {
        setInvitation(invitationList);
    }, [invitationList]);

    // 초대 거절
    const rejectInvitation = async (data: string | null) => {
        try {
            const res = await axios.delete("/api/invitationResponse", {
                data: data,
            });

            if (res.status === 200) {
                // 초대장에서 선택된 스케쥴 제외
                setInvitation((prev) =>
                    prev
                        ? prev.filter(
                              (invite) => invite.invitedSchedule !== data,
                          )
                        : null,
                );

                toast.success(JSON.stringify(res.data));
            }
        } catch (error) {
            toast.error("요청 데이터를 확인해주세요");
        }
    };

    //초대수락
    const joinSchedule = async (data: string | null) => {
        try {
            const res = await axios.post(
                "/api/invitationResponse",
                JSON.stringify(data),
                {
                    headers: { "Content-Type": "application/json" },
                },
            );

            if (res.status === 200) {
                // 초대장 리스트에서 수락한 스케쥴 제외
                setInvitation((prev) =>
                    prev
                        ? prev.filter(
                              (invite) => invite.invitedSchedule !== data,
                          )
                        : null,
                );

                toast.success(JSON.stringify(res.data.message));

                const resDate = res.data.scheduleList;

                setUpdateScheduleList(resDate); // 수락된 스케쥴 리스트를 전역상태에 저장
                console.log("수락", resDate);
            }
        } catch (error) {
            toast.error("An error occurred while joining the schedule.");
        }
    };

    const bodyContent = (
        <>
            {invitation ? (
                invitation.map((item, i) => {
                    return (
                        <div className="flex flex-col gap-4" key={i}>
                            <div className="flex flex-row items-center justify-between ">
                                <div className={`${size.titleSize}`}>
                                    모임명 : {item.title}
                                </div>
                                <div className="flex w-1/2 gap-4">
                                    <Button
                                        full
                                        onClick={() =>
                                            joinSchedule(item.invitedSchedule)
                                        }
                                    >
                                        수락
                                    </Button>
                                    <Button
                                        full
                                        onClick={() => {
                                            rejectInvitation(
                                                item.invitedSchedule,
                                            );
                                        }}
                                    >
                                        거절
                                    </Button>
                                </div>
                            </div>
                        </div>
                    );
                })
            ) : (
                <>
                    <p className={`${size.titleSize} flex justify-center`}>
                        초대장이 없습니다.
                    </p>
                </>
            )}
        </>
    );
    return (
        <>
            <Modal
                isOpen={invitationModal.isOpen}
                title="초대장 리스트"
                onClose={invitationModal.onClose}
                body={bodyContent}
            />
        </>
    );
};

export default InvitationModal;
