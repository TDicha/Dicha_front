import { apiOrderAdapter } from "@/features/orders/adapters/apiOrderAdapter";
import type { OrderRepository } from "@/features/orders/types";

export const orderRepository: OrderRepository = apiOrderAdapter;
