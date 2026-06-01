import { RouterProvider } from "react-router-dom";
import { useEffect } from "react";

import { useAdminAuthStore } from "@/app/adminAuthStore";
import { router } from "@/app/router";

export function App() {
  const hydrate = useAdminAuthStore((state) => state.hydrate);

  useEffect(() => {
    void hydrate();
  }, [hydrate]);

  return <RouterProvider router={router} />;
}
