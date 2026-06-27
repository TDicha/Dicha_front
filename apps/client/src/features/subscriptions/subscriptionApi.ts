import { apiClient } from "@/services/api/client";
import { endpoints } from "@/services/api/endpoints";
import { resolveApiMediaUrl } from "@/services/api/media";

export type SubscriptionStatus = "ACTIVE" | "PAUSED" | "CANCELLED";

export interface Subscription {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  productOptionId?: string;
  productOptionName?: string;
  quantity: number;
  intervalDays: number;
  unitPrice: number;
  status: SubscriptionStatus;
  nextDeliveryDate?: string;
  recipientName: string;
  phone: string;
  postalCode: string;
  address: string;
  detailAddress: string;
  createdAt?: string;
}

export interface CreateSubscriptionPayload {
  productId: number;
  productOptionId?: number;
  quantity: number;
  recipientName: string;
  phone: string;
  postalCode: string;
  address: string;
  detailAddress: string;
}

interface ApiSubscription {
  id: number | string;
  productId: number | string;
  productName?: string;
  productImageUrl?: string | null;
  productOptionId?: number | string | null;
  productOptionName?: string | null;
  quantity?: number;
  intervalDays?: number;
  unitPrice?: number;
  status?: SubscriptionStatus;
  nextDeliveryDate?: string | null;
  recipientName?: string;
  phone?: string;
  postalCode?: string | null;
  address?: string;
  detailAddress?: string | null;
  createdAt?: string | null;
}

function toSubscription(subscription: ApiSubscription): Subscription {
  return {
    id: String(subscription.id),
    productId: String(subscription.productId),
    productName: subscription.productName ?? "정기구독 상품",
    productImage:
      resolveApiMediaUrl(subscription.productImageUrl) ??
      "/dicha-subscription-badge.png",
    productOptionId:
      subscription.productOptionId !== undefined &&
      subscription.productOptionId !== null
        ? String(subscription.productOptionId)
        : undefined,
    productOptionName: subscription.productOptionName ?? undefined,
    quantity: subscription.quantity ?? 1,
    intervalDays: subscription.intervalDays ?? 30,
    unitPrice: subscription.unitPrice ?? 0,
    status: subscription.status ?? "ACTIVE",
    nextDeliveryDate: subscription.nextDeliveryDate ?? undefined,
    recipientName: subscription.recipientName ?? "",
    phone: subscription.phone ?? "",
    postalCode: subscription.postalCode ?? "",
    address: subscription.address ?? "",
    detailAddress: subscription.detailAddress ?? "",
    createdAt: subscription.createdAt ?? undefined,
  };
}

export async function fetchSubscriptions() {
  const { data } = await apiClient.get<ApiSubscription[]>(
    endpoints.subscriptions.list,
  );
  return data.map(toSubscription);
}

export async function createSubscription(payload: CreateSubscriptionPayload) {
  const { data } = await apiClient.post<ApiSubscription>(
    endpoints.subscriptions.create,
    payload,
  );
  return toSubscription(data);
}

export async function pauseSubscription(subscriptionId: string) {
  const { data } = await apiClient.patch<ApiSubscription>(
    endpoints.subscriptions.pause(subscriptionId),
  );
  return toSubscription(data);
}

export async function resumeSubscription(subscriptionId: string) {
  const { data } = await apiClient.patch<ApiSubscription>(
    endpoints.subscriptions.resume(subscriptionId),
  );
  return toSubscription(data);
}

export async function cancelSubscription(subscriptionId: string) {
  const { data } = await apiClient.delete<ApiSubscription>(
    endpoints.subscriptions.cancel(subscriptionId),
  );
  return toSubscription(data);
}
