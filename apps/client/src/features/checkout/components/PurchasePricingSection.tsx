import type { CartPricingSummary } from "@/features/cart/cartPricing";
import { formatPrice } from "@/shared/utils/format";

interface PurchasePricingSectionProps {
  pricing: CartPricingSummary;
}

export function PurchasePricingSection({ pricing }: PurchasePricingSectionProps) {
  return (
    <section className="mt-2 bg-[var(--surface-menu-board)] px-[var(--page-x)] py-7">
      <p className="text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-[var(--text-muted)]">
        Order Summary
      </p>
      <h2 className="mt-1 text-[1.2rem] font-bold text-[var(--text-cafe-ink)]">결제 금액</h2>
      <div className="mt-6 space-y-5 text-[1rem]">
        <div className="flex items-center justify-between">
          <span className="text-[var(--text-muted-subtle)]">상품 금액</span>
          <span className="font-semibold text-[var(--text-cafe-ink)]">₩{formatPrice(pricing.subtotal)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[var(--text-muted-subtle)]">쿠폰 할인</span>
          <span className="font-bold text-[var(--text-cafe-ink)]">-₩{formatPrice(pricing.couponDiscount)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[var(--text-muted-subtle)]">배송비</span>
          <span className="font-semibold text-[var(--text-cafe-ink)]">
            {pricing.shippingFee ? `₩${formatPrice(pricing.shippingFee)}` : "무료"}
          </span>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-3 bg-[var(--surface-cafe-tile)] px-3 py-5">
        <span className="break-keep text-[clamp(1.2rem,4.3vw,1.5rem)] font-bold text-[var(--text-cafe-ink)]">
          총 결제 금액
        </span>
        <span className="shrink-0 text-[clamp(1.45rem,5.4vw,1.95rem)] font-bold text-[var(--text-cafe-ink)]">
          ₩{formatPrice(pricing.total)}
        </span>
      </div>
    </section>
  );
}
