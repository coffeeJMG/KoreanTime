export type User = {
    createdAt: Date;
    updatedAt: Date;
    id: string;
    name: string | null;
    pwCheck: string;
    email: string;
    emailVerified?: Date | null;
    image?: string | null;
    hashedPassword?: string | null;
    nickname: string;
    invited: boolean;
    point: number;
};

export type SafeUser = Omit<
    User,
    "createdAt" | "updatedAt" | "emailVerified"
> & {
    createdAt: string;
    updatedAt: string;
    invitedScheduleList?: {
        invitedSchedule: string;
    };
};

export interface currentUserType {
    currentUser: SafeUser | null;
}

export interface IParams {
    schedulePageId?: string | undefined;
}

export interface MakingPlan {
    name: string;
    place: string;
    time: string;
    ReactSelect: { value: string; label: string };
    ReactDatepicker: Date;
    dutyAddr: string;
    members: string;
    lat: number;
    lng: number;
    userLat: number;
    userLng: number;
}

// POST  컴포넌트 타입

export interface Latlng {
    lat: number;
    lng: number;
}

export type addrProps = {
    getAddrData: (lat: number, lng: number, fullAddress: string) => void;
};

// schedule타입
export interface ScheduleListProps {
    scheduleList: {
        members: string[];
        id: string;
        title: string;
        place: string;
        time: string;
        date: string;
        maximumPeople: number;
        lat: number;
        lng: number;
        hostUser: string;
    }[];
}

export type ScheduleItem = {
    members: string[];
    id: string;
    title: string;
    place: string;
    time: string;
    date: string;
    maximumPeople: number;
    lat: number;
    lng: number;
    hostUser: string;
};
export type CombinedType = {
    schedule: {
        id: string;
        title: string;
        place?: string;
        time?: string;
        date?: string;
        maximumPeople: number;
        lat: number;
        lng: number;
        hostUser: string;
        users: User;
        members: {
            nickname: string;
            email: string;
            point: number;
        }[];
    };
};
