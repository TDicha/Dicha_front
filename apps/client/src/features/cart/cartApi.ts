import { apiClient } from "@/services/api/client";
import { endpoints } from "@/services/api/endpoints";
import { resolveApiMediaUrl } from "@/services/api/media";
import type { CartItem } from "@/app/store/cartStore";

interface ApiCartItem {
  cartItemId?: number | string;
  productId?: number | string;
  productOptionId?: number | string | null;
  productName?: string;
  productImageUrl?: string | null;
  productOptionName?: string | null;
  basePrice?: number;
  extraPrice?: number;
  quantity?: number;
  unitPrice?: number;
  subtotal?: number;
}

export interface AddCartItemPayload {
  productId: string;
  productOptionId?: string;
  quantity: number;
}

export interface UpdateCartItemPayload {
  cartItemId: string;
  quantity: number;
}

function toCartItem(item: ApiCartItem): CartItem {
  const optionId = item.productOptionId ?? "default";
  const unitPrice = item.unitPrice ?? (item.basePrice ?? 0) + (item.extraPrice ?? 0);

  return {
    cartItemId: String(item.cartItemId ?? `${item.productId}:${optionId}`),
    productId: String(item.productId ?? ""),
    optionId: String(optionId),
    productName: item.productName ?? "상품명 없음",
    optionName: item.productOptionName ?? "기본 옵션",
    productImage: resolveApiMediaUrl(item.productImageUrl),
    unitPrice,
    quantity: item.quantity ?? 1,
    selected: true,
  };
}

export async function fetchCartItems() {
  const { data } = await apiClient.get<ApiCartItem[]>(endpoints.cart.list);

  return data.map(toCartItem);
}

export async function addCartItem(payload: AddCartItemPayload) {
  const { data } = await apiClient.post<ApiCartItem>(endpoints.cart.addItem, {
    productId: Number.isNaN(Number(payload.productId))
      ? payload.productId
      : Number(payload.productId),
    productOptionId: payload.productOptionId
      ? Number.isNaN(Number(payload.productOptionId))
        ? payload.productOptionId
        : Number(payload.productOptionId)
      : null,
    quantity: payload.quantity,
  });

  return toCartItem(data);
}

export async function updateCartItemQuantity({
  cartItemId,
  quantity,
}: UpdateCartItemPayload) {
  const { data } = await apiClient.put<ApiCartItem>(
    endpoints.cart.updateItem(cartItemId),
    { quantity },
  );

  return toCartItem(data);
}

export async function removeCartItem(cartItemId: string) {
  await apiClient.delete(endpoints.cart.removeItem(cartItemId));
}

export async function clearCartItems() {
  await apiClient.delete(endpoints.cart.clear);
}
