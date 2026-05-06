import { useQuery } from "@tanstack/react-query";

import { productRepository } from "../repositories/productRepository";
import type { ProductListParams } from "../types";

export const productQueryKeys = {
  all: ["products"] as const,
  list: (params?: ProductListParams) =>
    [...productQueryKeys.all, "list", params ?? {}] as const,
  detail: (productId: string) =>
    [...productQueryKeys.all, "detail", productId] as const,
};

export function useProducts(params?: ProductListParams) {
  return useQuery({
    queryKey: productQueryKeys.list(params),
    queryFn: () => productRepository.list(params),
  });
}

export function useProduct(productId?: string) {
  return useQuery({
    enabled: Boolean(productId),
    queryKey: productQueryKeys.detail(productId ?? ""),
    queryFn: () => productRepository.getById(productId ?? ""),
  });
}
