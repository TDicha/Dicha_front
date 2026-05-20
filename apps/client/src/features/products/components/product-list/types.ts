import type { Product } from "@/shared/types/models";

export type ProductSortKey = "recommended" | "popular" | "price";
export type ProductCategoryKey = Product["category"] | "all";

export interface ProductCategoryOption {
  key: ProductCategoryKey;
  label: string;
}

export interface ProductSortOption {
  key: ProductSortKey;
  label: string;
}
