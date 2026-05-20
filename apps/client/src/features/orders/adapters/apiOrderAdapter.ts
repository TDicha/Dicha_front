import { apiClient } from "@/services/api/client";
import { endpoints } from "@/services/api/endpoints";

import type {
  CreateOrderPayload,
  GuestOrderLookupPayload,
  Order,
  OrderRepository,
} from "@/features/orders/types";

export const apiOrderAdapter: OrderRepository = {
  async list() {
    const { data } = await apiClient.get<Order[]>(endpoints.orders.list);

    return data;
  },
  async createOrder(payload: CreateOrderPayload) {
    const { data } = await apiClient.post<Order>(endpoints.orders.create, payload);

    return data;
  },
  async lookupGuestOrder(payload: GuestOrderLookupPayload) {
    const { data } = await apiClient.post<Order | null>(endpoints.orders.guestLookup, payload);

    return data;
  },
};
