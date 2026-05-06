import type { Product } from "@/shared/types/models";

export interface ProductListParams {
  category?: Product["category"];
  query?: string;
}

export interface ProductRepository {
  list: (params?: ProductListParams) => Promise<Product[]>;
  getById: (productId: string) => Promise<Product | null>;
}
