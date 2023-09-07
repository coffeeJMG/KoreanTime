import { create } from "zustand";

type ScheduleIdStoreProps = {
    scheduleId: string;
    setScheduleId: (text: string) => void; // Specify the type of 'text' as string
};

export const useShceduleIdStore = create<ScheduleIdStoreProps>((set) => ({
    scheduleId: "",
    setScheduleId: (text) => set({ scheduleId: text }),
}));
