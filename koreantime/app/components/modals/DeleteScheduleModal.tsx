"use client";

import { Modal } from "./Modal";

import { useDeleteSchedule } from "@/app/hooks/useDeleteScheduleModal";
import { useCallback } from "react";

export const DeleteScheduleModal = () => {
    const deleteScheduleModal = useDeleteSchedule();

    // const handleClose = useCallback(() => {
    //     deleteScheduleModal.onClose();
    // }, [deleteScheduleModal]);

    const bodyContent = (
        <>
            <div> 1분뒤에 이 모임은 사라집니다.</div>
        </>
    );

    return (
        <>
            <Modal
                isOpen={deleteScheduleModal.isOpen}
                title="모임 종료"
                onClose={deleteScheduleModal.onClose}
                body={bodyContent}
            ></Modal>
        </>
    );
};
