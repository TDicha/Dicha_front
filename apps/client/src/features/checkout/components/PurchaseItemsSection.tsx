import type { CartItem } from "@/app/store/cartStore";
import { buildCartItemOptionLabel } from "@/features/cart/cartItemDisplay";
import { mockProducts } from "@/mock/products";
import { formatPrice } from "@/shared/utils/format";

interface PurchaseItemsSectionProps {
  items: CartItem[];
}

export function PurchaseItemsSection({ items }: PurchaseItemsSectionProps) {
  return (
    <section className="mt-4 bg-[var(--surface-base)] px-[var(--page-x)] py-6">
      <h2 className="text-[1.2rem] font-bold text-[var(--text-heading)]">주문 상품</h2>
      <div className="mt-5 space-y-4">
        {items.map((item, index) => {
          const product = mockProducts.find((candidate) => candidate.id === item.productId);

          return (
            <div
              key={item.cartItemId}
              className={index < items.length - 1 ? "border-b border-[var(--border-list)] pb-4" : ""}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="break-keep text-[1.05rem] font-semibold text-[var(--text-heading)]">
                    {item.productName}
                  </p>
                  <p className="mt-1 text-[0.95rem] text-[var(--text-muted-warm)]">
                    {buildCartItemOptionLabel(item, product)}
                  </p>
                  <p className="mt-1 text-[0.95rem] text-[var(--text-muted-warm)]">수량 {item.quantity}개</p>
                </div>
                <span className="shrink-0 text-[1rem] font-semibold text-[var(--text-heading)]">
                  ₩{formatPrice(item.unitPrice * item.quantity)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
