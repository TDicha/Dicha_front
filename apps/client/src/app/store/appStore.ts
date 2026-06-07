import { create } from "zustand";

interface AppState {
  searchQuery: string;
  isBottomSheetOpen: boolean;
  setSearchQuery: (query: string) => void;
  resetSearchQuery: () => void;
  openBottomSheet: () => void;
  closeBottomSheet: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  searchQuery: "",
  isBottomSheetOpen: false,
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  resetSearchQuery: () => set({ searchQuery: "" }),
  openBottomSheet: () => set({ isBottomSheetOpen: true }),
  closeBottomSheet: () => set({ isBottomSheetOpen: false }),
}));
