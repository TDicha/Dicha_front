import type { ProductDetailReview } from "@/mock/productDetails";

function getRatingText(rating: number) {
  return `${"★".repeat(rating)}${"☆".repeat(Math.max(0, 5 - rating))}`;
}

interface ProductReviewSectionProps {
  rating?: number;
  onViewMore?: () => void;
  reviewMoreCount: number;
  reviews: ProductDetailReview[];
  reviewTotal: number;
}

export function ProductReviewSection({
  rating,
  onViewMore,
  reviewMoreCount,
  reviews,
  reviewTotal,
}: ProductReviewSectionProps) {
  return (
    <section className="bg-[var(--surface-menu-board)] px-[var(--page-x)] py-5">
      <p className="text-[0.6rem] font-semibold tracking-[0.18em] text-[var(--text-muted)]">
        CUSTOMER REVIEW
      </p>
      <div className="mt-2 flex items-center gap-2">
        <h2 className="text-[1.1rem] font-black text-[var(--text-cafe-ink)]">
          리뷰
        </h2>
        <span className="text-[0.92rem] text-[var(--text-muted-subtle)]">
          {reviewTotal}
        </span>
      </div>

      {reviewTotal > 0 ? (
        <div className="mt-2 flex items-end gap-2">
          <p className="text-[1.55rem] font-black text-[var(--text-cafe-ink)]">
            ★ {rating?.toFixed(1) ?? "0.0"}
          </p>
          <p className="pb-1 text-[0.9rem] text-[var(--text-muted-subtle)]">
            / 5.0
          </p>
        </div>
      ) : (
        <p className="mt-3 text-sm text-[var(--text-muted)]">
          아직 등록된 리뷰가 없습니다.
        </p>
      )}

      {reviews.length > 0 ? (
        <div className="mt-3">
          {reviews.map((review, index) => (
            <article
              key={review.id}
              className={[
                "py-3",
                index < reviews.length - 1 ? "pb-4" : "",
              ].join(" ")}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-[0.8rem] text-[var(--text-cafe-ink)]">
                    {getRatingText(review.rating)}
                  </span>
                  <span className="text-[0.72rem] font-medium text-[var(--text-cafe-ink)]">
                    {review.author}
                  </span>
                </div>
                <span className="text-[0.66rem] text-[var(--text-muted-subtle)]">
                  {review.date}
                </span>
              </div>
              <p className="mt-2 text-[0.82rem] leading-6 text-[var(--text-cafe-ink)]">
                {review.content}
              </p>
              <p className="mt-2 text-[0.66rem] text-[var(--text-muted-subtle)]">
                {review.optionLabel}
              </p>
            </article>
          ))}
        </div>
      ) : null}

      {reviewMoreCount > 0 ? (
        <button
          className="mt-4 flex h-11 w-full items-center justify-center bg-[var(--surface-cafe-tile)] text-[0.92rem] font-medium text-[var(--text-cafe-ink)]"
          onClick={onViewMore}
          type="button"
        >
          더 보기 ({reviewMoreCount}개)
        </button>
      ) : null}
    </section>
  );
}
