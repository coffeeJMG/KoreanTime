"use client";

import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SlLogout } from "react-icons/sl";
import { CombinedType, currentUserType } from "../../types";
import { useInviteModal } from "../../hooks/useInviteModal";
import { useDeleteSchedule } from "../../hooks/useDeleteScheduleModal";
import { getCurrentTime } from "../../actions/getCurrentTime";
import { useShceduleIdStore } from "../../stores/scheduleIdStore";
import React from "react";
import { Button } from "../../components/Button";
import { size } from "../../types/constant";
import useGetCurrentLocation from "../../actions/getCurrentLocation";
import getUserDistance from "@/app/actions/getUserDistance";
import { useRankingStore } from "@/app/stores/ranking";

type RankingsType = {
    [email: string]: number;
};

type MapLoadingForUserType = {
    [key: string]: boolean;
};
const MapLoader = dynamic(() => import("../../components/MapLoader"), {
    ssr: false,
});

type MemberLocation = {
    id: string;
    lat: number;
    lng: number;
    memberEmail: string;
    scheduleId: string;
};
type ScheduleProps = CombinedType & currentUserType;

const Schedule: React.FC<ScheduleProps> = ({ schedule, currentUser }) => {
    const inviteModal = useInviteModal(); // 초대장 모달
    const currentLocation = useGetCurrentLocation(); // 유저의 현재위치

    const [dDay, setdDay] = useState(false); // 약속 날짜가 오늘 판단
    const [isLastThirtyMinutes, setIsLastThirtyMinutes] = useState(false); // 남은 시간이 30분인지 판단
    const [isLastTenMinutes, setIsLastTenMinutes] = useState(false); // 남은 시간이 5분인지 판단
    const [isButtonDisabled, setIsButtonDisabled] = useState(false); // 버튼 비활성화 상태
    const deleteScheduleModal = useDeleteSchedule(); // 모임시간 도달 시 모달창 오픈
    const [membersLocation, setMembersLocation] = useState<MemberLocation[]>(
        [],
    );
    const router = useRouter();
    const { setUpdateRanking, updateRanking } = useRankingStore();
    const currentUserMail = currentUser?.email; // 현재 로그인한 유저
    const [mapLoadingForUser, setMapLoadingForUser] = // 유저의 지도 열람여부 관리
        useState<MapLoadingForUserType>({});

    const initialTimeData = getCurrentTime(); // 현재시간의 정보를 담은 변수
    const [today, setToday] = useState(initialTimeData.today); // 오늘 날짜
    const [currentTime, setCurrentTime] = useState(initialTimeData.currentTime); // 현재시간
    const [hours, setHours] = useState(initialTimeData.hours); //  시간
    const [minutes, setMinutes] = useState(initialTimeData.minutes); //  분
    const [seconds, setSeconds] = useState(initialTimeData.seconds); //  초

    // 매 초마다 시간 반영
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

    // 유저의 위치 정보를 모임 멤버들의 위치를 담은 db에 저장 및 모임 유저들의 위치를 받아오는 함수
    useEffect(() => {
        const saveAndFetchLocations = async () => {
            try {
                const response = await axios.post("/api/userLocation", {
                    email: currentUserMail,
                    lat: userLat,
                    lng: userLng,
                    scheduleId: schedule.id,
                });

                if (response.status === 200) {
                    // 위치 정보 저장 성공 후 멤버 위치 정보 불러오기

                    const memberLocationsResponse = await axios.post(
                        "/api/getMembersLocation",
                        {
                            scheduleId: schedule.id,
                        },
                    );

                    // 여기에서 memberLocationsResponse.data를 사용하여 원하는 동작을 수행하실 수 있습니다.

                    setMembersLocation(memberLocationsResponse.data);
                } else {
                    console.log("위치 정보 저장에 실패하였습니다.");
                }
            } catch (error) {
                console.error(
                    "위치 정보 저장 또는 멤버 위치 정보 불러오기 중 에러가 발생하였습니다.",
                    error,
                );
            }
        };

        saveAndFetchLocations();
    }, [userLat, userLng, schedule.id]);

    const memberList = schedule.members; // 현재 모임에 속한 인원
    const meetingTime = Number(schedule.time?.replace(":", "") + "0" + "0"); // 모임시간
    const timerTime = Number(hours + minutes + seconds); // 현재시간

    // 시간 계산을 위한 시간 변경 함수
    function toSeconds(time: number) {
        const hours = Math.floor(time / 10000);
        const minutes = Math.floor((time % 10000) / 100);
        const seconds = time % 100;
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

    // 모임 삭제 함수
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
        if (countDown <= 1800 && countDown > 0 && dDay) {
            setIsLastThirtyMinutes(true);
            setIsButtonDisabled(true);
        } else {
            setIsLastThirtyMinutes(false);
            setIsButtonDisabled(false);
        }

        // 남은 시간이 10분 이하인지 확인
        if (countDown <= 600 && countDown > 0 && dDay) {
            setIsLastTenMinutes(true);
            setIsLastThirtyMinutes(false);
        } else {
            setIsLastTenMinutes(false);
        }

        // 오늘이 모임 날짜인지 확인
        if (schedule.date === today) {
            setdDay(true);
        }

        // 모임시간 도달 시 모임 종료 모달 오픈
        if (countDown == 0 && dDay) {
            axios.post("/api/rankingPoint", {
                membersRanking: updateRanking,
            });
            deleteScheduleModal.onOpen();
        }

        // 모임 시간 1분뒤에 모임삭제
        if (countDown == -60 && dDay) {
            handleDeleteModal();
            deleteScheduleModal.onClose();
            router.push("/startPage");
        }
    }, [countDown]);

    // 선택된 유저의 자리만 위치 지도 공개
    const handleMapLoading = (
        e: React.MouseEvent<HTMLElement>,
        email: string,
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

    useEffect(() => {
        // 1. 각 유저의 도착지점 까지의 거리를 객체로 생성
        const distances = membersLocation.map((member) => {
            const distance = getUserDistance(lat, lng, member.lat, member.lng);
            return {
                email: member.memberEmail,
                distance: distance,
            };
        });

        // 2. 해당 배열을 거리 기준으로 오름차순으로 정렬
        distances.sort((a, b) => a.distance - b.distance);

        // 3. 정렬된 배열을 순회하면서 이메일을 키로, 등수를 값으로 하는 객체
        const rankings: RankingsType = {};
        distances.forEach((member, index) => {
            rankings[member.email] = index + 1; // 이메일: 등수 형태로 저장
        });
        setUpdateRanking(rankings);
    }, [membersLocation]);

    const cancelSchedule = async () => {
        await axios.post("/api/cancelSchedule", {
            id: currentUser?.email,
            scheduleId: schedule.id,
        });

        router.push("/startPage");
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
                <div className="w-1/2">
                    <MapLoader
                        lat={lat}
                        lng={lng}
                        membersLocation={membersLocation}
                        height="780px"
                        id={`map-${schedule.id}`}
                    />
                </div>

                <div className="flex flex-col w-1/2">
                    {memberList.map((member, index) => {
                        // 해당 멤버의 위치 정보를 membersLocation에서 찾는다.
                        const location = membersLocation.find(
                            (loc) => loc.memberEmail === member.email,
                        );

                        const isLastThreeUsers = index >= memberList.length - 3;

                        return (
                            <div
                                className="border-solid border-2 border-neutral-400 w-full box-sizing:border-box"
                                key={member.email}
                            >
                                {isLastThreeUsers &&
                                mapLoadingForUser[member.email] ? (
                                    <div className="w-full">
                                        <MapLoader
                                            id={`map-${member.email}`}
                                            lat={location ? location.lat : 0} // defaultLat은 임의의 디폴트 위도값
                                            lng={location ? location.lng : 0} // defaultLng은 임의의 디폴트 경도값
                                            height="200px"
                                        />
                                    </div>
                                ) : null}

                                <div className="flex justify-between p-5">
                                    <div>
                                        <p
                                            className={`${size.titleSize}`}
                                            onClick={(e) =>
                                                handleMapLoading(
                                                    e,
                                                    member.email,
                                                )
                                            }
                                        >
                                            {member.nickname}
                                        </p>
                                        <p>{member.point}</p>
                                    </div>

                                    {(currentUser?.email === member.email ||
                                        currentUser?.email ===
                                            schedule.hostUser) && (
                                        <SlLogout
                                            size={30}
                                            onClick={cancelSchedule}
                                            className="cursor-pointer"
                                        />
                                    )}
                                </div>

                                {!isLastThreeUsers &&
                                mapLoadingForUser[member.email] ? (
                                    <div className="w-full">
                                        <MapLoader
                                            id={`map-${member.email}`}
                                            lat={location ? location.lat : 0}
                                            lng={location ? location.lng : 0}
                                            height="200px"
                                        />
                                    </div>
                                ) : null}
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default Schedule;
