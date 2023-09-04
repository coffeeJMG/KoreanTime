export type User = {
    createdAt: string;
    updatedAt: string;
    id: string;
    name: string;
    pwCheck?: string | null;
    email?: string | null;
    emailVerified?: Date | null;
    image?: string | null;
    hashedPassword?: string | null;
    nickname?: string | null;
};

export interface currentUserType {
    currentUser: User | null;
}
