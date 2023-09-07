import { create } from "zustand";

interface InvitationModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}
export const useInvitationModal = create<InvitationModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));
