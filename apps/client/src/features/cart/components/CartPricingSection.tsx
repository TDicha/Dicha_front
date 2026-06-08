import type { CartPricingSummary } from "@/features/cart/cartPricing";
import { formatPrice } from "@/shared/utils/format";

interface CartPricingSectionProps {
  pricing: CartPricingSummary;
}

export function CartPricingSection({ pricing }: CartPricingSectionProps) {
  const couponDiscountLabel = pricing.couponDiscount
    ? `-₩${formatPrice(pricing.couponDiscount)}`
    : "₩0";

  return (
    <section className="bg-[var(--surface-menu-board)] px-[var(--page-x)] py-6">
      <p className="text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-[var(--text-muted)]">
        Order Summary
      </p>
      <h3 className="mt-1 text-xl font-bold text-[var(--text-cafe-ink)]">결제 금액</h3>
      <div className="mt-5 space-y-4 text-base">
        <div className="flex items-center justify-between">
          <span className="text-[var(--text-muted-subtle)]">상품 금액</span>
          <span className="font-semibold text-[var(--text-cafe-ink)]">₩{formatPrice(pricing.subtotal)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[var(--text-muted-subtle)]">쿠폰 할인</span>
          <span className="font-bold text-[var(--text-cafe-ink)]">
            {couponDiscountLabel}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[var(--text-muted-subtle)]">배송비</span>
          <span className="font-semibold text-[var(--text-cafe-ink)]">
            {pricing.shippingFee ? `₩${formatPrice(pricing.shippingFee)}` : "무료"}
          </span>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3 bg-[var(--surface-cafe-tile)] px-3 py-4">
        <span className="break-keep text-[clamp(1.1rem,5vw,1.35rem)] font-bold text-[var(--text-cafe-ink)]">
          총 결제 금액
        </span>
        <span className="shrink-0 text-[clamp(1.2rem,5.5vw,1.6rem)] font-bold text-[var(--text-cafe-ink)]">
          ₩{formatPrice(pricing.total)}
        </span>
      </div>
    </section>
  );
}
