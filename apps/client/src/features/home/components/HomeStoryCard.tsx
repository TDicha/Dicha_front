import { Link } from "react-router-dom";

import { AppCard } from "@/components/common/AppCard";
import { BrandAvatar } from "@/components/common/BrandAvatar";
import { ROUTES } from "@/shared/constants/routes";

export function HomeStoryCard() {
  return (
    <section>
      <h3 className="font-heading text-[1.35rem] font-semibold tracking-[-0.03em] text-[var(--text-cafe-ink)]">
        DICHA story
      </h3>
      <AppCard
        className="mt-4 rounded-[1.7rem] px-5 py-5"
        padding="none"
        variant="menu-board"
      >
        <Link
          aria-label="브루잉 스토리로 이동"
          className="block"
          to={ROUTES.brewingStory}
        >
          <div className="mb-4 flex items-center gap-3 border-b border-[var(--border-menu-board)] pb-4">
            <BrandAvatar />
            <div>
              <p className="font-heading text-lg font-semibold tracking-[0.12em] text-[var(--text-cafe-ink)]">
                DICHA
              </p>
              <p className="text-[0.58rem] font-semibold uppercase tracking-[0.24em] text-[var(--text-muted)]">
                Special Blending Coffee
              </p>
            </div>
          </div>
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h3 className="font-heading text-lg font-semibold tracking-[-0.03em] text-[var(--text-cafe-ink)]">
                DICHA의 이야기
              </h3>
              <p className="mt-2 max-w-none break-keep text-sm leading-6 text-[var(--text-muted)]">
                달라홀스처럼 변하지 않는 품질로 당신만의 원두를 로스팅합니다.
                향으로 기억되는 한 잔을 전합니다.
              </p>
            </div>
          </div>
        </Link>
      </AppCard>
    </section>
  );
}
