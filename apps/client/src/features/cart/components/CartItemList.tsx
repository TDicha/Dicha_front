import type { CartItem } from "@/app/store/cartStore";
import { CartItemCard } from "@/features/cart/components/CartItemCard";

interface CartItemListProps {
  items: CartItem[];
  onRemove: (cartItemId: string) => void;
  onToggleSelected: (cartItemId: string) => void;
  onUpdateQuantity: (cartItemId: string, quantity: number) => void;
}

export function CartItemList({
  items,
  onRemove,
  onToggleSelected,
  onUpdateQuantity,
}: CartItemListProps) {
  return (
    <section className="space-y-2 py-2">
      {items.map((item) => (
        <CartItemCard
          key={item.cartItemId}
          item={item}
          onRemove={onRemove}
          onToggleSelected={onToggleSelected}
          onUpdateQuantity={onUpdateQuantity}
        />
      ))}
    </section>
  );
}
