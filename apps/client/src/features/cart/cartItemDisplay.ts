import type { Product } from "@/shared/types/models";

interface DisplayCartItem {
  optionName: string;
}

export function buildCartItemOptionLabel(
  item: DisplayCartItem,
  product?: Product,
) {
  if (!product) {
    return item.optionName;
  }

  if (product.productType !== "beans") {
    return item.optionName;
  }

  return item.optionName;
}
