"use client";

import getCurrentLocation from "@/app/actions/getCurrentLocation";
import { getCurrentTime } from "@/app/actions/getCurrentTime";
import { Button } from "@/app/components/Button";
import { MapLoader } from "@/app/components/MapLoader";
import { useInviteModal } from "@/app/hooks/useInviteModal";
import { useShceduleIdStore } from "@/app/stores/scheduleIdStore";
import { CombinedType, currentUserType } from "@/app/types";
import { colors, size } from "@/app/types/constant";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

type ScheduleType = CombinedType & currentUserType;

export const Schedule: React.FC<ScheduleType> = ({ schedule, currentUser }) => {
    const inviteModal = useInviteModal(); // 초대장 모달
    const currentLocation = getCurrentLocation(); // 유저의 현재위치
    const { today, currentTime, hours, minutes, seconds } = getCurrentTime(); // 오늘 날짜, 현재 시간, 시,분,초
    const [dDay, setdDay] = useState(false); // 약속 날짜가 오늘 판단
    const [isLastThirtyMinutes, setIsLastThirtyMinutes] = useState(false); // 남은 시간이 30분인지 판단
    const [isLastTenMinutes, setIsLastTenMinutes] = useState(false); // 남은 시간이 5분인지 판단
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    // 일정 관련 정보 상태관리
    const { setScheduleId, setMaximumPeople, setMemberLegnth, setTitle } =
        useShceduleIdStore();

    // 일정 관련 정보 state 관리
    useEffect(() => {
        setScheduleId(schedule.id);
        setMaximumPeople(schedule.maximumPeople);
        setMemberLegnth(schedule.members.length);
        setTitle(schedule.title);
    }, []);

    // 모임장소 위도,경도 값
    const lat = Number(schedule.lat);
    const lng = Number(schedule.lng);

    // 유저 위치 찾지 못하는 경우 에러 알람
    if (!currentLocation.coordinates) {
        return toast.error("유저의 현재 위치를 찾을 수 없습니다.");
    }

    // 유저의 위치 위도,경도 값
    const userLat = currentLocation.coordinates?.lat;
    const userLng = currentLocation.coordinates?.lng;

    const memberList = schedule.members; // 현재 모임에 속한 인원

    const meetingTime = Number(schedule.time?.replace(":", "") + "0" + "0"); // 모임시간
    const timerTime = Number(hours + minutes + seconds); // 현재시간

    // 시간 계산을 위한 시간 변경 함수
    function toSeconds(time: number) {
        let hours = Math.floor(time / 10000);
        let minutes = Math.floor((time % 10000) / 100);
        let seconds = time % 100;
        return hours * 3600 + minutes * 60 + seconds;
    }

    // 모임시간과 현재시간 변환
    const meetingTimeSeconds = toSeconds(meetingTime);
    const timerTimeSeconds = toSeconds(timerTime);

    // 모임시간까지 남은 시간을 타이머가 작동할 때마다 최신화
    useEffect(() => {
        const diff = meetingTimeSeconds - timerTimeSeconds;
        setCountDown(diff);
    }, [timerTimeSeconds]); // 모임시간 까지 남은시간
    const [countDown, setCountDown] = useState(0); // 남은 시간 state 관리

    // 1초씩 줄어드는 타이머 함수
    useEffect(() => {
        const intervalId = setInterval(() => {
            if (countDown > 0) {
                setCountDown((prevCount) => prevCount - 1);
            } else {
                clearInterval(intervalId);
            }
        }, 1000);

        return () => clearInterval(intervalId); // useEffect가 종료될 때 실행될 cleanup 함수
    }, [countDown]);

    useEffect(() => {
        // 남은 시간이 30분 이하인지 확인
        if (countDown <= 1800 && countDown > 0) {
            setIsLastThirtyMinutes(true);
            setIsButtonDisabled(true);
        } else {
            setIsLastThirtyMinutes(false);
            setIsButtonDisabled(false);
        }

        const test = async () => {
            try {
                const res = await axios.post("/api/schedulePage", {
                    id: schedule.id,
                });
                if (res.status === 200) {
                    console.log(res.data);
                }
            } catch (erros) {
                console.log(erros);
            }
        };
        // 남은 시간이 10분 이하인지 확인
        if (countDown <= 600 && countDown > 0) {
            setIsLastTenMinutes(true);
            setIsLastThirtyMinutes(false);
        } else {
            setIsLastTenMinutes(false);
        }

        // 오늘이 모임 날짜인지 확인
        if (schedule.date === today) {
            setdDay(true);
        }

        if (countDown === -60) {
            test();
        }
    }, [countDown]);

    return (
        <>
            <div className="w-full flex justify-center gap-10 mb-3 items-stretch">
                <Button big>
                    {currentTime}
                    {dDay && isLastTenMinutes ? (
                        <p className="blinking">
                            남은시간 {Math.floor(countDown / 60)} :{" "}
                            {countDown % 60}
                        </p>
                    ) : null}
                    {dDay && isLastThirtyMinutes ? (
                        <p>
                            남은시간 {Math.floor(countDown / 60)} :{" "}
                            {countDown % 60}
                        </p>
                    ) : null}
                </Button>
                <Button
                    disabled={isButtonDisabled}
                    onClick={inviteModal.onOpen}
                    big
                >
                    초대하기
                    {dDay && isButtonDisabled ? (
                        <p>초대는 30분 전까지만 가능합니다.</p>
                    ) : null}
                </Button>
            </div>

            <div className="flex flex-row w-full">
                <div className="flex flex-col w-1/2">
                    {memberList.map((item) => {
                        return (
                            <div
                                className="border-solid border-2 border-neutral-400 w-full 	box-sizing:border-box"
                                key={item.email}
                            >
                                <div>
                                    <p>{item.nickname}</p>
                                </div>
                                <MapLoader
                                    lat={userLat}
                                    lng={userLng}
                                    height="300px"
                                />
                            </div>
                        );
                    })}
                </div>
                <MapLoader lat={lat} lng={lng} height="450px" />
            </div>
        </>
    );
};
