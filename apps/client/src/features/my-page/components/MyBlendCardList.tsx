import { Coffee, QrCode } from "lucide-react";
import { Link } from "react-router-dom";

import { PrimaryButton } from "@/components/common/PrimaryButton";
import { ROUTES } from "@/shared/constants/routes";
import { env } from "@/shared/lib/env";

import type { MyBlendCardWithRecipe } from "../useMyBlendCards";

interface MyBlendCardListProps {
  blendCards: MyBlendCardWithRecipe[];
  onDelete: (blendName: string) => void;
}

export function MyBlendCardList({ blendCards, onDelete }: MyBlendCardListProps) {
  return (
    <section className="mt-4 space-y-4">
      {blendCards.map((blend) => (
        <article
          key={blend.id}
          className="overflow-hidden rounded-[1.75rem] border-2 border-[var(--brand-secondary)] bg-[var(--surface-base)] shadow-[var(--shadow-card-muted)]"
        >
          <div className="flex items-start justify-between gap-3 bg-[var(--surface-green-card)] px-5 py-4">
            <div>
              <h2 className="text-[1.75rem] font-bold tracking-[-0.04em] text-[var(--brand-secondary)]">
                {blend.title}
              </h2>
              <div className="mt-3 flex items-center gap-2 text-[0.95rem] text-[var(--text-chip-muted)]">
                {blend.isQr ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-[var(--brand-accent-strong)] px-3 py-1 text-[var(--text-brand-deep)]">
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
            <span className="pt-1 text-[1rem] text-[var(--text-chip-muted)]">
              {blend.savedAt}
            </span>
          </div>

          <div className="px-5 py-4">
            <p className="text-[1.55rem] font-bold tracking-[-0.04em] text-[var(--text-brand-deep)]">
              {blend.beanName}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              {blend.recipe?.notes[0] ? (
                <span className="min-w-[5.5rem] rounded-full bg-[var(--brand-secondary)] px-5 py-2 text-center text-[1rem] font-semibold text-[var(--text-inverse)]">
                  {blend.recipe.notes[0]}
                </span>
              ) : null}
              <span className="rounded-full bg-[var(--surface-chip)] px-4 py-2 text-[1rem] text-[var(--text-chip-muted)]">
                {blend.method}
              </span>
              <span className="rounded-full bg-[var(--surface-chip)] px-4 py-2 text-[1rem] text-[var(--text-chip-muted)]">
                {blend.amount}
              </span>
            </div>

            <div className="mt-4 border-t border-[var(--border-list)] pt-4">
              <div className="grid grid-cols-[1.65fr_1fr] gap-3">
                <PrimaryButton
                  asChild
                  className="h-[3.25rem] rounded-[1rem] text-[1.15rem] shadow-none"
                >
                  <Link
                    to={
                      env.enableMock
                        ? `${ROUTES.products}/${blend.productId}`
                        : ROUTES.products
                    }
                  >
                    주문하기
                  </Link>
                </PrimaryButton>
                <button
                  className="h-[3.25rem] rounded-[1rem] border border-[var(--border-input-muted)] bg-[var(--surface-base)] text-[1.1rem] font-medium text-[var(--text-control-disabled)]"
                  onClick={() => onDelete(`${blend.title} 삭제`)}
                  type="button"
                >
                  삭제
                </button>
              </div>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
