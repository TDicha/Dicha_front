import { useQuery } from "@tanstack/react-query";

import { fetchProductReviews } from "@/features/products/reviewsApi";

export const productReviewQueryKeys = {
  all: ["product-reviews"] as const,
  list: (productId: string) =>
    [...productReviewQueryKeys.all, productId] as const,
};

export function useProductReviews(productId?: string) {
  return useQuery({
    enabled: Boolean(productId),
    queryKey: productReviewQueryKeys.list(productId ?? ""),
    queryFn: () => fetchProductReviews(productId ?? ""),
  });
}
