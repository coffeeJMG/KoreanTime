import { create } from "zustand";

interface EditScheduleStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}
export const useEditSchedule = create<EditScheduleStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));
