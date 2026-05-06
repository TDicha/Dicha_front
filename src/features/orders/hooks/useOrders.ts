import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { orderRepository } from "@/features/orders/repositories/orderRepository";
import type { CreateOrderPayload, GuestOrderLookupPayload } from "@/features/orders/types";

export const orderQueryKeys = {
  all: ["orders"] as const,
  list: () => [...orderQueryKeys.all, "list"] as const,
};

export function useOrders() {
  return useQuery({
    queryKey: orderQueryKeys.list(),
    queryFn: () => orderRepository.list(),
  });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateOrderPayload) => orderRepository.createOrder(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: orderQueryKeys.all });
    },
  });
}

export function useLookupGuestOrder() {
  return useMutation({
    mutationFn: (payload: GuestOrderLookupPayload) =>
      orderRepository.lookupGuestOrder(payload),
  });
}
