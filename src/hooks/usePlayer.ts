import { create } from 'zustand';

interface PlayerStore {
  ids: string[];
  activeId?: string;
  setId: (id: string) => void;
  setIds: (ids: string[]) => void;
  reset: () => void;
}

/**
 * Zustand store for player ids
 * @returns {PlayerStore} PlayerStore
 * @example
 * const { ids, activeId, setId, setIds, reset } = usePlayer();
 */
const usePlayer = create<PlayerStore>((set) => ({
  ids: [],
  activeId: undefined,
  setId: (id: string) => set({ activeId: id }),
  setIds: (ids: string[]) => set({ ids }),
  reset: () => set({ ids: [], activeId: undefined })
}));

export default usePlayer;
