import type { PropsWithChildren } from "react";

import { useInstallPrompt } from "@/services/hooks/useInstallPrompt";

export function PwaProvider({ children }: PropsWithChildren) {
  useInstallPrompt();

  return <>{children}</>;
}
