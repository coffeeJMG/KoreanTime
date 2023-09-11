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

export interface scheduleProps {
    schedule: ScheduleType & {
        users: User;
    };
}

// NewScheduleModal 타입

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
}

// POST  컴포넌트 타입

export interface Latlng {
    lat: number | null;
    lng: number | null;
}

export type addrProps = {
    getAddrData: (
        lat: number | null,
        lng: number | null,
        fullAddress: string
    ) => void;
};

// schedule타입
export interface ScheduleListProps {
    scheduleList:
        | {
              members: string[];
              id: string;
              title: string;
              place: string;
              time: string;
              date: string;
              maximumPeople: number;
              lat: number | null;
              lng: number | null;
              hostUser: string;
          }[]
        | null;
}

export type ScheduleType = {
    id: string;
    title: string;
    place?: string;
    time?: string;
    date?: string;
    member: string | null;
    members: {
        email: string;
    };
    lat: number | null;
    lng: number | null;
};

export type CombinedType = {
    schedule: {
        id: string;
        title: string;
        place?: string;
        time?: string;
        date?: string;
        maximumPeople: number;
        lat: number | null;
        lng: number | null;
        hostUser: string;
        users: User;
        members: {
            nickname: string;
            email: string;
        }[];
    };
};
