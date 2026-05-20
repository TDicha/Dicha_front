import type { CartPricingSummary } from "@/features/cart/cartPricing";
import { formatPrice } from "@/shared/utils/format";

interface CartPricingSectionProps {
  pricing: CartPricingSummary;
}

export function CartPricingSection({ pricing }: CartPricingSectionProps) {
  return (
    <section className="mt-5 border-y border-[var(--border-list)] bg-[var(--surface-base)] px-[var(--page-x)] py-8">
      <h3 className="text-[1.65rem] font-bold tracking-[-0.04em] text-[var(--text-heading)]">결제 금액</h3>
      <div className="mt-7 space-y-6 text-[1.15rem]">
        <div className="flex items-center justify-between">
          <span className="text-[var(--text-muted-subtle)]">상품 금액</span>
          <span className="font-semibold text-[var(--text-default)]">₩{formatPrice(pricing.subtotal)}</span>
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

      <div className="mt-7 flex items-center justify-between gap-3 border-t border-[var(--border-strong)] pt-5">
        <span className="break-keep text-[clamp(1.35rem,5.8vw,1.8rem)] font-bold tracking-[-0.04em] text-[var(--text-heading)]">
          총 결제 금액
        </span>
        <span className="shrink-0 text-[clamp(1.45rem,6.2vw,2.1rem)] font-bold tracking-[-0.04em] text-[var(--text-price-danger)]">
          ₩{formatPrice(pricing.total)}
        </span>
      </div>
    </section>
  );
}
