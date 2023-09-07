import { create } from "zustand";

interface InviteModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}
export const useInviteModal = create<InviteModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));
