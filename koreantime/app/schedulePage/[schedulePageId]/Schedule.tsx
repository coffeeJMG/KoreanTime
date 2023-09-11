"use client";

import getCurrentLocation from "@/app/actions/getCurrentLocation";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { useInviteModal } from "@/app/hooks/useInviteModal";
import { useShceduleIdStore } from "@/app/stores/scheduleIdStore";
import { CombinedType, currentUserType } from "@/app/types";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { Map, MapMarker, useKakaoLoader } from "react-kakao-maps-sdk";

type ScheduleType = CombinedType & currentUserType;

export const Schedule: React.FC<ScheduleType> = ({ schedule, currentUser }) => {
    const inviteModal = useInviteModal();
    const currentLocation = getCurrentLocation();

    const { setScheduleId, setMaximumPeople, setMemberLegnth, setTitle } =
        useShceduleIdStore();

    const memberList = schedule.members; // 모임에 속한 인원 명단
    const loginId = currentUser?.email;
    useEffect(() => {
        // 상태관리를 위한 값 저장
        setScheduleId(schedule.id);
        setMaximumPeople(schedule.maximumPeople);
        setMemberLegnth(schedule.members.length);
        setTitle(schedule.title);
    }, []);

    // 모임 장소
    const lat = Number(schedule.lat);
    const lng = Number(schedule.lng);

    if (!currentLocation.coordinates) {
        return toast.error("유저의 현재 위치를 찾을 수 없습니다.");
    }
    const userLat = currentLocation.coordinates?.lat;
    const userLng = currentLocation.coordinates?.lng;

    if (!lat || !lng) {
        return null;
    }

    // 카카오 맵 로더
    const { loading, error } = useKakaoLoader({
        appkey: `${process.env.NEXT_PUBLIC_KAKAO_MAPS_JS_KEY}`, // 발급 받은 APPKEY
        // 추가 옵션
    });

    return (
        <>
            <div className="border-solid border-x-2 border-neutral-400 w-full ">
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
