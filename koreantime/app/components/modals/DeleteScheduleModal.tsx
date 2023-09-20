"use client";

import { useRankingStore } from "@/app/stores/ranking";
import { Modal } from "./Modal";

import { useDeleteSchedule } from "@/app/hooks/useDeleteScheduleModal";
import { useEffect } from "react";

export const DeleteScheduleModal = () => {
    const deleteScheduleModal = useDeleteSchedule();
    const { updateRanking } = useRankingStore();

    let bodyContent;
    useEffect(() => {
        console.log(updateRanking);
        const rankingList = Object.entries(updateRanking)
            .sort(([, rankA], [, rankB]) => rankA - rankB) // 순위에 따라 정렬
            .map(([email, rank], index) => (
                <li key={index}>
                    {email}: {rank}등
                </li>
            ));

        bodyContent = (
            <>
                <div>
                    <ul>{rankingList}</ul>
                </div>
            </>
        );
    }, [updateRanking]);

    // const handleClose = useCallback(() => {
    //     deleteScheduleModal.onClose();
    // }, [deleteScheduleModal]);

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
