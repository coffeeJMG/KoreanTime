import { create } from "zustand";

type ScheduleIdStoreProps = {
    scheduleId: string;
    maximumPeople: number;
    memberLegnth: number;
    title: string;
    setScheduleId: (text: string) => void;
    setTitle: (text: string) => void;
    setMaximumPeople: (number: number) => void;
    setMemberLegnth: (number: number) => void;
};
export const useShceduleIdStore = create<ScheduleIdStoreProps>((set) => ({
    scheduleId: "",
    maximumPeople: 0,
    memberLegnth: 0,
    title: "",
    setScheduleId: (text) => set({ scheduleId: text }),
    setTitle: (text) => set({ title: text }),
    setMaximumPeople: (number) => set({ maximumPeople: number }),
    setMemberLegnth: (number) => set({ memberLegnth: number }),
}));
