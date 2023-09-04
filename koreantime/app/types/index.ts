export type User = {
    createdAt: Date;
    updatedAt: Date;
    id: string;
    name: string;
    pwCheck?: string | null;
    email?: string | null;
    emailVerified?: Date | null;
    image?: string | null;
    hashedPassword?: string | null;
    nickname?: string | null;
};

export type SafeUser = Omit<
    User,
    "createdAt" | "updatedAt" | "emailVerified"
> & {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
};

export interface currentUserType {
    currentUser: SafeUser | null;
}

export type ScheduleType = {
    id: string;
    title?: string;
    place?: string;
    time?: string;
    date?: string;
    member: string;
    members: string;
    lat: string;
    lng: string;
};
