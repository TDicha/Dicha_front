import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  UsersRound,
} from "lucide-react";

export const ADMIN_ROUTES = {
  login: "/login",
  dashboard: "/dashboard",
  orders: "/orders",
  products: "/products",
  members: "/members",
} as const;

export const adminNavigationItems = [
  { to: ADMIN_ROUTES.dashboard, label: "대시보드", icon: LayoutDashboard },
  { to: ADMIN_ROUTES.orders, label: "주문 관리", icon: Package },
  { to: ADMIN_ROUTES.products, label: "상품 관리", icon: ShoppingBag },
  { to: ADMIN_ROUTES.members, label: "회원 관리", icon: UsersRound },
];

export const adminPageTitles = new Map<string, string>([
  [ADMIN_ROUTES.dashboard, "대시보드"],
  [ADMIN_ROUTES.orders, "주문 관리"],
  [ADMIN_ROUTES.products, "상품 관리"],
  [ADMIN_ROUTES.members, "회원 관리"],
]);
