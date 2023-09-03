import { create } from "zustand";

interface NewScheduleStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}
export const useNewSchedule = create<NewScheduleStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));
