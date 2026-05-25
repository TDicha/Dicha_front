import { getProductDetail } from "@/mock/productDetails";
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

  const detail = getProductDetail(product);
  return `${detail.defaultRoastLabel} / ${item.optionName} / ${detail.baseWeightLabel}`;
}
