import { create } from "zustand";

import type { CartItem } from "@/app/store/cartStore";
import { createCheckoutDraft } from "@/features/checkout/checkoutDraft";
import type {
  AddressSnapshot,
  CheckoutDraft,
  GuestOrderer,
  OrdererType,
  PaymentMethod,
} from "@/features/checkout/types";

interface CheckoutState {
  draft: CheckoutDraft | null;
  createFromCart: (items: CartItem[]) => void;
  createDirect: (item: CartItem) => void;
  setOrdererType: (ordererType: OrdererType) => void;
  setGuestOrderer: (guestOrderer: GuestOrderer) => void;
  setAddress: (addressSnapshot: AddressSnapshot) => void;
  setPaymentMethod: (paymentMethod: PaymentMethod) => void;
  clearDraft: () => void;
}

/** draft 가 존재할 때만 부분 업데이트한다. */
function patchDraft(
  draft: CheckoutDraft | null,
  patch: Partial<CheckoutDraft>,
): CheckoutDraft | null {
  return draft ? { ...draft, ...patch } : draft;
}

export const useCheckoutStore = create<CheckoutState>((set) => ({
  draft: null,
  createFromCart: (items) => set({ draft: createCheckoutDraft("cart", items) }),
  createDirect: (item) => set({ draft: createCheckoutDraft("direct", [item]) }),
  setOrdererType: (ordererType) =>
    set((state) => ({ draft: patchDraft(state.draft, { ordererType }) })),
  setGuestOrderer: (guestOrderer) =>
    set((state) => ({ draft: patchDraft(state.draft, { guestOrderer }) })),
  setAddress: (addressSnapshot) =>
    set((state) => ({ draft: patchDraft(state.draft, { addressSnapshot }) })),
  setPaymentMethod: (paymentMethod) =>
    set((state) => ({ draft: patchDraft(state.draft, { paymentMethod }) })),
  clearDraft: () => set({ draft: null }),
}));
