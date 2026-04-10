
import { create } from 'zustand';
import { BetSelection } from '@/types';

interface BetSlipStore {
  selections: BetSelection[];
  isOpen: boolean;
  stake: number;

  addSelection: (selection: BetSelection) => void;
  removeSelection: (eventOddId: number) => void;
  hasSelection: (eventOddId: number) => boolean;
  clearAll: () => void;
  setStake: (amount: number) => void;
  toggleOpen: () => void;
  setOpen: (open: boolean) => void;
}

export const useBetSlipStore = create<BetSlipStore>((set, get) => ({
  selections: [],
  isOpen: false,
  stake: 100,

  // Toggle a selection: if already in slip, remove it; otherwise add
  addSelection: (selection) => {
    const exists = get().selections.find(
      (s) => s.eventOddId === selection.eventOddId
    );
    if (exists) {
      set((state) => ({
        selections: state.selections.filter(
          (s) => s.eventOddId !== selection.eventOddId
        ),
      }));
    } else {
      set((state) => ({
        selections: [...state.selections, selection],
        isOpen: true,
      }));
    }
  },

  removeSelection: (eventOddId) =>
    set((state) => ({
      selections: state.selections.filter((s) => s.eventOddId !== eventOddId),
    })),

  hasSelection: (eventOddId) =>
    get().selections.some((s) => s.eventOddId === eventOddId),

  clearAll: () => set({ selections: [] }),

  setStake: (amount) => set({ stake: amount }),

  toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),

  setOpen: (open) => set({ isOpen: open }),
}));