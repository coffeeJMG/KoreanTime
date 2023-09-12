"use client";

import getCurrentLocation from "@/app/actions/getCurrentLocation";
import { getCurrentTime } from "@/app/actions/getCurrentTime";
import { useInviteModal } from "@/app/hooks/useInviteModal";
import { useShceduleIdStore } from "@/app/stores/scheduleIdStore";
import { CombinedType, currentUserType } from "@/app/types";
import { colors } from "@/app/types/constant";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Map, MapMarker, useKakaoLoader } from "react-kakao-maps-sdk";

type ScheduleType = CombinedType & currentUserType;

export const Schedule: React.FC<ScheduleType> = ({ schedule, currentUser }) => {
    const inviteModal = useInviteModal();
    const currentLocation = getCurrentLocation();
    const { today, currentTime, hours, minutes, seconds } = getCurrentTime();
    const [dDay, setdDay] = useState(false);

    const { setScheduleId, setMaximumPeople, setMemberLegnth, setTitle } =
        useShceduleIdStore();

    useEffect(() => {
        setScheduleId(schedule.id);
        setMaximumPeople(schedule.maximumPeople);
        setMemberLegnth(schedule.members.length);
        setTitle(schedule.title);
    }, []);

    const lat = Number(schedule.lat);
    const lng = Number(schedule.lng);

    if (!currentLocation.coordinates) {
        return toast.error("유저의 현재 위치를 찾을 수 없습니다.");
    }

    const userLat = currentLocation.coordinates?.lat;
    const userLng = currentLocation.coordinates?.lng;

    const memberList = schedule.members;
    const loginId = currentUser?.email;

    const { loading, error } = useKakaoLoader({
        appkey: `${process.env.NEXT_PUBLIC_KAKAO_MAPS_JS_KEY}`,
    });

    const meetingTime = Number(schedule.time?.replace(":", "") + "0" + "0");
    const timerTime = Number(hours + minutes + seconds);

    function toSeconds(time: number) {
        let hours = Math.floor(time / 10000);
        let minutes = Math.floor((time % 10000) / 100);
        let seconds = time % 100;
        return hours * 3600 + minutes * 60 + seconds;
    }
    const meetingTimeSeconds = toSeconds(meetingTime);
    const timerTimeSeconds = toSeconds(timerTime);

    const diffSeconds = meetingTimeSeconds - timerTimeSeconds;
    const [countDown, setCountDown] = useState(diffSeconds);
    // Now diffSeconds has the total difference in seconds
    // We can display it as hh:mm:ss using the toHHMMSS function

    // For the countdown, you can use setInterval

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

    // console.log(Math.floor(diffSeconds / 60));
    // console.log(diffSeconds % 60);
    const timerClock = `남은시간 ${Math.floor(diffSeconds / 60)} : ${
        diffSeconds % 60
    } 입니다.`;

    useEffect(() => {
        if (schedule.date === today) {
            setdDay(true);
        }
    }, []);

    return (
        <>
            <div className="w-full ">
                <div
                    className={`
                        text-center
                        mt-3
                        w-1/3
                        h-2/5
                        ${colors.inputColor}
                        ${colors.textColor}
                        p-4
                        rounded-lg
                        hover:scale-[0.98]
                        transition`}
                >
                    {currentTime}
                </div>
                {dDay ? timerClock : null}

                <p onClick={inviteModal.onOpen}>초대하기</p>
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
                                <Map // 지도를 표시할 Container
                                    center={{
                                        // 지도의 중심좌표
                                        lat: userLat,
                                        lng: userLng,
                                    }}
                                    style={{
                                        // 지도의 크기
                                        width: "100%",
                                        height: "200px",
                                    }}
                                    level={3} // 지도의 확대 레벨
                                >
                                    <MapMarker // 마커를 생성합니다
                                        position={{
                                            // 마커가 표시될 위치입니다
                                            lat: userLat,
                                            lng: userLng,
                                        }}
                                    />
                                </Map>
                            </div>
                        );
                    })}
                </div>

                <Map // 지도를 표시할 Container
                    center={{
                        // 지도의 중심좌표
                        lat: lat,
                        lng: lng,
                    }}
                    style={{
                        // 지도의 크기
                        width: "100%",
                        height: "450px",
                    }}
                    level={3} // 지도의 확대 레벨
                >
                    <MapMarker // 마커를 생성합니다
                        position={{
                            // 마커가 표시될 위치입니다
                            lat: lat,
                            lng: lng,
                        }}
                    />
                </Map>
            </div>
        </>
    );
};
