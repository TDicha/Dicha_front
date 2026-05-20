import { create } from "zustand";

export interface CartItem {
  cartItemId: string;
  productId: string;
  optionId: string;
  productName: string;
  optionName: string;
  productImage?: string;
  unitPrice: number;
  quantity: number;
  selected: boolean;
}

interface CartState {
  items: CartItem[];
  setItems: (items: CartItem[]) => void;
  addItem: (item: CartItem) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  removeItem: (cartItemId: string) => void;
  toggleSelected: (cartItemId: string) => void;
  selectAll: () => void;
  unselectAll: () => void;
  clearPurchasedItems: (cartItemIds: string[]) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  setItems: (items) => set({ items }),
  addItem: (item) =>
    set((state) => {
      const existingItem = state.items.find(
        (cartItem) => cartItem.optionId === item.optionId,
      );

      if (existingItem) {
        return {
          items: state.items.map((cartItem) =>
            cartItem.cartItemId === existingItem.cartItemId
              ? {
                  ...cartItem,
                  quantity: cartItem.quantity + item.quantity,
                  selected: true,
                }
              : cartItem,
          ),
        };
      }

      return { items: [...state.items, item] };
    }),
  updateQuantity: (cartItemId, quantity) =>
    set((state) => ({
      items: state.items
        .map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: Math.max(1, quantity) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    })),
  removeItem: (cartItemId) =>
    set((state) => ({
      items: state.items.filter((item) => item.cartItemId !== cartItemId),
    })),
  toggleSelected: (cartItemId) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.cartItemId === cartItemId
          ? { ...item, selected: !item.selected }
          : item,
      ),
    })),
  selectAll: () =>
    set((state) => ({
      items: state.items.map((item) => ({ ...item, selected: true })),
    })),
  unselectAll: () =>
    set((state) => ({
      items: state.items.map((item) => ({ ...item, selected: false })),
    })),
  clearPurchasedItems: (cartItemIds) =>
    set((state) => ({
      items: state.items.filter((item) => !cartItemIds.includes(item.cartItemId)),
    })),
  clearCart: () => set({ items: [] }),
}));
