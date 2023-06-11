import { create } from "zustand";

interface UploadModalStore {
  isOpen: boolean;
  openUploadModal: () => void;
  closeUploadModal: () => void;
}

/**
 * Zustand store for the upload modal.
 * @example const { isOpen, openUploadModal, closeUploadModal } = useUploadModal();
 */
const useUploadModal = create<UploadModalStore>((set) => ({
  isOpen: false,
  openUploadModal: () => set({ isOpen: true }),
  closeUploadModal: () => set({ isOpen: false }),
}));

export default useUploadModal;
