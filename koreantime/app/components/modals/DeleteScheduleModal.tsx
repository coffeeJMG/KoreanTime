"use client";

import { useCallback, useEffect, useState } from "react";
import { Modal } from "./Modal";
import { useDeleteSchedule } from "@/app/hooks/useDeleteScheduleModal";
import { useRankingStore } from "@/app/stores/ranking";
import { size } from "@/app/types/constant";

export const DeleteScheduleModal = () => {
    const deleteScheduleModal = useDeleteSchedule();
    const { updateRanking } = useRankingStore(); // 유저들의 등수를 전역상태관리

    const [bodyContent, setBodyContent] = useState(<></>); // 상태 변수로 변경

    useEffect(() => {
        // 1등부터 순서대로 반환
        const rankingList = Object.entries(updateRanking)
            .sort(([, rankA], [, rankB]) => rankA - rankB)
            .map(([email, rank], index) => (
                <li key={index}>
                    <p className={`${size.titleSize} mb-2`}>
                        {email}: {rank}등
                    </p>
                </li>
            ));

        const newBodyContent = (
            <div>
                <ul>{rankingList}</ul>
            </div>
        );

        setBodyContent(newBodyContent); // 상태 업데이트 함수 사용
    }, [updateRanking]);

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
