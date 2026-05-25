import { useMemo } from "react";

import { useAuthStore } from "@/app/store";
import { useProducts } from "@/features/products";
import {
  homeBestProductIds,
  homeHeroSlides,
  homeRoasterPick,
} from "@/mock/home";
import { mockReviews } from "@/mock/reviews";
import { ROUTES } from "@/shared/constants/routes";

export function useHomeData() {
  const status = useAuthStore((state) => state.status);
  const { data: products = [] } = useProducts();

  return useMemo(() => {
    const heroSlide = homeHeroSlides[0];
    const preferredProducts = homeBestProductIds
      .map((productId) =>
        products.find((product) => product.id === productId),
      )
      .filter((product): product is NonNullable<typeof product> => Boolean(product));
    const badgeProducts = products.filter((product) => product.badges.includes("BEST"));
    const bestProducts = preferredProducts.length
      ? preferredProducts
      : badgeProducts.length
        ? badgeProducts
        : products.slice(0, 3);
    const roasterPick =
      products.find((product) => product.id === homeRoasterPick.productId) ??
      products.find((product) => product.badges.includes("PICK")) ??
      bestProducts[0];
    const quickLinks =
      status === "authenticated"
        ? [
            {
              label: "주문 조회",
              description: "최근 주문과 상태 확인",
              to: ROUTES.orders,
            },
            {
              label: "구독 관리",
              description: "배송 주기와 상품 변경",
              to: ROUTES.subscription,
            },
            {
              label: "QR / O2O",
              description: "매장 QR 진입과 수동 입력",
              to: ROUTES.qr,
            },
            {
              label: "나의 블렌드",
              description: "저장한 블렌드 확인",
              to: ROUTES.myBlend,
            },
          ]
        : [
            {
              label: "로그인",
              description: "주문/구독/블렌드 이어보기",
              to: ROUTES.login,
            },
            {
              label: "회원가입",
              description: "취향 저장과 주문 관리 시작",
              to: ROUTES.signup,
            },
            {
              label: "QR / O2O",
              description: "매장 코드로 빠르게 연결",
              to: ROUTES.qr,
            },
            {
              label: "픽업 예약",
              description: "예약 가능한 시간 확인",
              to: ROUTES.reservation,
            },
          ];

    return {
      bestProducts,
      heroSlide,
      heroSlides: homeHeroSlides,
      quickLinks,
      reviews: mockReviews,
      roasterPick,
      roasterPickMeta: homeRoasterPick,
    };
  }, [products, status]);
}

export * from "@/features/home/components";
