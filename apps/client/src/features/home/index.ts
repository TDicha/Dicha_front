import { useMemo } from "react";

import { useAuthStore } from "@/app/store";
import {
  homeBestProductIds,
  homeHeroSlides,
  homeRoasterPick,
} from "@/mock/home";
import { mockProducts } from "@/mock/products";
import { mockReviews } from "@/mock/reviews";
import { ROUTES } from "@/shared/constants/routes";

export function useHomeData() {
  const status = useAuthStore((state) => state.status);

  return useMemo(() => {
    const heroSlide = homeHeroSlides[0];
    const bestProducts = homeBestProductIds
      .map((productId) =>
        mockProducts.find((product) => product.id === productId),
      )
      .filter((product): product is (typeof mockProducts)[number] =>
        Boolean(product),
      );
    const roasterPick = mockProducts.find(
      (product) => product.id === homeRoasterPick.productId,
    );
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
  }, [status]);
}

export * from "@/features/home/components";
