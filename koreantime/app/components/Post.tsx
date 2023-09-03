"use client";

import React, { useState, forwardRef } from "react";
import DaumPostCode from "react-daum-postcode";

import axios from "axios";
import { Button } from "./Button";
import { Input } from "./Input";

interface Latlng {
    lat: number | null;
    lng: number | null;
}

type addrProps = {
    getAddrData: (
        addr1: string,
        addr2: string,
        lat: number | null,
        lng: number | null,
        fullAddress: string
    ) => void;
};

export const Post = forwardRef(({ getAddrData }: addrProps, ref) => {
    const [isOpen, setIsOpen] = useState(false); //모달 상태
    const [dutyAddr, setDutyAddr] = useState(""); // 시,도 주소

    const handleOpenModal = () => {
        // 모달 오픈
        setIsOpen(true);
        console.log(1);
    };

    const handleCloseModal = () => {
        // 모달 클로즈
        setIsOpen(false);
    };

    // 주소 검색 다음 api
    const handleComplete = async (data: any) => {
        let fullAddress = data.address;
        let extraAddress = "";

        const { addressType, bname, buildingName } = data;
        if (addressType === "R") {
            if (bname !== "") {
                extraAddress += bname;
            }
            if (buildingName !== "") {
                extraAddress += `${extraAddress !== "" && ", "}${buildingName}`;
            }
            fullAddress += `${extraAddress !== "" ? ` ${extraAddress}` : ""}`;
        }

        const convertAddressToCoordinates = async () => {
            const url = `https://dapi.kakao.com/v2/local/search/address.json?query=${fullAddress}`;
            const headers = {
                Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_API_KEY}`,
            };

            try {
                const response = await axios.get(url, { headers });

                if (response.status === 200) {
                    const lng = parseFloat(
                        response.data.documents[0].address.x
                    );
                    const lat = parseFloat(
                        response.data.documents[0].address.y
                    );
                    return { lat, lng };
                } else {
                    return { lat: null, lng: null };
                }
            } catch (error) {
                return { lat: null, lng: null };
            }
        };
        const { lat, lng }: Latlng = await convertAddressToCoordinates();

        const newAddress = data.address.split(" "); // 검색한 주소를 배열로 전환
        const dutyAddr1Depth = newAddress.splice(0, 2).join(" "); // 시,도 주소를 뽑아내기 위해서 인덱스 번호로 자름
        const dutyAddr2Depth = [...newAddress].join(" "); // 시,도 주소를 제외한 나머지 주소를 상세주소 변수에 추가

        const addr1 = dutyAddr1Depth;
        const addr2 = dutyAddr2Depth;
        // 시,도 주소 변수 값으로 State변화
        setDutyAddr(fullAddress); // 상세주소 변수 값으로 State변화
        // 레지스터폼에서 props로 내려온 getAddrData 함수에 2가지 종류의 주소 데이터를 보냄

        handleCloseModal(); // 주소 선택 시 모달 닫음
    };

    return (
        <>
            <div className="w-full flex flex-col box-border">
                <div className="flex items-center">
                    <p className="items-center w-full text-2xl">모임 장소</p>
                    <div className="w-full mr-2 justify-end flex">
                        <Button onClick={handleOpenModal}>주소 찾기</Button>
                    </div>

                    {isOpen && (
                        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-neutral-800/70 z-50">
                            <div className="w-96 h-auto p-10 bg-white">
                                <DaumPostCode
                                    onComplete={handleComplete}
                                    className="post-code"
                                />
                                <Button onClick={handleCloseModal}>닫기</Button>
                            </div>
                        </div>
                    )}
                </div>
                <Input type="text" value={dutyAddr} readOnly />
            </div>
        </>
    );
});
