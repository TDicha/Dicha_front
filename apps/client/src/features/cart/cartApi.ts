import { apiClient } from "@/services/api/client";
import { endpoints } from "@/services/api/endpoints";
import type { CartItem } from "@/app/store/cartStore";

interface ApiCartProduct {
  id?: number | string;
  name?: string;
  price?: number;
  image?: string;
  imageUrl?: string;
  thumbnailUrl?: string;
}

interface ApiCartProductOption {
  id?: number | string;
  name?: string;
  optionName?: string;
  extraPrice?: number;
}

interface ApiCartItem {
  id?: number | string;
  cartItemId?: number | string;
  productId?: number | string;
  productOptionId?: number | string | null;
  product?: ApiCartProduct;
  productOption?: ApiCartProductOption | null;
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
  const product = item.product;
  const option = item.productOption;
  const optionId = item.productOptionId ?? option?.id ?? "default";
  const basePrice = product?.price ?? 0;
  const unitPrice = item.unitPrice ?? basePrice + (option?.extraPrice ?? 0);

  return {
    cartItemId: String(item.id ?? item.cartItemId ?? `${product?.id ?? item.productId}:${optionId}`),
    productId: String(item.productId ?? product?.id ?? ""),
    optionId: String(optionId),
    productName: product?.name ?? "상품명 없음",
    optionName: option?.name ?? option?.optionName ?? "기본 옵션",
    productImage: product?.imageUrl ?? product?.thumbnailUrl ?? product?.image,
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
