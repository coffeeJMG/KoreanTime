import { create } from "zustand";

interface DeleteScheduleStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}
export const useDeleteSchedule = create<DeleteScheduleStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));
