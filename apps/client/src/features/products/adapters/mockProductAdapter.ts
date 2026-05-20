import { mockProducts } from "@/mock/products";
import type { Product } from "@/shared/types/models";

import type { ProductListParams, ProductRepository } from "../types";

function matchesQuery(product: Product, query?: string) {
  const normalizedQuery = query?.trim().toLowerCase();

  if (!normalizedQuery) {
    return true;
  }

  return `${product.name} ${product.subtitle} ${product.originLabel ?? ""} ${product.notes.join(" ")}`
    .toLowerCase()
    .includes(normalizedQuery);
}

function matchesCategory(product: Product, category?: Product["category"]) {
  return category ? product.category === category : true;
}

export const mockProductAdapter: ProductRepository = {
  async list(params?: ProductListParams) {
    return mockProducts.filter(
      (product) =>
        matchesCategory(product, params?.category) &&
        matchesQuery(product, params?.query),
    );
  },
  async getById(productId: string) {
    return mockProducts.find((product) => product.id === productId) ?? null;
  },
};
