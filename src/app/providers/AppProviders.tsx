import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { useState } from "react";

import { router } from "@/app/router/router";
import { useInstallPrompt } from "@/services/hooks/useInstallPrompt";

function InstallPromptBootstrap() {
  useInstallPrompt();
  return null;
}

export function AppProviders() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 30,
            retry: 1,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <InstallPromptBootstrap />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
