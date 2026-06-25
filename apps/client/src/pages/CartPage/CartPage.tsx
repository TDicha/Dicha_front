import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthStore, useCartStore, useCheckoutStore } from "@/app/store";
import { LoadingScreen } from "@/components/common/LoadingScreen";
import {
  calculateCartPricing,
  CartBottomCheckoutBar,
  CartEmptyState,
  CartItemList,
  CartPricingSection,
  CartSelectToolbar,
  useCartItems,
  useClearCartItems,
  useRemoveCartItem,
  useUpdateCartItemQuantity,
} from "@/features/cart";
import {
  toAnalyticsCartItem,
  toAnalyticsCartItems,
  trackAnalyticsEvent,
} from "@/services/analytics";
import { ROUTES } from "@/shared/constants/routes";

export function CartPage() {
  const navigate = useNavigate();
  const authStatus = useAuthStore((state) => state.status);
  const items = useCartStore((state) => state.items);
  const setItems = useCartStore((state) => state.setItems);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const toggleSelected = useCartStore((state) => state.toggleSelected);
  const selectAll = useCartStore((state) => state.selectAll);
  const unselectAll = useCartStore((state) => state.unselectAll);
  const clearPurchasedItems = useCartStore(
    (state) => state.clearPurchasedItems,
  );
  const createCheckoutFromCart = useCheckoutStore(
    (state) => state.createFromCart,
  );
  const shouldUseCartApi = authStatus === "authenticated";
  const cartQuery = useCartItems(shouldUseCartApi);
  const updateCartItemQuantityMutation = useUpdateCartItemQuantity();
  const removeCartItemMutation = useRemoveCartItem();
  const clearCartItemsMutation = useClearCartItems();
  const selectedItems = items.filter((item) => item.selected);
  const trackedCartKeyRef = useRef<string | null>(null);

  const pricing = calculateCartPricing(selectedItems);
  const isAllSelected =
    items.length > 0 && selectedItems.length === items.length;

  useEffect(() => {
    if (shouldUseCartApi && cartQuery.data) {
      setItems(cartQuery.data);
    }
  }, [cartQuery.data, setItems, shouldUseCartApi]);

  useEffect(() => {
    if (!items.length) {
      return;
    }

    const cartKey = items
      .map((item) => `${item.cartItemId}:${item.quantity}`)
      .join(",");

    if (trackedCartKeyRef.current === cartKey) {
      return;
    }

    trackedCartKeyRef.current = cartKey;
    trackAnalyticsEvent("view_cart", {
      currency: "KRW",
      value: calculateCartPricing(items).total,
      items: toAnalyticsCartItems(items),
    });
  }, [items]);

  function handleToggleAll() {
    if (isAllSelected) {
      unselectAll();
      return;
    }

    selectAll();
  }

  function handleRemoveSelected() {
    const selectedCartItemIds = selectedItems.map((item) => item.cartItemId);
    const removedValue = calculateCartPricing(selectedItems).total;

    trackAnalyticsEvent("remove_from_cart", {
      currency: "KRW",
      value: removedValue,
      items: toAnalyticsCartItems(selectedItems),
    });

    clearPurchasedItems(selectedCartItemIds);

    if (!shouldUseCartApi) {
      return;
    }

    if (isAllSelected) {
      clearCartItemsMutation.mutate();
      return;
    }

    selectedCartItemIds.forEach((cartItemId) => {
      removeCartItemMutation.mutate(cartItemId);
    });
  }

  function handleUpdateQuantity(cartItemId: string, quantity: number) {
    updateQuantity(cartItemId, quantity);

    if (shouldUseCartApi) {
      updateCartItemQuantityMutation.mutate({
        cartItemId,
        quantity: Math.max(1, quantity),
      });
    }
  }

  function handleRemoveItem(cartItemId: string) {
    const targetItem = items.find((item) => item.cartItemId === cartItemId);

    if (targetItem) {
      trackAnalyticsEvent("remove_from_cart", {
        currency: "KRW",
        value: targetItem.unitPrice * targetItem.quantity,
        items: [toAnalyticsCartItem(targetItem)],
      });
    }

    removeItem(cartItemId);

    if (shouldUseCartApi) {
      removeCartItemMutation.mutate(cartItemId);
    }
  }

  function handleCheckout() {
    if (!selectedItems.length) {
      return;
    }

    createCheckoutFromCart(selectedItems);
    navigate(ROUTES.purchase);
  }

  if (shouldUseCartApi && cartQuery.isLoading) {
    return (
      <LoadingScreen className="min-h-full" message="장바구니를 불러오는 중" />
    );
  }

  if (!items.length) {
    return <CartEmptyState />;
  }

  return (
    <div className="cafe-tile-bg min-h-full pb-[var(--fixed-action-page-padding)]">
      <CartSelectToolbar
        isAllSelected={isAllSelected}
        onRemoveSelected={handleRemoveSelected}
        onToggleAll={handleToggleAll}
        selectedCount={selectedItems.length}
      />
      <CartItemList
        items={items}
        onRemove={handleRemoveItem}
        onToggleSelected={toggleSelected}
        onUpdateQuantity={handleUpdateQuantity}
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
