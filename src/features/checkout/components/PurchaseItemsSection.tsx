import type { CartItem } from "@/app/store/cartStore";
import { buildCartItemOptionLabel } from "@/features/cart/cartItemDisplay";
import { mockProducts } from "@/mock/products";
import { formatPrice } from "@/shared/utils/format";

interface PurchaseItemsSectionProps {
  items: CartItem[];
}

export function PurchaseItemsSection({ items }: PurchaseItemsSectionProps) {
  return (
    <section className="mt-4 bg-white px-6 py-6">
      <h2 className="text-[1.2rem] font-bold text-[var(--palette-171717)]">주문 상품</h2>
      <div className="mt-5 space-y-4">
        {items.map((item, index) => {
          const product = mockProducts.find((candidate) => candidate.id === item.productId);

          return (
            <div
              key={item.cartItemId}
              className={index < items.length - 1 ? "border-b border-[var(--palette-ebe6dd)] pb-4" : ""}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[1.05rem] font-semibold text-[var(--palette-171717)]">{item.productName}</p>
                  <p className="mt-1 text-[0.95rem] text-[var(--palette-6d6a64)]">
                    {buildCartItemOptionLabel(item, product)}
                  </p>
                  <p className="mt-1 text-[0.95rem] text-[var(--palette-6d6a64)]">수량 {item.quantity}개</p>
                </div>
                <span className="text-[1rem] font-semibold text-[var(--palette-171717)]">
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
