import create from "zustand";

export interface ScheduleListStore {
    updateScheduleList: {
        members: string[];
        id: string;
        title: string;
        place: string;
        time: string;
        date: string;
        maximumPeople: string;
        lat: number | null;
        lng: number | null;
        hostUser: string;
    }[];
    setUpdateScheduleList: (text: any) => void;
}

const useScheduleListStore = create<ScheduleListStore>((set) => ({
    updateScheduleList: [],
    setUpdateScheduleList: (scheduleList: any) =>
        set({ updateScheduleList: scheduleList }),
}));

export default useScheduleListStore;
