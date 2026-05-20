import type { Review } from "@/shared/types/models";

export const mockReviews: Review[] = [
  {
    id: "review-1",
    author: "김다정",
    rating: 5,
    content: "산미가 튀지 않고 깔끔해서 아침마다 마시기 좋아요.",
  },
  {
    id: "review-2",
    author: "박태윤",
    rating: 4,
    content: "라떼 베이스로 쓰기 좋고 배송도 빨랐습니다.",
  },
];
