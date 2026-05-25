import type { CartPricingSummary } from "@/features/cart/cartPricing";
import { formatPrice } from "@/shared/utils/format";

interface CartPricingSectionProps {
  pricing: CartPricingSummary;
}

export function CartPricingSection({ pricing }: CartPricingSectionProps) {
  return (
    <section className="mt-4 border-y border-[var(--border-list)] bg-[var(--surface-base)] px-[var(--page-x)] py-6">
      <h3 className="text-xl font-bold text-[var(--text-heading)]">결제 금액</h3>
      <div className="mt-5 space-y-4 text-base">
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

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-[var(--border-strong)] pt-4">
        <span className="break-keep text-[clamp(1.1rem,5vw,1.35rem)] font-bold text-[var(--text-heading)]">
          총 결제 금액
        </span>
        <span className="shrink-0 text-[clamp(1.2rem,5.5vw,1.6rem)] font-bold text-[var(--text-price-danger)]">
          ₩{formatPrice(pricing.total)}
        </span>
      </div>
    </section>
  );
}
