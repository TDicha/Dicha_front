import { create } from "zustand";

import type { CartItem } from "@/app/store/cartStore";
import { createCheckoutDraft } from "@/features/checkout/checkoutDraft";
import type { CheckoutDraft } from "@/features/checkout/types";

interface CheckoutState {
  draft: CheckoutDraft | null;
  createFromCart: (items: CartItem[]) => void;
  createDirect: (item: CartItem) => void;
  clearDraft: () => void;
}

export const useCheckoutStore = create<CheckoutState>((set) => ({
  draft: null,
  createFromCart: (items) => set({ draft: createCheckoutDraft("cart", items) }),
  createDirect: (item) => set({ draft: createCheckoutDraft("direct", [item]) }),
  clearDraft: () => set({ draft: null }),
}));
