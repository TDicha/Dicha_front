import { QrCode, Coffee } from "lucide-react";
import { Link } from "react-router-dom";

import { PrimaryButton } from "@/components/common/PrimaryButton";
import { mockMyBlendCards } from "@/mock/myBlends";
import { mockMyBlendRecipes } from "@/mock/user";
import { ROUTES } from "@/shared/constants/routes";

export function MyBlendPage() {
  const blendCards = mockMyBlendCards;

  if (!blendCards.length) {
    return (
      <div className="bg-white px-5 pb-10 pt-4">
        <section className="px-1 pb-10 pt-28 text-center">
          <div className="mx-auto flex size-32 items-center justify-center rounded-full bg-[var(--palette-dde7d6)]">
            <div className="text-[4rem]">☕</div>
          </div>
          <h2 className="mt-10 text-[2.1rem] font-bold tracking-[-0.04em] text-[var(--palette-171717)]">
            저장된 블렌드가 없습니다
          </h2>
          <p className="mt-4 text-[1.15rem] leading-8 text-[var(--palette-6d6a64)]">
            상품 주문 시 '나의 블렌드로 저장'을
            <br />
            눌러 나만의 레시피를 보관해 보세요!
          </p>
        </section>

        <section className="rounded-[1.5rem] bg-[var(--palette-f5f0e7)] px-5 py-5">
          <div className="flex items-start gap-3">
            <div className="mt-1 rounded-[0.4rem] bg-[var(--palette-cfa54f)] p-1 text-[var(--palette-fffaf1)]">
              <QrCode className="size-4" />
            </div>
            <div>
              <h3 className="text-[1.45rem] font-bold tracking-[-0.03em] text-[var(--palette-21422f)]">
                매장 QR로도 저장 가능!
              </h3>
              <p className="mt-2 text-[1rem] text-[var(--palette-6d6a64)]">
                매장에서 받은 QR을 스캔하면 자동 저장돼요
              </p>
            </div>
          </div>
        </section>

        <PrimaryButton
          asChild
          className="mt-8 h-16 w-full rounded-[1.2rem] text-[1.2rem] shadow-none"
        >
          <Link to={ROUTES.products}>원두 쇼핑하러 가기</Link>
        </PrimaryButton>
      </div>
    );
  }

  return (
    <div className="bg-[var(--palette-f8f6f1)] px-5 pb-8 pt-4">
      <section className="pt-4">
        <div className="flex items-center gap-3">
          <h1 className="text-[2rem] font-bold tracking-[-0.04em] text-[var(--palette-171717)]">
            나의 블렌드
          </h1>
          <span className="flex h-8 min-w-8 items-center justify-center rounded-full bg-[var(--second-color)] px-3 text-[1rem] font-bold text-white">
            {blendCards.length}
          </span>
        </div>

        <p className="mt-8 text-[1.55rem] font-bold tracking-[-0.04em] text-[var(--palette-171717)]">
          저장해둔 나만의 커스텀 원두예요
        </p>
        <p className="mt-3 text-[1.1rem] leading-7 text-[var(--palette-6d6a64)]">
          QR 스캔으로 저장된 블렌드도 여기서 확인하세요
        </p>

        <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-[var(--palette-f2e7c3)] px-3 py-1.5 text-[0.95rem] font-medium text-[var(--palette-8a6a1b)]">
          <span className="rounded-[0.3rem] bg-[var(--palette-cfa54f)] p-1 text-white">
            <QrCode className="size-3.5" />
          </span>
          매장 QR 블렌드
        </div>
      </section>

      <section className="mt-4 space-y-4">
        {blendCards.map((blend) => {
          const recipe = mockMyBlendRecipes.find(
            (item) => item.id === blend.recipeId,
          );

          return (
            <article
              key={blend.id}
              className="overflow-hidden rounded-[1.75rem] border-2 border-[var(--second-color)] bg-white shadow-[0_8px_20px_var(--rgba-32-74-50-005)]"
            >
              <div className="flex items-start justify-between gap-3 bg-[var(--palette-dfe8d6)] px-5 py-4">
                <div>
                  <h2 className="text-[1.75rem] font-bold tracking-[-0.04em] text-[var(--second-color)]">
                    {blend.title}
                  </h2>
                  <div className="mt-3 flex items-center gap-2 text-[0.95rem] text-[var(--palette-6f6a61)]">
                    {blend.isQr ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[var(--palette-cfa54f)] px-3 py-1 text-[var(--palette-173726)]">
                        <QrCode className="size-3.5" />
                        {blend.source}
                      </span>
                    ) : (
                      <>
                        <Coffee className="size-3.5" />
                        <span>{blend.source}</span>
                      </>
                    )}
                  </div>
                </div>
                <span className="pt-1 text-[1rem] text-[var(--palette-6f6a61)]">
                  {blend.savedAt}
                </span>
              </div>

              <div className="px-5 py-4">
                <p className="text-[1.55rem] font-bold tracking-[-0.04em] text-[var(--palette-173726)]">
                  {blend.beanName}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {recipe?.notes[0] ? (
                    <span className="min-w-[5.5rem] rounded-full bg-[var(--second-color)] px-5 py-2 text-center text-[1rem] font-semibold text-white">
                      {recipe.notes[0]}
                    </span>
                  ) : null}
                  <span className="rounded-full bg-[var(--palette-f3f2ef)] px-4 py-2 text-[1rem] text-[var(--palette-6f6a61)]">
                    {blend.method}
                  </span>
                  <span className="rounded-full bg-[var(--palette-f3f2ef)] px-4 py-2 text-[1rem] text-[var(--palette-6f6a61)]">
                    {blend.amount}
                  </span>
                </div>

                <div className="mt-4 border-t border-[var(--palette-ebe6dd)] pt-4">
                  <div className="grid grid-cols-[1.65fr_1fr] gap-3">
                    <PrimaryButton
                      asChild
                      className="h-[3.25rem] rounded-[1rem] text-[1.15rem] shadow-none"
                    >
                      <Link to={`${ROUTES.products}/${blend.productId}`}>
                        주문하기
                      </Link>
                    </PrimaryButton>
                    <button
                      className="h-[3.25rem] rounded-[1rem] border border-[var(--palette-d9d3c8)] bg-white text-[1.1rem] font-medium text-[var(--palette-c1bdb5)]"
                      type="button"
                    >
                      삭제
                    </button>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}
