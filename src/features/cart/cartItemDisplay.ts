import { getProductDetail } from "@/mock/productDetails";
import type { Product } from "@/shared/types/models";

interface DisplayCartItem {
  productName: string;
}

function getSelectedOptionName(item: DisplayCartItem, product?: Product) {
  const optionName = item.productName.split("/").at(1)?.trim();

  if (optionName) {
    return optionName;
  }

  return product?.options[0]?.name ?? "기본";
}

export function buildCartItemOptionLabel(
  item: DisplayCartItem,
  product?: Product,
) {
  if (!product) {
    return "기본 옵션";
  }

  const detail = getProductDetail(product);
  return `${detail.defaultRoastLabel} / ${getSelectedOptionName(item, product)} / ${detail.baseWeightLabel}`;
}
