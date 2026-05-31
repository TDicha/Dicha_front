import { Link } from "react-router-dom";

import { BrandAvatar } from "@/components/common/BrandAvatar";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { ROUTES } from "@/shared/constants/routes";

const brewingSteps = [
  {
    title: "향을 깨우는 물 온도",
    description:
      "디차는 원두마다 다른 향미가 과하게 눌리지 않도록 88~94°C 사이의 물 온도를 추천합니다.",
  },
  {
    title: "첫 물은 천천히",
    description:
      "뜸 들이기 단계에서 커피가 머금은 가스를 빼내면 단맛과 향이 더 부드럽게 열립니다.",
  },
  {
    title: "마지막 한 모금까지 균형 있게",
    description:
      "분쇄도와 추출 시간을 조절해 산미, 바디, 단맛이 균형을 이루는 한 잔을 완성합니다.",
  },
] as const;

export function BrewingStoryPage() {
  return (
    <div className="page-content cafe-tile-bg space-y-5 px-0 pb-24 pt-0">
      <section className="bg-[var(--surface-chalkboard)] px-[var(--page-x)] py-9 text-[var(--text-chalk)]">
        <BrandAvatar className="border-[var(--border-chalk-highlight)] bg-[var(--surface-chalkboard-highlight)]" />
        <p className="mt-6 text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-[var(--text-chalk-muted)]">
          Brewing Story
        </p>
        <h1 className="mt-2 font-heading text-[clamp(2rem,9vw,2.7rem)] font-semibold leading-tight tracking-[-0.05em]">
          디차가 한 잔을
          <br />
          완성하는 방식
        </h1>
        <p className="mt-4 max-w-[22rem] text-sm leading-6 text-[var(--text-chalk-muted)]">
          같은 원두도 물, 시간, 분쇄도에 따라 전혀 다른 향으로 열립니다. 디차의
          브루잉 스토리는 그 작은 차이를 맛있게 다루는 이야기입니다.
        </p>
      </section>

      <section className="mx-[var(--page-x)] bg-[var(--surface-menu-board)] px-5 py-5 text-[var(--text-cafe-ink)]">
        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-[var(--text-muted)]">
          DICHA Method
        </p>
        <div className="mt-4 divide-y divide-[var(--border-tile-grout)]">
          {brewingSteps.map((step, index) => (
            <article key={step.title} className="py-5 first:pt-0 last:pb-0">
              <span className="font-heading text-sm font-semibold text-[var(--text-muted)]">
                0{index + 1}
              </span>
              <h2 className="mt-2 font-heading text-xl font-semibold">
                {step.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <div className="px-[var(--page-x)]">
        <PrimaryButton
          asChild
          className="h-12 w-full rounded-none bg-[var(--surface-chalkboard)] text-[var(--text-chalk)] shadow-none"
        >
          <Link to={ROUTES.products}>원두 보러가기</Link>
        </PrimaryButton>
      </div>
    </div>
  );
}
