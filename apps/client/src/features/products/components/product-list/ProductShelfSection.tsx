import { AppCard } from "@/components/common/AppCard";
import { ProductTileCard } from "@/components/common/ProductTileCard";
import type { Product } from "@/shared/types/models";

interface ProductShelfSectionProps {
  eyebrow: string;
  title: string;
  description: string;
  products: Product[];
  tone: "chalkboard" | "wood";
}

export function ProductShelfSection({
  eyebrow,
  title,
  description,
  products,
  tone,
}: ProductShelfSectionProps) {
  if (!products.length) {
    return null;
  }

  const isChalkboard = tone === "chalkboard";

  return (
    <AppCard
      className={[
        isChalkboard
          ? "rounded-none border-x-0 px-[var(--page-x)] py-6"
          : "mx-[var(--page-x)] rounded-[0.45rem] px-4 py-5",
      ].join(" ")}
      padding="none"
      variant={tone}
    >
      <p
        className={[
          "text-[0.64rem] font-semibold uppercase tracking-[0.3em]",
          isChalkboard
            ? "text-[var(--text-chalk-muted)]"
            : "text-[var(--text-wood-muted)]",
        ].join(" ")}
      >
        {eyebrow}
      </p>
      <h2
        className={[
          "mt-1 font-heading text-[1.35rem] font-semibold",
          isChalkboard
            ? "text-[var(--text-chalk)]"
            : "text-[var(--text-inverse)]",
        ].join(" ")}
      >
        {title}
      </h2>
      <p
        className={[
          "mt-1 text-xs leading-5",
          isChalkboard
            ? "text-[var(--text-chalk-muted)]"
            : "text-[var(--text-wood-muted)]",
        ].join(" ")}
      >
        {description}
      </p>

      <div
        className={[
          "mobile-horizontal-scroll mt-4 pb-1",
          isChalkboard
            ? "-mx-[var(--page-x)] px-[var(--page-x)]"
            : "-mx-4 px-4",
        ].join(" ")}
      >
        <div className="flex w-max gap-3">
          {products.map((product) => (
            <ProductTileCard
              key={product.id}
              appearance={isChalkboard ? "chalkboard" : "default"}
              className="w-[var(--mobile-card-width)] shrink-0 snap-start"
              compact
              product={product}
              showAddButton={false}
            />
          ))}
        </div>
      </div>
    </AppCard>
  );
}
