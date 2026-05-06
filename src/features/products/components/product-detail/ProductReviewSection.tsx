import type { ProductDetailReview } from "@/mock/productDetails";

function getRatingText(rating: number) {
  return `${"★".repeat(rating)}${"☆".repeat(Math.max(0, 5 - rating))}`;
}

interface ProductReviewSectionProps {
  rating?: number;
  reviewMoreCount: number;
  reviews: ProductDetailReview[];
  reviewTotal: number;
}

export function ProductReviewSection({
  rating,
  reviewMoreCount,
  reviews,
  reviewTotal,
}: ProductReviewSectionProps) {
  return (
    <section className="bg-white px-4 py-4">
      <div className="flex items-center gap-2">
        <h2 className="text-[1.1rem] font-black text-[var(--palette-121212)]">리뷰</h2>
        <span className="text-[0.92rem] text-[var(--palette-666666)]">{reviewTotal}</span>
      </div>

      <div className="mt-2 flex items-end gap-2">
        <p className="text-[1.55rem] font-black text-[var(--accent-color)]">★ {rating?.toFixed(1) ?? "4.8"}</p>
        <p className="pb-1 text-[0.9rem] text-[var(--palette-666666)]">/ 5.0</p>
      </div>

      <div className="mt-3 border-t border-[var(--line-color)]">
        {reviews.map((review, index) => (
          <article
            key={review.id}
            className={["py-3", index < reviews.length - 1 ? "border-b border-[var(--line-color)]" : ""].join(" ")}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-[0.8rem] text-[var(--accent-color)]">{getRatingText(review.rating)}</span>
                <span className="text-[0.72rem] font-medium text-[var(--palette-121212)]">{review.author}</span>
              </div>
              <span className="text-[0.66rem] text-[var(--palette-666666)]">{review.date}</span>
            </div>
            <p className="mt-2 text-[0.82rem] leading-6 text-[var(--palette-121212)]">{review.content}</p>
            <p className="mt-2 text-[0.66rem] text-[var(--palette-666666)]">{review.optionLabel}</p>
          </article>
        ))}
      </div>

      <button
        className="mt-4 flex h-11 w-full items-center justify-center rounded-full border border-[var(--primary-color)] text-[0.92rem] font-medium text-[var(--primary-color)]"
        type="button"
      >
        더 보기 ({reviewMoreCount}개)
      </button>
    </section>
  );
}
