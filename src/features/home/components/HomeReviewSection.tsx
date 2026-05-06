import { Camera } from "lucide-react";

import { AppCard } from "@/components/common/AppCard";
import type { Review } from "@/shared/types/models";

function getRatingText(rating: number) {
  return `${"★".repeat(rating)}${"☆".repeat(Math.max(0, 5 - rating))}`;
}

interface HomeReviewSectionProps {
  reviews: Review[];
}

export function HomeReviewSection({ reviews }: HomeReviewSectionProps) {
  return (
    <section>
      <h3 className="font-heading text-[1.35rem] font-semibold tracking-[-0.03em] text-[var(--color-primary-green)]">
        포토 리뷰
      </h3>
      <div className="mt-3 grid grid-cols-2 gap-3">
        {reviews.map((review) => (
          <AppCard key={review.id} className="overflow-hidden rounded-[1.25rem]" padding="none">
            <div className="flex h-[5.25rem] items-center justify-center bg-[linear-gradient(180deg,var(--palette-ebe8df)_0%,var(--palette-ddd7ca)_100%)]">
              <Camera className="size-6 text-[var(--color-primary-green)]" />
            </div>
            <div className="px-3 py-2.5">
              <p className="text-xs text-[var(--color-accent-gold)]">{getRatingText(review.rating)}</p>
              <p className="mt-1 text-xs leading-5 text-[var(--color-ink)]">&quot;{review.content}&quot;</p>
            </div>
          </AppCard>
        ))}
      </div>
    </section>
  );
}
