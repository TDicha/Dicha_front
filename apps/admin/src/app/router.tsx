import { createBrowserRouter, Navigate } from "react-router-dom";

import { ADMIN_ROUTES } from "@/app/navigation";
import { LoginRedirect, ProtectedRoute } from "@/app/RouteGuards";
import { AdminShell } from "@/layout/AdminShell";
import { AnalyticsPage } from "@/pages/AnalyticsPage";
import { ClassesPage } from "@/pages/ClassesPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { MembersPage } from "@/pages/MembersPage";
import { OrdersPage } from "@/pages/OrdersPage";
import { ProductsPage } from "@/pages/ProductsPage";
import { SubscriptionsPage } from "@/pages/SubscriptionsPage";

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
            path: ADMIN_ROUTES.analytics,
            element: <AnalyticsPage />,
          },
          {
            path: ADMIN_ROUTES.orders,
            element: <OrdersPage />,
          },
          {
            path: ADMIN_ROUTES.subscriptions,
            element: <SubscriptionsPage />,
          },
          {
            path: ADMIN_ROUTES.classes,
            element: <ClassesPage />,
          },
          {
            path: ADMIN_ROUTES.products,
            element: <ProductsPage />,
          },
          {
            path: ADMIN_ROUTES.members,
            element: <MembersPage />,
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
