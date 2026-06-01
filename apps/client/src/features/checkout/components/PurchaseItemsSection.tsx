import type { CartItem } from "@/app/store/cartStore";
import { buildCartItemOptionLabel } from "@/features/cart/cartItemDisplay";
import { formatPrice } from "@/shared/utils/format";

interface PurchaseItemsSectionProps {
  items: CartItem[];
}

export function PurchaseItemsSection({ items }: PurchaseItemsSectionProps) {
  return (
    <section className="mt-2 bg-[var(--surface-menu-board)] px-[var(--page-x)] py-6">
      <p className="text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-[var(--text-muted)]">
        Items
      </p>
      <h2 className="mt-1 text-[1.2rem] font-bold text-[var(--text-cafe-ink)]">주문 상품</h2>
      <div className="mt-5 space-y-2">
        {items.map((item) => (
          <div
            key={item.cartItemId}
            className="bg-[var(--surface-cafe-tile)] px-4 py-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="break-keep text-[1.05rem] font-semibold text-[var(--text-cafe-ink)]">
                  {item.productName}
                </p>
                <p className="mt-1 text-[0.95rem] text-[var(--text-muted-warm)]">
                  {buildCartItemOptionLabel(item)}
                </p>
                <p className="mt-1 text-[0.95rem] text-[var(--text-muted-warm)]">수량 {item.quantity}개</p>
              </div>
              <span className="shrink-0 text-[1rem] font-semibold text-[var(--text-cafe-ink)]">
                ₩{formatPrice(item.unitPrice * item.quantity)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
