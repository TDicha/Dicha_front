import { ROUTES } from "@/shared/constants/routes";
import type { Product } from "@/shared/types/models";

function decodeRouteValue(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export function toProductRouteKey(product: Pick<Product, "name">) {
  return encodeURIComponent(product.name.trim().replace(/\s+/g, "-"));
}

export function productDetailPath(product: Pick<Product, "name">) {
  return `${ROUTES.products}/${toProductRouteKey(product)}`;
}

export function isNumericProductRouteKey(value: string) {
  return /^\d+$/.test(value);
}

export function normalizeProductRouteKey(value: string) {
  return decodeRouteValue(value).trim().toLowerCase().replace(/[-_\s]+/g, " ");
}

export function matchesProductRouteKey(product: Pick<Product, "id" | "name">, value: string) {
  const lookupKey = normalizeProductRouteKey(value);

  return (
    lookupKey === normalizeProductRouteKey(product.id) ||
    lookupKey === normalizeProductRouteKey(product.name)
  );
}
