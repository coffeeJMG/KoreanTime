import { create } from "zustand";

type editScheduleIdStoreProps = {
    editScheduleId: string;
    setEditScheduleId: (text: string) => void;
};
export const editShceduleIdStore = create<editScheduleIdStoreProps>((set) => ({
    editScheduleId: "",

    setEditScheduleId: (text) => set({ editScheduleId: text }),
}));
