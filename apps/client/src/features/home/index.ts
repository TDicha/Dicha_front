import { useMemo } from "react";

import { useAuthStore } from "@/app/store";
import { useProducts } from "@/features/products";
import {
  homeBestProductIds,
  homeHeroSlides,
  homeRoasterPick,
} from "@/features/home/homeConfig";
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
              to: ROUTES.orders,
            },
            {
              label: "배송지 관리",
              description: "자주 쓰는 주소 확인",
              to: ROUTES.addressBook,
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
              label: "비회원 주문 조회",
              description: "주문번호로 구매 내역 확인",
              to: `${ROUTES.login}?tab=guest`,
            },
          ];

    return {
      bestProducts,
      heroSlide,
      heroSlides: homeHeroSlides,
      quickLinks,
      roasterPick,
      roasterPickMeta: homeRoasterPick,
    };
  }, [products, status]);
}

export * from "@/features/home/components";
