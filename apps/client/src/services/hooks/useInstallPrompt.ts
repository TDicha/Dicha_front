import { useEffect } from "react";

import { useInstallPromptStore } from "@/app/store/installPromptStore";

declare global {
  interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
  }
}

export function useInstallPrompt() {
  const setDeferredPrompt = useInstallPromptStore(
    (state) => state.setDeferredPrompt,
  );

  useEffect(() => {
    function handleBeforeInstallPrompt(event: Event) {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
    };
  }, [setDeferredPrompt]);
}
