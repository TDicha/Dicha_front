export const reservationPlans = [
  {
    id: "home",
    badge: "BEST",
    badgeTone: "gold",
    title: "홈 구독",
    quantity: "200g × 2팩",
    description: "1~2인 가정용 / 월 2회 배송",
    price: 52000,
    icon: "🏠",
    accent: "var(--surface-success-soft)",
  },
  {
    id: "office",
    badge: "",
    badgeTone: "none",
    title: "오피스 구독",
    quantity: "1kg × 4팩",
    description: "사무실 · 카페용 / 월 4회 배송",
    price: 200000,
    icon: "🏢",
    accent: "var(--surface-modal-soft)",
  },
  {
    id: "simple",
    badge: "NEW",
    badgeTone: "green",
    title: "간편 구독",
    quantity: "드립백 30개입",
    description: "언제 어디서나 간편하게",
    price: 38000,
    icon: "🧧",
    accent: "var(--surface-accent-pale)",
  },
] as const;

export type ReservationPlanId = (typeof reservationPlans)[number]["id"];
