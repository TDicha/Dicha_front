import { ArrowRight, Coffee } from "lucide-react";
import { Link } from "react-router-dom";

import { AppCard } from "@/components/common/AppCard";
import { homeRoasterPick } from "@/mock/home";
import { ROUTES } from "@/shared/constants/routes";
import type { Product } from "@/shared/types/models";

interface HomeRoasterPickSectionProps {
  product?: Product;
  roasterPickMeta: typeof homeRoasterPick;
}

export function HomeRoasterPickSection({
  product,
  roasterPickMeta,
}: HomeRoasterPickSectionProps) {
  if (!product) {
    return null;
  }

  return (
    <AppCard className="relative overflow-hidden rounded-[1.6rem]" variant="warm">
      <span className="absolute right-4 top-4 flex size-[clamp(4.25rem,20vw,5.25rem)] items-center justify-center rounded-full bg-[var(--surface-accent-orb)]">
        <Coffee className="size-[clamp(1.85rem,9vw,2.25rem)] text-[var(--brand-primary)]" />
      </span>
      <p className="mt-3 text-xs font-semibold text-[var(--text-muted)]">{roasterPickMeta.title}</p>
      <h3 className="mt-1 max-w-[calc(100%_-_5rem)] break-keep font-heading text-[clamp(1.25rem,5.5vw,1.4rem)] font-semibold tracking-[-0.04em] text-[var(--brand-primary)]">
        {product.name}
      </h3>
      <p className="mt-1 max-w-[12rem] break-keep text-xs leading-5 text-[var(--text-muted)] max-[360px]:max-w-[10.5rem]">
        {product.notes.join(" · ")}
      </p>
      <Link
        className="mt-3 inline-flex items-center rounded-full bg-[var(--brand-primary)] px-3 py-1.5 text-xs font-semibold text-[var(--text-inverse)]"
        to={`${ROUTES.products}/${product.id}`}
      >
        자세히 보기
        <ArrowRight className="ml-1 size-3.5" />
      </Link>
    </AppCard>
  );
}
