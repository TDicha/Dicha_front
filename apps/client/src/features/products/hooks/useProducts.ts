import { useQuery } from "@tanstack/react-query";

import { productRepository } from "../repositories/productRepository";
import type { ProductListParams } from "../types";

export const productQueryKeys = {
  all: ["products"] as const,
  categories: () => [...productQueryKeys.all, "categories"] as const,
  list: (params?: ProductListParams) =>
    [...productQueryKeys.all, "list", params ?? {}] as const,
  detail: (productId: string) =>
    [...productQueryKeys.all, "detail", productId] as const,
  options: (productId: string) =>
    [...productQueryKeys.all, "options", productId] as const,
};

export function useProductCategories() {
  return useQuery({
    queryKey: productQueryKeys.categories(),
    queryFn: () => productRepository.listCategories(),
  });
}

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

export function useProductOptions(productId?: string) {
  return useQuery({
    enabled: Boolean(productId),
    queryKey: productQueryKeys.options(productId ?? ""),
    queryFn: async () => {
      const product = await productRepository.getById(productId ?? "");
      return product?.options ?? [];
    },
  });
}
