import { RouterProvider } from "react-router-dom";
import { useEffect } from "react";

import { QueryProvider } from "@/app/providers/QueryProvider";
import { router } from "@/app/router/router";
import { useAuthStore } from "@/app/store";

// const initialLoadingDurationMs = 1000;

export function AppProviders() {
  const hydrateSession = useAuthStore((state) => state.hydrateSession);
  // const [isBootLoading, setIsBootLoading] = useState(true);

  useEffect(() => {
    void hydrateSession();
  }, [hydrateSession]);

  // useEffect(() => {
  //   const loadingTimer = window.setTimeout(() => {
  //     setIsBootLoading(false);
  //   }, initialLoadingDurationMs);
  //
  //   return () => window.clearTimeout(loadingTimer);
  // }, []);

  return (
    <QueryProvider>
      {/* {isBootLoading ? (
            <LoadingScreen
              className="min-h-[var(--app-safe-min-height)]"
              message="디차를 준비하는 중"
            />
          ) : (
            <RouterProvider router={router} />
          )} */}
      <RouterProvider router={router} />
    </QueryProvider>
  );
}
