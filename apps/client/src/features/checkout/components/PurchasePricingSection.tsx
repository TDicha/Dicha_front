import type { CartPricingSummary } from "@/features/cart/cartPricing";
import { formatPrice } from "@/shared/utils/format";

interface PurchasePricingSectionProps {
  pricing: CartPricingSummary;
}

export function PurchasePricingSection({ pricing }: PurchasePricingSectionProps) {
  return (
    <section className="mt-4 bg-[var(--surface-base)] px-[var(--page-x)] py-7">
      <h2 className="text-[1.2rem] font-bold text-[var(--text-heading)]">결제 금액</h2>
      <div className="mt-6 space-y-5 text-[1rem]">
        <div className="flex items-center justify-between">
          <span className="text-[var(--text-muted-subtle)]">상품 금액</span>
          <span className="font-semibold text-[var(--text-heading)]">₩{formatPrice(pricing.subtotal)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[var(--text-muted-subtle)]">쿠폰 할인</span>
          <span className="font-bold text-[var(--text-price-danger)]">-₩{formatPrice(pricing.couponDiscount)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[var(--text-muted-subtle)]">배송비</span>
          <span className="font-semibold text-[var(--brand-secondary)]">
            {pricing.shippingFee ? `₩${formatPrice(pricing.shippingFee)}` : "무료"}
          </span>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-3 border-t border-[var(--border-strong)] pt-5">
        <span className="break-keep text-[clamp(1.2rem,4.3vw,1.5rem)] font-bold text-[var(--text-heading)]">
          총 결제 금액
        </span>
        <span className="shrink-0 text-[clamp(1.45rem,5.4vw,1.95rem)] font-bold text-[var(--text-price-danger)]">
          ₩{formatPrice(pricing.total)}
        </span>
      </div>
    </section>
  );
}
