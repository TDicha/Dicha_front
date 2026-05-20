import type { Order } from "@/shared/types/models";

export const mockOrders: Order[] = [
  {
    id: "ORD-20260415-01",
    productName: "에티오피아 예가체프 G1",
    status: "shipping",
    orderedAt: "2026-04-12",
    amount: 36000,
  },
  {
    id: "ORD-20260402-09",
    productName: "콜롬비아 후일라",
    status: "preparing",
    orderedAt: "2026-04-10",
    amount: 19000,
  },
  {
    id: "ORD-20260402-09",
    productName: "과테말라 안티과",
    status: "completed",
    orderedAt: "2026-04-02",
    amount: 16000,
  },
];
