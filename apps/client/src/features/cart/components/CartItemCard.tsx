import { Check, Minus, Plus, X } from "lucide-react";

import type { CartItem } from "@/app/store/cartStore";
import { buildCartItemOptionLabel } from "@/features/cart/cartItemDisplay";
import { formatPrice } from "@/shared/utils/format";

interface CartItemCardProps {
  item: CartItem;
  onRemove: (cartItemId: string) => void;
  onToggleSelected: (cartItemId: string) => void;
  onUpdateQuantity: (cartItemId: string, quantity: number) => void;
}

export function CartItemCard({
  item,
  onRemove,
  onToggleSelected,
  onUpdateQuantity,
}: CartItemCardProps) {
  const lineTotal = item.unitPrice * item.quantity;

  return (
    <article className="flex gap-3 bg-[var(--surface-menu-board)] px-[var(--page-x)] py-6 max-[360px]:gap-2 min-[380px]:gap-4">
      <button
        aria-label={`${item.productName} 선택`}
        className="mt-11 shrink-0 min-[380px]:mt-14"
        onClick={() => onToggleSelected(item.cartItemId)}
        type="button"
      >
        <span
          className={[
            "flex size-7 items-center justify-center min-[380px]:size-9",
            item.selected
              ? "bg-[var(--surface-chalkboard)] text-[var(--text-chalk)]"
              : "bg-[var(--surface-cafe-tile)] text-transparent",
          ].join(" ")}
        >
          <Check className="size-4 min-[380px]:size-5" />
        </span>
      </button>

      <div className="flex size-[clamp(5rem,28vw,8.5rem)] shrink-0 items-center justify-center bg-[var(--surface-cafe-tile)]">
        {item.productImage ? (
          <img
            alt={item.productName}
            className="size-[clamp(4rem,21vw,6rem)] object-cover"
            src={item.productImage}
          />
        ) : (
          <div className="text-4xl">☕</div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="break-keep text-[clamp(0.92rem,4vw,1.1rem)] font-bold leading-6 text-[var(--text-rich)]">
              {item.productName}
            </h2>
            <p className="mt-1 break-keep text-sm leading-5 text-[var(--text-product-muted)]">
              {buildCartItemOptionLabel(item)}
            </p>
          </div>
          <button
            aria-label={`${item.productName} 삭제`}
            className="text-[var(--text-muted)]"
            onClick={() => onRemove(item.cartItemId)}
            type="button"
          >
            <X className="size-5 stroke-[1.5] min-[380px]:size-6" />
          </button>
        </div>

        <div className="mt-3 flex flex-wrap items-end justify-between gap-2 min-[380px]:mt-5">
          <div className="min-w-0">
            <p className="text-base font-bold text-[var(--text-cafe-ink)]">
              ₩{formatPrice(item.unitPrice)}
            </p>
            {item.quantity > 1 ? (
              <p className="mt-1 text-xs text-[var(--text-meta-warm)]">
                (x{item.quantity}) 합계 ₩{formatPrice(lineTotal)}
              </p>
            ) : null}
          </div>

          <div className="flex shrink-0 items-center bg-[var(--surface-cafe-tile)] px-1 py-1">
            <button
              className="flex size-8 items-center justify-center text-[var(--text-cafe-ink)] min-[380px]:size-10"
              onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
              type="button"
            >
              <Minus className="size-5" />
            </button>
            <span className="min-w-8 text-center text-base font-semibold text-[var(--text-cafe-ink)] min-[380px]:min-w-10">
              {item.quantity}
            </span>
            <button
              className="flex size-8 items-center justify-center text-[var(--text-cafe-ink)] min-[380px]:size-10"
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
