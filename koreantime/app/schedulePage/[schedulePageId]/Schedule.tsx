"use client";

import getCurrentLocation from "@/app/actions/getCurrentLocation";
import { getCurrentTime } from "@/app/actions/getCurrentTime";
import { Button } from "@/app/components/Button";

import { useDeleteSchedule } from "@/app/hooks/useDeleteScheduleModal";
import { useInviteModal } from "@/app/hooks/useInviteModal";
import { useShceduleIdStore } from "@/app/stores/scheduleIdStore";
import { CombinedType, currentUserType } from "@/app/types";
import { size } from "@/app/types/constant";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { SlLogout } from "react-icons/sl";

type ScheduleType = CombinedType & currentUserType;

type MapLoadingForUserType = {
    [key: string]: boolean;
};
const MapLoader = dynamic(() => import("../../components/MapLoader"), {
    ssr: false,
});
export const Schedule: React.FC<ScheduleType> = ({ schedule, currentUser }) => {
    const inviteModal = useInviteModal(); // 초대장 모달
    const currentLocation = getCurrentLocation(); // 유저의 현재위치 // 오늘 날짜, 현재 시간, 시,분,초
    const [dDay, setdDay] = useState(false); // 약속 날짜가 오늘 판단
    const [isLastThirtyMinutes, setIsLastThirtyMinutes] = useState(false); // 남은 시간이 30분인지 판단
    const [isLastTenMinutes, setIsLastTenMinutes] = useState(false); // 남은 시간이 5분인지 판단
    const [isButtonDisabled, setIsButtonDisabled] = useState(false); // 버튼 비활성화 상태
    const deleteScheduleModal = useDeleteSchedule(); // 모임시간 도달 시 모달창 오픈
    const router = useRouter();
    const [mapLoading, setMapLoading] = useState(false);
    const [mapLoadingForUser, setMapLoadingForUser] =
        useState<MapLoadingForUserType>({});

    const initialTimeData = getCurrentTime();
    const [today, setToday] = useState(initialTimeData.today);
    const [currentTime, setCurrentTime] = useState(initialTimeData.currentTime);
    const [hours, setHours] = useState(initialTimeData.hours);
    const [minutes, setMinutes] = useState(initialTimeData.minutes);
    const [seconds, setSeconds] = useState(initialTimeData.seconds);

    useEffect(() => {
        const interval = setInterval(() => {
            const updatedTime = getCurrentTime();
            setToday(updatedTime.today);
            setCurrentTime(updatedTime.currentTime);
            setHours(updatedTime.hours);
            setMinutes(updatedTime.minutes);
            setSeconds(updatedTime.seconds);
        }, 1000);

        return () => clearInterval(interval); // 컴포넌트가 언마운트될 때 타이머를 정리합니다.
    }, []);

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

    // 유저의 위치 위도,경도 값
    const userLat = currentLocation.coordinates.lat;
    const userLng = currentLocation.coordinates.lng;

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
    const [countDown, setCountDown] = useState(meetingTimeSeconds); // 남은 시간 state 관리

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
    }, []);

    const handleDeleteModal = async () => {
        try {
            const res = await axios.post("/api/schedulePage", {
                id: schedule.id,
            });
            if (res.status === 200) {
                console.log("모임을 삭제했습니다.");
            }
        } catch (erros) {
            console.log(erros);
        }
    };
    useEffect(() => {
        // 남은 시간이 30분 이하인지 확인
        if (countDown <= 1800 && countDown > 0) {
            setIsLastThirtyMinutes(true);
            setIsButtonDisabled(true);
        } else {
            setIsLastThirtyMinutes(false);
            setIsButtonDisabled(false);
        }

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

        if (countDown == 0) {
            deleteScheduleModal.onOpen();
        }

        // 모임 시간 1분뒤에 모임삭제
        if (countDown < -60) {
            handleDeleteModal();
            deleteScheduleModal.onClose();
            router.push("/startPage");
        }
    }, [countDown]);

    const handleMapLoading = (
        e: React.MouseEvent<HTMLElement>,
        email: string
    ) => {
        setMapLoadingForUser((prev) => {
            // 같은 유저를 다시 클릭한 경우
            if (prev[email]) {
                return { ...prev, [email]: false };
            }

            // 나머지 유저의 지도를 모두 닫고, 클릭한 유저의 지도만 열기
            const newState = Object.keys(prev).reduce((acc, currEmail) => {
                acc[currEmail] = false;
                return acc;
            }, {} as MapLoadingForUserType);

            newState[email] = true;
            return newState;
        });
    };

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

            <div className="flex flex-row w-full gap-10">
                <MapLoader lat={lat} lng={lng} height="780px" />
                <div className="flex flex-col w-1/2">
                    {memberList.map((item, index) => {
                        const isLastThreeUsers = index >= memberList.length - 3;

                        return (
                            <div
                                className="border-solid border-2 border-neutral-400 w-full 	box-sizing:border-box"
                                key={item.email}
                            >
                                {/* 6, 7, 8번 유저에 대한 지도는 박스 위쪽에 표시 */}
                                {isLastThreeUsers &&
                                mapLoadingForUser[item.email] ? (
                                    <MapLoader
                                        lat={userLat}
                                        lng={userLng}
                                        height="200px"
                                    />
                                ) : null}

                                <div className="flex justify-between p-5">
                                    <p
                                        className={`${size.titleSize}`}
                                        onClick={(e) =>
                                            handleMapLoading(e, item.email)
                                        }
                                    >
                                        {item.nickname}
                                    </p>
                                    <SlLogout size={30} />
                                </div>

                                {/* 1,2,3,4,5번 유저의 지도는 박스 아래쪽에 */}
                                {!isLastThreeUsers &&
                                mapLoadingForUser[item.email] ? (
                                    <MapLoader
                                        lat={userLat}
                                        lng={userLng}
                                        height="200px"
                                    />
                                ) : null}
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};
