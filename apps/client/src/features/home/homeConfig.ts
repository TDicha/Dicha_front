import { ROUTES } from "@/shared/constants/routes";

export const homeHeroSlides = [
  {
    id: "new-arrival",
    eyebrow: "NEW ARRIVAL",
    title: ["한 잔의 커피,", "향으로 기억되다"],
    description: "O2O 커스텀 로스팅 원두 플랫폼",
    ctaLabel: "취향 테스트하기",
    ctaTo: ROUTES.tasteTest,
  },
  {
    id: "custom-roasting",
    eyebrow: "CUSTOM ROASTING",
    title: ["내 취향 그대로,", "오늘 로스팅"],
    description: "원두 선택부터 분쇄 옵션까지 내 방식대로",
    ctaLabel: "원두 둘러보기",
    ctaTo: ROUTES.products,
  },
] as const;

export const homeBestProductIds = [
  "ethiopia-yirgacheffe",
  "colombia-huila",
  "kenya-kiambu-aa",
] as const;

export const homeRoasterPick = {
  productId: "kenya-kiambu-aa",
  label: "Roaster's Pick",
  title: "이달의 추천",
} as const;
