import { createBrowserRouter } from "react-router-dom";

import { RouteGuard } from "@/app/router/RouteGuard";
import { AppShell } from "@/components/layout/AppShell";
import { HomePage } from "@/pages/HomePage/HomePage";
import { LoginPage } from "@/pages/LoginPage/LoginPage";
import { MyPage } from "@/pages/MyPage/MyPage";
import { NotFoundPage } from "@/pages/NotFoundPage/NotFoundPage";
import { OrderListPage } from "@/pages/OrderListPage/OrderListPage";
import { ProductDetailPage } from "@/pages/ProductDetailPage/ProductDetailPage";
import { ProductListPage } from "@/pages/ProductListPage/ProductListPage";
import { QrPage } from "@/pages/QrPage/QrPage";
import { ReservationPage } from "@/pages/ReservationPage/ReservationPage";
import { SearchPage } from "@/pages/SearchPage/SearchPage";
import { SignupPage } from "@/pages/SignupPage/SignupPage";
import { SubscriptionPage } from "@/pages/SubscriptionPage/SubscriptionPage";
import { TasteTestPage } from "@/pages/TasteTestPage/TasteTestPage";
import { ROUTES } from "@/shared/constants/routes";

export const router = createBrowserRouter([
  {
    path: ROUTES.home,
    element: <AppShell />,
    children: [
      {
        index: true,
        element: <HomePage />,
        handle: { title: "앱처럼 쓰는 커피 홈" },
      },
      {
        path: "products",
        element: <ProductListPage />,
        handle: { title: "쇼핑" },
      },
      {
        path: "products/:productId",
        element: <ProductDetailPage />,
        handle: { title: "상품 상세", chrome: false },
      },
      {
        path: "subscription",
        element: <SubscriptionPage />,
        handle: { title: "구독" },
      },
      {
        path: "reservation",
        element: <ReservationPage />,
        handle: { title: "예약" },
      },
      {
        path: "taste-test",
        element: <TasteTestPage />,
        handle: { title: "취향 테스트 결과" },
      },
      {
        element: <RouteGuard />,
        children: [
          {
            path: "mypage",
            element: <MyPage />,
            handle: { title: "마이페이지" },
          },
          {
            path: "orders",
            element: <OrderListPage />,
            handle: { title: "주문 조회" },
          },
        ],
      },
      {
        path: "search",
        element: <SearchPage />,
        handle: { title: "검색" },
      },
      {
        path: "qr",
        element: <QrPage />,
        handle: { title: "QR / O2O" },
      },
      {
        path: "login",
        element: <LoginPage />,
        handle: { title: "로그인", chrome: false },
      },
      {
        path: "signup",
        element: <SignupPage />,
        handle: { title: "회원가입", chrome: false },
      },
      {
        path: "*",
        element: <NotFoundPage />,
        handle: { title: "페이지를 찾을 수 없음", chrome: false },
      },
    ],
  },
]);
