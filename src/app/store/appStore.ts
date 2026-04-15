import { create } from "zustand";

import type { QrResultDraft, QrResultTarget } from "@/shared/types/models";

interface AppState {
  searchQuery: string;
  isBottomSheetOpen: boolean;
  qrDraft: QrResultDraft;
  qrResolvedTarget: QrResultTarget | null;
  setSearchQuery: (query: string) => void;
  resetSearchQuery: () => void;
  openBottomSheet: () => void;
  closeBottomSheet: () => void;
  setQrCode: (code: string) => void;
  resolveQrCode: () => void;
  clearQrResult: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  searchQuery: "",
  isBottomSheetOpen: false,
  qrDraft: {
    code: "",
    target: "product-detail",
  },
  qrResolvedTarget: null,
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  resetSearchQuery: () => set({ searchQuery: "" }),
  openBottomSheet: () => set({ isBottomSheetOpen: true }),
  closeBottomSheet: () => set({ isBottomSheetOpen: false }),
  setQrCode: (code) =>
    set((state) => ({
      qrDraft: {
        ...state.qrDraft,
        code,
      },
    })),
  resolveQrCode: () =>
    set((state) => {
      const normalized = state.qrDraft.code.trim().toLowerCase();
      const target = normalized.includes("blend") ? "my-blend" : "product-detail";

      return {
        qrDraft: {
          ...state.qrDraft,
          target,
        },
        qrResolvedTarget: normalized ? target : null,
      };
    }),
  clearQrResult: () =>
    set({
      qrDraft: {
        code: "",
        target: "product-detail",
      },
      qrResolvedTarget: null,
    }),
}));
