import { create } from "zustand";

interface LoginStateStore {
    isLogin: boolean;
    onOpen: () => void;
    onClose: () => void;
}
export const useLoginState = create<LoginStateStore>((set) => ({
    isLogin: false,
    onOpen: () => set({ isLogin: true }),
    onClose: () => set({ isLogin: false }),
}));
