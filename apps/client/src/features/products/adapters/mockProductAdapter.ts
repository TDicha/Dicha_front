import { mockProducts } from "@/mock/products";
import type { Product, ProductCategory } from "@/shared/types/models";

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

function matchesCategory(product: Product, categoryId?: string) {
  return categoryId ? product.category === categoryId : true;
}

function getMockCategories(): ProductCategory[] {
  const categories = new Map<string, ProductCategory>();

  mockProducts.forEach((product) => {
    categories.set(product.category, {
      id: product.category,
      name: product.categoryLabel ?? product.category,
      slug: product.category,
      displayOrder: categories.size + 1,
    });
  });

  return Array.from(categories.values());
}

export const mockProductAdapter: ProductRepository = {
  async listCategories() {
    return getMockCategories();
  },
  async list(params?: ProductListParams) {
    return mockProducts.filter(
      (product) =>
        matchesCategory(product, params?.categoryId) &&
        matchesQuery(product, params?.query),
    );
  },
  async getById(productId: string) {
    return mockProducts.find((product) => product.id === productId) ?? null;
  },
};
