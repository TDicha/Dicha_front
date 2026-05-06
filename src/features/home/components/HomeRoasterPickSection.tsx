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
      <span className="absolute right-4 top-4 flex size-[5.25rem] items-center justify-center rounded-full bg-[var(--rgba-193-162-97-024)]">
        <Coffee className="size-9 text-[var(--color-primary-green)]" />
      </span>
      <span className="inline-flex rounded-full bg-white/70 px-3 py-1 text-[10px] font-semibold tracking-[0.1em] text-[var(--color-primary-green)]">
        {roasterPickMeta.label}
      </span>
      <p className="mt-3 text-xs font-semibold text-[var(--color-muted)]">{roasterPickMeta.title}</p>
      <h3 className="mt-1 font-heading text-[1.4rem] font-semibold tracking-[-0.04em] text-[var(--color-primary-green)]">
        {product.name}
      </h3>
      <p className="mt-1 max-w-[12rem] text-xs leading-5 text-[var(--color-muted)]">
        {product.notes.join(" · ")}
      </p>
      <Link
        className="mt-3 inline-flex items-center rounded-full bg-[var(--color-primary-green)] px-3 py-1.5 text-xs font-semibold text-white"
        to={`${ROUTES.products}/${product.id}`}
      >
        자세히 보기
        <ArrowRight className="ml-1 size-3.5" />
      </Link>
    </AppCard>
  );
}
