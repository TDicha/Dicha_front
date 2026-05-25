import { mockOrderAdapter } from "@/features/orders/adapters/mockOrderAdapter";
import type { OrderRepository } from "@/features/orders/types";

// Order APIs are not implemented in the backend contract yet.
export const orderRepository: OrderRepository = mockOrderAdapter;
