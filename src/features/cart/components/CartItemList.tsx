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
    <section className="bg-white">
      {items.map((item, index) => (
        <CartItemCard
          key={item.cartItemId}
          isLast={index === items.length - 1}
          item={item}
          onRemove={onRemove}
          onToggleSelected={onToggleSelected}
          onUpdateQuantity={onUpdateQuantity}
        />
      ))}
    </section>
  );
}
