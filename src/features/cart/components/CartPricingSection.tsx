import type { CartPricingSummary } from "@/features/cart/cartPricing";
import { formatPrice } from "@/shared/utils/format";

interface CartPricingSectionProps {
  pricing: CartPricingSummary;
}

export function CartPricingSection({ pricing }: CartPricingSectionProps) {
  return (
    <section className="mt-5 border-y border-[var(--palette-ebe6dd)] bg-white px-6 py-8">
      <h3 className="text-[1.65rem] font-bold tracking-[-0.04em] text-[var(--palette-171717)]">결제 금액</h3>
      <div className="mt-7 space-y-6 text-[1.15rem]">
        <div className="flex items-center justify-between">
          <span className="text-[var(--palette-666666)]">상품 금액</span>
          <span className="font-semibold text-[var(--palette-212121)]">₩{formatPrice(pricing.subtotal)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[var(--palette-666666)]">쿠폰 할인</span>
          <span className="font-bold text-[var(--palette-992b22)]">-₩{formatPrice(pricing.couponDiscount)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[var(--palette-666666)]">배송비</span>
          <span className="font-semibold text-[var(--second-color)]">
            {pricing.shippingFee ? `₩${formatPrice(pricing.shippingFee)}` : "무료"}
          </span>
        </div>
      </div>

      <div className="mt-7 flex items-center justify-between border-t border-[var(--palette-1b1b1b)] pt-5">
        <span className="text-[1.8rem] font-bold tracking-[-0.04em] text-[var(--palette-171717)]">총 결제 금액</span>
        <span className="text-[2.1rem] font-bold tracking-[-0.04em] text-[var(--palette-992b22)]">
          ₩{formatPrice(pricing.total)}
        </span>
      </div>
    </section>
  );
}
