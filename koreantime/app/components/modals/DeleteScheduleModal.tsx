"use client";

import { useCallback, useEffect, useState } from "react";
import { Modal } from "./Modal";
import { useDeleteSchedule } from "@/app/hooks/useDeleteScheduleModal";
import { useRankingStore } from "@/app/stores/ranking";

export const DeleteScheduleModal = () => {
    const deleteScheduleModal = useDeleteSchedule();
    const { updateRanking } = useRankingStore();

    const [bodyContent, setBodyContent] = useState(<></>); // 상태 변수로 변경

    useEffect(() => {
        console.log(updateRanking);
        const rankingList = Object.entries(updateRanking)
            .sort(([, rankA], [, rankB]) => rankA - rankB)
            .map(([email, rank], index) => (
                <li key={index}>
                    {email}: {rank}등
                </li>
            ));

        const newBodyContent = (
            <div>
                <ul>{rankingList}</ul>
            </div>
        );

        setBodyContent(newBodyContent); // 상태 업데이트 함수 사용
    }, [updateRanking]);

    const handleClose = useCallback(() => {
        deleteScheduleModal.onClose();
    }, [deleteScheduleModal]);

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
