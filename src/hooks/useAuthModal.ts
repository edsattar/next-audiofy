import { create } from "zustand";

interface AuthModalStore {
  isOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
}

/**
 * Zustand store for the auth modal.
 * @example const { isOpen, openAuthModal, closeAuthModal } = useAuthModal();
*/
const useAuthModal = create<AuthModalStore>((set) => ({
  isOpen: false,
  openAuthModal: () => set({ isOpen: true }),
  closeAuthModal: () => set({ isOpen: false }),
}));

export default useAuthModal;
