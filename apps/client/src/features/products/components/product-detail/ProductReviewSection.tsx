import { BrandAvatar } from "@/components/common/BrandAvatar";

interface ProductReview {
  id: string;
  author: string;
  content: string;
  date: string;
  optionLabel: string;
  rating: number;
}

function getRatingText(rating: number) {
  return `${"★".repeat(rating)}${"☆".repeat(Math.max(0, 5 - rating))}`;
}

interface ProductReviewSectionProps {
  rating?: number;
  onViewMore?: () => void;
  reviewMoreCount: number;
  reviews: ProductReview[];
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
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-start gap-3">
                  <BrandAvatar className="size-10 border border-[var(--border-menu-board)]" />
                  <div className="min-w-0">
                    <p className="truncate text-[0.78rem] font-semibold text-[var(--text-cafe-ink)]">
                      {review.author}
                    </p>
                    <p className="mt-1 text-[0.78rem] text-[var(--text-cafe-ink)]">
                      {getRatingText(review.rating)}
                    </p>
                  </div>
                </div>
                <span className="shrink-0 pt-1 text-[0.66rem] text-[var(--text-muted-subtle)]">
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
