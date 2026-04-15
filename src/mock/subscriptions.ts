import type { SubscriptionPlan } from "@/shared/types/models";

export const mockSubscriptions: SubscriptionPlan[] = [
  {
    id: "starter",
    name: "홈 구독",
    price: 52000,
    beansPerMonth: "에티오피아 예가체프 G1 / 미디엄 로스트 / 200g x 2",
    perks: ["배송 일정 변경", "상품 / 옵션 변경", "결제 수단 변경", "배송지 변경"],
    statusLabel: "ACTIVE",
    nextDeliveryLabel: "2026.04.12",
    billingDayLabel: "매월 5일",
  },
  {
    id: "signature",
    name: "시그니처 구독",
    price: 38900,
    beansPerMonth: "케냐 키암부 AA / 라이트 로스트 / 200g x 2",
    perks: ["월 1회 샘플러 포함", "바리스타 큐레이션", "픽업 예약 우선권"],
    highlight: "추천",
    statusLabel: "ACTIVE",
    nextDeliveryLabel: "2026.04.18",
    billingDayLabel: "매월 12일",
  },
];
