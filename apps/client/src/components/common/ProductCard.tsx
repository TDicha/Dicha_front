import { Link } from "react-router-dom";

import { Badge } from "@/components/common/Badge";
import { formatPrice } from "@/shared/utils/format";
import type { Product } from "@/shared/types/models";
import { productDetailPath } from "@/shared/utils/productRoutes";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      className="glass-card motion-clickable motion-card-hover motion-image-parent block overflow-hidden"
      to={productDetailPath(product)}
    >
      <img
        alt={product.name}
        className="motion-image h-44 w-full object-cover"
        src={product.image}
      />
      <div className="space-y-3 px-4 py-4">
        <div className="flex flex-wrap gap-1.5">
          {product.badges.map((badge) => (
            <Badge key={badge} label={badge} />
          ))}
        </div>
        <div>
          <h3 className="font-heading text-lg font-semibold text-[var(--brand-primary)]">
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-[var(--text-muted)]">{product.subtitle}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--brand-accent)]">
            {product.roastLevel} Roast
          </p>
          <p className="font-heading text-lg font-semibold text-[var(--brand-primary)]">
            {formatPrice(product.price)}원
          </p>
        </div>
      </div>
    </Link>
  );
}
