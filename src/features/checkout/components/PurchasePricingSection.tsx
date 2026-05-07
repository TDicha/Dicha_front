import type { CartPricingSummary } from "@/features/cart/cartPricing";
import { formatPrice } from "@/shared/utils/format";

interface PurchasePricingSectionProps {
  pricing: CartPricingSummary;
}

export function PurchasePricingSection({ pricing }: PurchasePricingSectionProps) {
  return (
    <section className="mt-4 bg-white px-6 py-7">
      <h2 className="text-[1.2rem] font-bold text-[var(--palette-171717)]">결제 금액</h2>
      <div className="mt-6 space-y-5 text-[1rem]">
        <div className="flex items-center justify-between">
          <span className="text-[var(--palette-666666)]">상품 금액</span>
          <span className="font-semibold text-[var(--palette-171717)]">₩{formatPrice(pricing.subtotal)}</span>
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

      <div className="mt-6 flex items-center justify-between border-t border-[var(--palette-1b1b1b)] pt-5">
        <span className="text-[1.5rem] font-bold text-[var(--palette-171717)]">총 결제 금액</span>
        <span className="text-[1.95rem] font-bold text-[var(--palette-992b22)]">₩{formatPrice(pricing.total)}</span>
      </div>
    </section>
  );
}
