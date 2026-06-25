import type { CartItem } from "@/app/store/cartStore";
import type { Product } from "@/shared/types/models";

type LoginStatus = "anonymous" | "member";

type AnalyticsEventName =
  | "user_context_set"
  | "view_item_list"
  | "select_item"
  | "view_item"
  | "add_to_cart"
  | "remove_from_cart"
  | "view_cart"
  | "begin_checkout"
  | "add_shipping_info"
  | "add_payment_info"
  | "order_created"
  | "guest_order_created"
  | "purchase"
  | "search"
  | "home_section_click"
  | "taste_test_start"
  | "taste_test_answer"
  | "taste_test_complete";

interface AnalyticsContext {
  user_id?: string;
  login_status: LoginStatus;
  user_tier?: string;
  is_subscription_active: boolean;
}

type AnalyticsPayload = Record<string, unknown>;

declare global {
  interface Window {
    dataLayer?: AnalyticsPayload[];
  }
}

const defaultContext: AnalyticsContext = {
  login_status: "anonymous",
  is_subscription_active: false,
};

let analyticsContext: AnalyticsContext = defaultContext;

function compactPayload(payload: AnalyticsPayload) {
  return Object.fromEntries(
    Object.entries(payload).filter(([, value]) => value !== undefined),
  );
}

export function setAnalyticsContext(context: Partial<AnalyticsContext>) {
  analyticsContext = {
    ...analyticsContext,
    ...context,
  };
}

export function resetAnalyticsContext() {
  analyticsContext = defaultContext;
}

export function trackAnalyticsEvent(
  event: AnalyticsEventName,
  payload: AnalyticsPayload = {},
) {
  if (typeof window === "undefined") {
    return;
  }

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(
    compactPayload({
      event,
      ...analyticsContext,
      ...payload,
    }),
  );
}

export function trackUserContext() {
  trackAnalyticsEvent("user_context_set");
}

export function toAnalyticsItem(
  product: Product,
  options: {
    quantity?: number;
    itemVariant?: string;
    price?: number;
  } = {},
) {
  return {
    item_id: product.id,
    item_name: product.name,
    item_category: product.categoryLabel ?? product.category,
    item_variant: options.itemVariant,
    price: options.price ?? product.price,
    quantity: options.quantity ?? 1,
  };
}

export function toAnalyticsCartItem(item: CartItem) {
  return {
    item_id: item.productId,
    item_name: item.productName,
    item_variant: item.optionName,
    price: item.unitPrice,
    quantity: item.quantity,
  };
}

export function toAnalyticsCartItems(items: CartItem[]) {
  return items.map(toAnalyticsCartItem);
}

export function sanitizeSearchTerm(term: string) {
  const trimmed = term.trim();
  const emailPattern = /[^\s@]+@[^\s@]+\.[^\s@]+/;
  const phonePattern = /(?:\+?82[-\s]?)?0?1[016789][-\s]?\d{3,4}[-\s]?\d{4}/;

  if (emailPattern.test(trimmed) || phonePattern.test(trimmed)) {
    return "[redacted]";
  }

  return trimmed;
}

export function shouldTrackSearchTerm(term: string) {
  return sanitizeSearchTerm(term).length >= 2;
}
