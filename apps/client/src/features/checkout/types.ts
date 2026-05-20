import type { CartItem } from "@/app/store/cartStore";
import type { CartPricingSummary } from "@/features/cart/cartPricing";

export type CheckoutMode = "cart" | "direct";
export type OrdererType = "member" | "guest";
export type PaymentMethod = "dicha-card" | "kakao-pay" | "credit-card";

export interface AddressSnapshot {
  recipientName: string;
  phone: string;
  address: string;
  detailAddress?: string;
  postalCode?: string;
}

export interface GuestOrderer {
  name: string;
  phone: string;
  orderPassword: string;
}

export interface CheckoutDraft {
  mode: CheckoutMode;
  items: CartItem[];
  ordererType: OrdererType | null;
  guestOrderer?: GuestOrderer;
  addressSnapshot?: AddressSnapshot;
  paymentMethod?: PaymentMethod;
  pricing: CartPricingSummary;
}
