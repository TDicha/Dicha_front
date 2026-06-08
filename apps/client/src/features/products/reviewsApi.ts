import { apiClient } from "@/services/api/client";
import { endpoints } from "@/services/api/endpoints";

export interface ProductReview {
  id: string;
  author: string;
  content: string;
  date: string;
  optionLabel: string;
  rating: number;
}

interface ApiReview {
  id: number | string;
  authorName?: string;
  rating?: number;
  content?: string;
  createdAt?: string;
}

function toReview(review: ApiReview): ProductReview {
  return {
    id: String(review.id),
    author: review.authorName ?? "고객",
    content: review.content ?? "",
    date: review.createdAt?.slice(0, 10).replaceAll("-", ".") ?? "",
    optionLabel: "구매 리뷰",
    rating: review.rating ?? 0,
  };
}

export async function fetchProductReviews(productId: string) {
  const { data } = await apiClient.get<ApiReview[]>(
    endpoints.products.reviews(productId),
  );
  return data.map(toReview);
}
