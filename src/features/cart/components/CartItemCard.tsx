import { Minus, Plus, X } from "lucide-react";

import type { CartItem } from "@/app/store/cartStore";
import { buildCartItemOptionLabel } from "@/features/cart/cartItemDisplay";
import { mockProducts } from "@/mock/products";
import { formatPrice } from "@/shared/utils/format";

interface CartItemCardProps {
  item: CartItem;
  isLast: boolean;
  onRemove: (cartItemId: string) => void;
  onToggleSelected: (cartItemId: string) => void;
  onUpdateQuantity: (cartItemId: string, quantity: number) => void;
}

export function CartItemCard({
  item,
  isLast,
  onRemove,
  onToggleSelected,
  onUpdateQuantity,
}: CartItemCardProps) {
  const product = mockProducts.find((candidate) => candidate.id === item.productId);
  const lineTotal = item.unitPrice * item.quantity;

  return (
    <article className={["flex gap-4 px-6 py-8", !isLast ? "border-b border-[var(--palette-ebe6dd)]" : ""].join(" ")}>
      <button
        aria-label={`${item.productName} 선택`}
        className="mt-16"
        onClick={() => onToggleSelected(item.cartItemId)}
        type="button"
      >
        <span
          className={[
            "flex size-9 items-center justify-center rounded-[0.8rem] border",
            item.selected
              ? "border-[var(--second-color)] bg-[var(--second-color)]"
              : "border-[var(--palette-d7d0c5)] bg-white",
          ].join(" ")}
        />
      </button>

      <div className="flex h-[8.5rem] w-[8.5rem] shrink-0 items-center justify-center rounded-[1.5rem] bg-[var(--palette-dde6d4)]">
        {product ? (
          <img alt={item.productName} className="h-24 w-24 rounded-full object-cover" src={product.image} />
        ) : (
          <div className="text-4xl">☕</div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-[1.2rem] font-bold leading-8 tracking-[-0.03em] text-[var(--palette-141414)]">
              {item.productName}
            </h2>
            <p className="mt-1 text-[1rem] text-[var(--palette-6c6c6c)]">
              {buildCartItemOptionLabel(item, product)}
            </p>
          </div>
          <button
            aria-label={`${item.productName} 삭제`}
            className="text-[var(--palette-7a746d)]"
            onClick={() => onRemove(item.cartItemId)}
            type="button"
          >
            <X className="size-7 stroke-[1.5]" />
          </button>
        </div>

        <div className="mt-5 flex items-end justify-between gap-3">
          <div>
            <p className="text-[1.15rem] font-bold text-[var(--palette-992b22)]">
              ₩{formatPrice(item.unitPrice)}
            </p>
            {item.quantity > 1 ? (
              <p className="mt-1 text-[0.95rem] text-[var(--palette-76706a)]">
                (x{item.quantity}) 합계 ₩{formatPrice(lineTotal)}
              </p>
            ) : null}
          </div>

          <div className="flex items-center rounded-full bg-[var(--palette-f2efea)] px-2 py-1">
            <button
              className="flex size-10 items-center justify-center text-[var(--palette-55514a)]"
              onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
              type="button"
            >
              <Minus className="size-5" />
            </button>
            <span className="min-w-10 text-center text-[1.1rem] font-semibold text-[var(--palette-151515)]">
              {item.quantity}
            </span>
            <button
              className="flex size-10 items-center justify-center text-[var(--second-color)]"
              onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
              type="button"
            >
              <Plus className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
