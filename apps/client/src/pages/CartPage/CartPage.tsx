import { useNavigate } from "react-router-dom";

import { useCartStore, useCheckoutStore } from "@/app/store";
import {
  calculateCartPricing,
  CartBottomCheckoutBar,
  CartEmptyState,
  CartItemList,
  CartPricingSection,
  CartSelectToolbar,
} from "@/features/cart";
import { ROUTES } from "@/shared/constants/routes";

export function CartPage() {
  const navigate = useNavigate();
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const toggleSelected = useCartStore((state) => state.toggleSelected);
  const selectAll = useCartStore((state) => state.selectAll);
  const unselectAll = useCartStore((state) => state.unselectAll);
  const clearPurchasedItems = useCartStore((state) => state.clearPurchasedItems);
  const createCheckoutFromCart = useCheckoutStore((state) => state.createFromCart);
  const selectedItems = items.filter((item) => item.selected);

  const pricing = calculateCartPricing(selectedItems);
  const isAllSelected = items.length > 0 && selectedItems.length === items.length;

  function handleToggleAll() {
    if (isAllSelected) {
      unselectAll();
      return;
    }

    selectAll();
  }

  function handleRemoveSelected() {
    clearPurchasedItems(selectedItems.map((item) => item.cartItemId));
  }

  function handleCheckout() {
    if (!selectedItems.length) {
      return;
    }

    createCheckoutFromCart(selectedItems);
    navigate(ROUTES.purchase);
  }

  if (!items.length) {
    return <CartEmptyState />;
  }

  return (
    <div className="bg-[var(--surface-page-alt)] pb-[var(--fixed-action-page-padding)]">
      <CartSelectToolbar
        isAllSelected={isAllSelected}
        onRemoveSelected={handleRemoveSelected}
        onToggleAll={handleToggleAll}
        selectedCount={selectedItems.length}
      />
      <CartItemList
        items={items}
        onRemove={removeItem}
        onToggleSelected={toggleSelected}
        onUpdateQuantity={updateQuantity}
      />
      <CartPricingSection pricing={pricing} />
      <CartBottomCheckoutBar
        onCheckout={handleCheckout}
        selectedCount={selectedItems.length}
        total={pricing.total}
      />
    </div>
  );
}
