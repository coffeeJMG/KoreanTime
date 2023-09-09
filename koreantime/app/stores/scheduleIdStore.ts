import { create } from "zustand";

type ScheduleIdStoreProps = {
    scheduleId: string;
    maximumPeople: number;
    memberLegnth: number;
    setScheduleId: (text: string) => void;
    setMaximumPeople: (number: number) => void;
    setMemberLegnth: (number: number) => void;
};
export const useShceduleIdStore = create<ScheduleIdStoreProps>((set) => ({
    scheduleId: "",
    maximumPeople: 0,
    memberLegnth: 0,
    setScheduleId: (text) => set({ scheduleId: text }),
    setMaximumPeople: (number) => set({ maximumPeople: number }),
    setMemberLegnth: (number) => set({ memberLegnth: number }),
}));
