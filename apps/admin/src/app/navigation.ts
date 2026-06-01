import {
  BarChart3,
  CalendarDays,
  LayoutDashboard,
  MessageSquareText,
  Package,
  Settings,
  ShoppingBag,
  Star,
  TicketPercent,
  UsersRound,
} from "lucide-react";

export const ADMIN_ROUTES = {
  login: "/login",
  dashboard: "/dashboard",
  orders: "/orders",
  products: "/products",
  subscriptions: "/subscriptions",
  reservations: "/reservations",
  members: "/members",
  reviews: "/reviews",
  coupons: "/coupons",
  statistics: "/statistics",
  settings: "/settings",
} as const;

export const adminNavigationItems = [
  { to: ADMIN_ROUTES.dashboard, label: "대시보드", icon: LayoutDashboard },
  { to: ADMIN_ROUTES.orders, label: "주문 관리", icon: Package },
  { to: ADMIN_ROUTES.products, label: "상품 관리", icon: ShoppingBag },
  { to: ADMIN_ROUTES.subscriptions, label: "구독 관리", icon: CalendarDays },
  { to: ADMIN_ROUTES.reservations, label: "예약 관리", icon: CalendarDays },
  { to: ADMIN_ROUTES.members, label: "회원 관리", icon: UsersRound },
  { to: ADMIN_ROUTES.reviews, label: "리뷰 관리", icon: Star },
  { to: ADMIN_ROUTES.coupons, label: "쿠폰 관리", icon: TicketPercent },
  { to: ADMIN_ROUTES.statistics, label: "통계", icon: BarChart3 },
  { to: ADMIN_ROUTES.settings, label: "설정", icon: Settings },
];

export const adminPageTitles = new Map<string, string>([
  [ADMIN_ROUTES.dashboard, "대시보드"],
  [ADMIN_ROUTES.orders, "주문 관리"],
  [ADMIN_ROUTES.products, "상품 관리"],
  [ADMIN_ROUTES.subscriptions, "구독 관리"],
  [ADMIN_ROUTES.reservations, "예약 관리"],
  [ADMIN_ROUTES.members, "회원 관리"],
  [ADMIN_ROUTES.reviews, "리뷰 관리"],
  [ADMIN_ROUTES.coupons, "쿠폰 관리"],
  [ADMIN_ROUTES.statistics, "통계"],
  [ADMIN_ROUTES.settings, "설정"],
]);

export const placeholderPageDescriptions = new Map<string, string>([
  [ADMIN_ROUTES.orders, "주문 관리 기능은 준비 중입니다."],
  [ADMIN_ROUTES.products, "상품 목록, 카테고리 필터, 등록/수정/삭제 관리 화면입니다."],
  [ADMIN_ROUTES.subscriptions, "구독 관리 기능은 준비 중입니다."],
  [ADMIN_ROUTES.reservations, "예약 관리 기능은 준비 중입니다."],
  [ADMIN_ROUTES.members, "회원 검색, 등급, 상태 관리 화면이 들어갈 자리입니다."],
  [ADMIN_ROUTES.reviews, "리뷰 관리 기능은 준비 중입니다."],
  [ADMIN_ROUTES.coupons, "쿠폰 관리 기능은 준비 중입니다."],
  [ADMIN_ROUTES.statistics, "통계 기능은 준비 중입니다."],
  [ADMIN_ROUTES.settings, "설정 기능은 준비 중입니다."],
]);

export const placeholderIcon = MessageSquareText;
