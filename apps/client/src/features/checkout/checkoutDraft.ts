import type { CartItem } from "@/app/store/cartStore";
import { calculateCartPricing } from "@/features/cart/cartPricing";
import type { CheckoutDraft, CheckoutMode } from "@/features/checkout/types";

function cloneCheckoutItems(items: CartItem[]) {
  return items.map((item) => ({ ...item }));
}

export function createCheckoutDraft(
  mode: CheckoutMode,
  items: CartItem[],
): CheckoutDraft {
  const checkoutItems = cloneCheckoutItems(items);

  return {
    mode,
    items: checkoutItems,
    ordererType: null,
    pricing: calculateCartPricing(checkoutItems),
  };
}
