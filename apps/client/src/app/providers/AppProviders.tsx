import { RouterProvider } from "react-router-dom";
import { useEffect } from "react";

import { PwaProvider } from "@/app/providers/PwaProvider";
import { QueryProvider } from "@/app/providers/QueryProvider";
import { router } from "@/app/router/router";
import { useAuthStore } from "@/app/store";

export function AppProviders() {
  const hydrateSession = useAuthStore((state) => state.hydrateSession);

  useEffect(() => {
    void hydrateSession();
  }, [hydrateSession]);

  return (
    <QueryProvider>
      <PwaProvider>
        <RouterProvider router={router} />
      </PwaProvider>
    </QueryProvider>
  );
}
