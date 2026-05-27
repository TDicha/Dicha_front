import type { Product, ProductType } from "@/shared/types/models";

export type ProductSortKey = "recommended" | "popular" | "price";
export type ProductCategoryKey = Product["category"] | "all";
export type ProductTypeKey = ProductType;

export interface ProductCategoryOption {
  key: ProductCategoryKey;
  label: string;
}

export interface ProductSortOption {
  key: ProductSortKey;
  label: string;
}

export interface ProductTypeOption {
  key: ProductTypeKey;
  label: string;
  description: string;
}
