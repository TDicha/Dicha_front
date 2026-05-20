export interface SubscriptionDeliveryHistory {
  date: string;
  name: string;
  status: string;
}

export interface SubscriptionProductSummary {
  name: string;
  optionLabel: string;
}

export interface SubscriptionDetail {
  subscriptionId: string;
  status: "active" | "empty";
  product: SubscriptionProductSummary;
  cycleOptions: string[];
  selectedCycle: string;
  deliveryHistory: SubscriptionDeliveryHistory[];
}

export const mockSubscriptionDetails: SubscriptionDetail[] = [
  {
    subscriptionId: "starter",
    status: "active",
    product: {
      name: "에티오피아 예가체프 G1",
      optionLabel: "미디엄 로스트 · 200g × 2",
    },
    cycleOptions: ["매주", "격주", "매월"],
    selectedCycle: "매월",
    deliveryHistory: [
      { date: "2026.04.05", name: "예가체프 G1 200g×2", status: "배송완료" },
      { date: "2026.03.05", name: "예가체프 G1 200g×2", status: "배송완료" },
      {
        date: "2026.02.05",
        name: "콜롬비아 수프리모 200g×2",
        status: "배송완료",
      },
      { date: "2026.01.05", name: "예가체프 G1 200g×2", status: "배송완료" },
    ],
  },
  {
    subscriptionId: "signature",
    status: "active",
    product: {
      name: "케냐 키암부 AA",
      optionLabel: "라이트 로스트 · 200g × 2",
    },
    cycleOptions: ["격주", "매월"],
    selectedCycle: "격주",
    deliveryHistory: [
      { date: "2026.04.18", name: "케냐 키암부 AA 200g×2", status: "배송완료" },
      { date: "2026.04.04", name: "케냐 키암부 AA 200g×2", status: "배송완료" },
    ],
  },
];

export function getSubscriptionDetail(subscriptionId: string) {
  return mockSubscriptionDetails.find(
    (detail) => detail.subscriptionId === subscriptionId,
  );
}
