import { createBrowserRouter, Navigate } from "react-router-dom";

import { ADMIN_ROUTES } from "@/app/navigation";
import { LoginRedirect, ProtectedRoute } from "@/app/RouteGuards";
import { AdminShell } from "@/layout/AdminShell";
import { DashboardPage } from "@/pages/DashboardPage";
import { PlaceholderPage } from "@/pages/PlaceholderPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate replace to={ADMIN_ROUTES.dashboard} />,
  },
  {
    path: ADMIN_ROUTES.login,
    element: <LoginRedirect />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AdminShell />,
        children: [
          {
            path: ADMIN_ROUTES.dashboard,
            element: <DashboardPage />,
          },
          {
            path: ADMIN_ROUTES.orders,
            element: <PlaceholderPage route={ADMIN_ROUTES.orders} />,
          },
          {
            path: ADMIN_ROUTES.products,
            element: <PlaceholderPage route={ADMIN_ROUTES.products} />,
          },
          {
            path: ADMIN_ROUTES.subscriptions,
            element: <PlaceholderPage route={ADMIN_ROUTES.subscriptions} />,
          },
          {
            path: ADMIN_ROUTES.reservations,
            element: <PlaceholderPage route={ADMIN_ROUTES.reservations} />,
          },
          {
            path: ADMIN_ROUTES.members,
            element: <PlaceholderPage route={ADMIN_ROUTES.members} />,
          },
          {
            path: ADMIN_ROUTES.reviews,
            element: <PlaceholderPage route={ADMIN_ROUTES.reviews} />,
          },
          {
            path: ADMIN_ROUTES.coupons,
            element: <PlaceholderPage route={ADMIN_ROUTES.coupons} />,
          },
          {
            path: ADMIN_ROUTES.statistics,
            element: <PlaceholderPage route={ADMIN_ROUTES.statistics} />,
          },
          {
            path: ADMIN_ROUTES.settings,
            element: <PlaceholderPage route={ADMIN_ROUTES.settings} />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate replace to={ADMIN_ROUTES.dashboard} />,
  },
]);
