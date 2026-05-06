import { RouterProvider } from "react-router-dom";

import { PwaProvider } from "@/app/providers/PwaProvider";
import { QueryProvider } from "@/app/providers/QueryProvider";
import { router } from "@/app/router/router";

export function AppProviders() {
  return (
    <QueryProvider>
      <PwaProvider>
        <RouterProvider router={router} />
      </PwaProvider>
    </QueryProvider>
  );
}
