import type { Product, ProductCategory } from "@/shared/types/models";

export interface ProductListParams {
  query?: string;
  categoryId?: string;
}

export interface ProductRepository {
  listCategories: () => Promise<ProductCategory[]>;
  list: (params?: ProductListParams) => Promise<Product[]>;
  getById: (productId: string) => Promise<Product | null>;
}
