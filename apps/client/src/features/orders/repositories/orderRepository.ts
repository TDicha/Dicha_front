import { env } from "@/shared/lib/env";

import { apiOrderAdapter } from "@/features/orders/adapters/apiOrderAdapter";
import { mockOrderAdapter } from "@/features/orders/adapters/mockOrderAdapter";
import type { OrderRepository } from "@/features/orders/types";

export const orderRepository: OrderRepository = env.enableMock
  ? mockOrderAdapter
  : apiOrderAdapter;
