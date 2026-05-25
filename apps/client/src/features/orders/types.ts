import type { CartItem } from "@/app/store/cartStore";
import type { CartPricingSummary } from "@/features/cart/cartPricing";
import type { AddressSnapshot, GuestOrderer, PaymentMethod } from "@/features/checkout/types";

export type OrderStatus =
  | "order_created"
  | "payment_completed"
  | "preparing"
  | "shipping"
  | "delivered"
  | "canceled"
  | "refunded";

export type PaymentStatus =
  | "mock_paid"
  | "pending"
  | "paid"
  | "failed"
  | "canceled"
  | "refunded";

export type CheckoutItem = Pick<
  CartItem,
  "productId" | "optionId" | "productName" | "optionName" | "productImage" | "unitPrice" | "quantity"
>;

export interface OrderItem extends CheckoutItem {
  id: string;
  orderId: string;
}

export interface Order {
  id: string;
  orderNo: string;
  userId?: string;
  guestPhone?: string;
  status: OrderStatus;
  subtotal: number;
  shippingFee: number;
  discountAmount: number;
  totalAmount: number;
  addressSnapshot: AddressSnapshot;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderedAt: string;
  items: OrderItem[];
}

export interface MemberOrderPayload {
  ordererType: "member";
  userId: string;
  items: CheckoutItem[];
  addressSnapshot: AddressSnapshot;
  paymentMethod: PaymentMethod;
  pricing: CartPricingSummary;
}

export interface GuestOrderPayload {
  ordererType: "guest";
  guestOrderer: GuestOrderer;
  items: CheckoutItem[];
  addressSnapshot: AddressSnapshot;
  paymentMethod: PaymentMethod;
  pricing: CartPricingSummary;
}

export type CreateOrderPayload = MemberOrderPayload | GuestOrderPayload;

export interface GuestOrderLookupPayload {
  orderNo: string;
  phone: string;
  orderPassword: string;
}

export interface OrderRepository {
  list: () => Promise<Order[]>;
  createOrder: (payload: CreateOrderPayload) => Promise<Order>;
  lookupGuestOrder: (payload: GuestOrderLookupPayload) => Promise<Order | null>;
}
