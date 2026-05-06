import { apiClient } from "@/services/api/client";
import { endpoints } from "@/services/api/endpoints";
import type { Product } from "@/shared/types/models";

import type { ProductListParams, ProductRepository } from "../types";

export const apiProductAdapter: ProductRepository = {
  async list(params?: ProductListParams) {
    const { data } = await apiClient.get<Product[]>(endpoints.products.list, {
      params,
    });

    return data;
  },
  async getById(productId: string) {
    const { data } = await apiClient.get<Product>(
      endpoints.products.detail(productId),
    );

    return data;
  },
};
