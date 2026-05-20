import { create } from "zustand";

interface InstallPromptState {
  deferredPrompt: BeforeInstallPromptEvent | null;
  dismissed: boolean;
  setDeferredPrompt: (event: BeforeInstallPromptEvent | null) => void;
  dismiss: () => void;
}

export const useInstallPromptStore = create<InstallPromptState>((set) => ({
  deferredPrompt: null,
  dismissed: false,
  setDeferredPrompt: (deferredPrompt) => set({ deferredPrompt }),
  dismiss: () => set({ dismissed: true }),
}));
