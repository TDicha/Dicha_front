interface PriceableCartItem {
  price: number;
  quantity: number;
}

export interface CartPricingSummary {
  subtotal: number;
  couponDiscount: number;
  shippingFee: number;
  total: number;
}

const cartPricingPolicy = {
  couponDiscountAmount: 5000,
  freeShippingThreshold: 30000,
  standardShippingFee: 3000,
};

export function calculateCartPricing(
  items: PriceableCartItem[],
): CartPricingSummary {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const couponDiscount = items.length
    ? cartPricingPolicy.couponDiscountAmount
    : 0;
  const shippingFee =
    items.length && subtotal < cartPricingPolicy.freeShippingThreshold
      ? cartPricingPolicy.standardShippingFee
      : 0;
  const total = Math.max(subtotal - couponDiscount + shippingFee, 0);

  return {
    subtotal,
    couponDiscount,
    shippingFee,
    total,
  };
}
