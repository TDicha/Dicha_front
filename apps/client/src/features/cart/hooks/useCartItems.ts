import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  addCartItem,
  clearCartItems,
  fetchCartItems,
  removeCartItem,
  updateCartItemQuantity,
  type AddCartItemPayload,
  type UpdateCartItemPayload,
} from "@/features/cart/cartApi";

export const cartQueryKeys = {
  all: ["cart"] as const,
  items: () => [...cartQueryKeys.all, "items"] as const,
};

export function useCartItems(enabled: boolean) {
  return useQuery({
    enabled,
    queryKey: cartQueryKeys.items(),
    queryFn: fetchCartItems,
  });
}

export function useAddCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AddCartItemPayload) => addCartItem(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: cartQueryKeys.all });
    },
  });
}

export function useUpdateCartItemQuantity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateCartItemPayload) => updateCartItemQuantity(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: cartQueryKeys.all });
    },
  });
}

export function useRemoveCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cartItemId: string) => removeCartItem(cartItemId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: cartQueryKeys.all });
    },
  });
}

export function useClearCartItems() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: clearCartItems,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: cartQueryKeys.all });
    },
  });
}
