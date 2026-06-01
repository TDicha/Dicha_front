import { apiClient } from "@/services/api/client";
import { endpoints } from "@/services/api/endpoints";
import { resolveApiMediaUrl } from "@/services/api/media";

import type {
  CheckoutItem,
  CreateOrderPayload,
  GuestOrderLookupPayload,
  Order,
  OrderItem,
  OrderRepository,
  OrderStatus,
  PaymentStatus,
} from "@/features/orders/types";

interface ApiOrderItem {
  orderItemId?: number | string;
  productId?: number | string;
  productName?: string;
  productImageUrl?: string | null;
  productOptionId?: number | string | null;
  optionName?: string | null;
  unitPrice?: number;
  quantity?: number;
  subtotal?: number;
}

interface ApiOrder {
  id?: number | string;
  orderNumber?: string;
  status?: string;
  totalPrice?: number;
  recipientName?: string;
  phoneNumber?: string;
  shippingAddress?: string;
  items?: ApiOrderItem[];
  createdAt?: string;
}

function toBackendItem(item: CheckoutItem) {
  return {
    productId: Number.isNaN(Number(item.productId))
      ? item.productId
      : Number(item.productId),
    productOptionId:
      item.optionId && item.optionId !== "default"
        ? Number.isNaN(Number(item.optionId))
          ? item.optionId
          : Number(item.optionId)
        : undefined,
    quantity: item.quantity,
  };
}

function toOrderStatus(status?: string): OrderStatus {
  const normalized = status?.toUpperCase();

  if (normalized === "PAID") return "payment_completed";
  if (normalized === "SHIPPING") return "shipping";
  if (normalized === "DELIVERED") return "delivered";
  if (normalized === "CANCELLED") return "canceled";

  return "order_created";
}

function toPaymentStatus(status?: string): PaymentStatus {
  const normalized = status?.toUpperCase();

  if (normalized === "PAID" || normalized === "SHIPPING" || normalized === "DELIVERED") {
    return "paid";
  }

  if (normalized === "CANCELLED") return "canceled";

  return "pending";
}

function toOrderItem(item: ApiOrderItem, orderId: string): OrderItem {
  return {
    id: String(item.orderItemId ?? `${orderId}-${item.productId}`),
    orderId,
    productId: String(item.productId ?? ""),
    optionId: String(item.productOptionId ?? "default"),
    productName: item.productName ?? "상품명 없음",
    optionName: item.optionName ?? "기본 옵션",
    productImage: resolveApiMediaUrl(item.productImageUrl),
    unitPrice: item.unitPrice ?? 0,
    quantity: item.quantity ?? 1,
  };
}

function toOrder(order: ApiOrder): Order {
  const orderNo = order.orderNumber ?? String(order.id ?? "");
  const items = (order.items ?? []).map((item) => toOrderItem(item, orderNo));
  const subtotal = items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0,
  );
  const totalAmount = order.totalPrice ?? subtotal;

  return {
    id: orderNo,
    orderNo,
    guestPhone: order.phoneNumber,
    status: toOrderStatus(order.status),
    subtotal,
    shippingFee: 0,
    discountAmount: 0,
    totalAmount,
    addressSnapshot: {
      recipientName: order.recipientName ?? "수령인",
      phone: order.phoneNumber ?? "",
      address: order.shippingAddress ?? "",
    },
    paymentMethod: "credit-card",
    paymentStatus: toPaymentStatus(order.status),
    orderedAt: order.createdAt ?? new Date().toISOString(),
    items,
  };
}

function toOrderPayload(payload: CreateOrderPayload) {
  return {
    recipientName:
      payload.ordererType === "guest"
        ? payload.guestOrderer.name
        : payload.addressSnapshot.recipientName,
    phoneNumber:
      payload.ordererType === "guest"
        ? payload.guestOrderer.phone
        : payload.addressSnapshot.phone,
    shippingAddress: [
      payload.addressSnapshot.address,
      payload.addressSnapshot.detailAddress,
    ]
      .filter(Boolean)
      .join(" "),
    items: payload.items.map(toBackendItem),
    ...(payload.ordererType === "guest"
      ? { password: payload.guestOrderer.orderPassword }
      : {}),
  };
}

export const apiOrderAdapter: OrderRepository = {
  async list() {
    const { data } = await apiClient.get<ApiOrder[]>(endpoints.orders.list);

    return data.map(toOrder);
  },
  async createOrder(payload: CreateOrderPayload) {
    const endpoint =
      payload.ordererType === "guest"
        ? endpoints.orders.guestCreate
        : endpoints.orders.create;
    const { data } = await apiClient.post<ApiOrder>(
      endpoint,
      toOrderPayload(payload),
    );

    return toOrder(data);
  },
  async lookupGuestOrder(payload: GuestOrderLookupPayload) {
    const { data } = await apiClient.post<ApiOrder>(endpoints.orders.guestLookup, {
      orderNumber: payload.orderNo,
      password: payload.orderPassword,
    });

    return toOrder(data);
  },
};
