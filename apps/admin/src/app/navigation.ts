import {
  BarChart3,
  CalendarCheck,
  LayoutDashboard,
  Package,
  ShoppingBag,
  Truck,
  UsersRound,
} from "lucide-react";

export const ADMIN_ROUTES = {
  login: "/login",
  dashboard: "/dashboard",
  analytics: "/analytics",
  orders: "/orders",
  subscriptions: "/subscriptions",
  classes: "/classes",
  products: "/products",
  members: "/members",
} as const;

export const adminNavigationItems = [
  { to: ADMIN_ROUTES.dashboard, label: "대시보드", icon: LayoutDashboard },
  { to: ADMIN_ROUTES.analytics, label: "통계 관리", icon: BarChart3 },
  { to: ADMIN_ROUTES.orders, label: "주문 관리", icon: Package },
  { to: ADMIN_ROUTES.subscriptions, label: "구독 관리", icon: Truck },
  { to: ADMIN_ROUTES.classes, label: "클래스 관리", icon: CalendarCheck },
  { to: ADMIN_ROUTES.products, label: "상품 관리", icon: ShoppingBag },
  { to: ADMIN_ROUTES.members, label: "회원 관리", icon: UsersRound },
];

export const adminPageTitles = new Map<string, string>([
  [ADMIN_ROUTES.dashboard, "대시보드"],
  [ADMIN_ROUTES.analytics, "통계 관리"],
  [ADMIN_ROUTES.orders, "주문 관리"],
  [ADMIN_ROUTES.subscriptions, "구독 관리"],
  [ADMIN_ROUTES.classes, "클래스 관리"],
  [ADMIN_ROUTES.products, "상품 관리"],
  [ADMIN_ROUTES.members, "회원 관리"],
]);
