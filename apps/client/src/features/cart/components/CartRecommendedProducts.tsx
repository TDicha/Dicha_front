import { Link } from "react-router-dom";

import { useProducts } from "@/features/products";
import { formatPrice } from "@/shared/utils/format";
import { productDetailPath } from "@/shared/utils/productRoutes";

export function CartRecommendedProducts() {
  const { data: products = [] } = useProducts();
  const recommendedProducts = products.slice(0, 2);

  if (!recommendedProducts.length) {
    return null;
  }

  return (
    <section className="mt-2 bg-[var(--surface-menu-board)] px-[var(--page-x)] py-6">
      <p className="text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-[var(--text-muted)]">
        Recommended
      </p>
      <h3 className="mt-1 text-xl font-bold text-[var(--text-cafe-ink)]">
        지금 인기 있는 원두
      </h3>
      <div className="mt-5 grid grid-cols-2 gap-3 min-[380px]:gap-4">
        {recommendedProducts.map((product) => (
          <Link
            key={product.id}
            className="min-w-0 overflow-hidden bg-[var(--surface-cafe-tile)] pb-5"
            to={productDetailPath(product)}
          >
            <div className="flex h-[clamp(9rem,42vw,11rem)] items-center justify-center">
              <img alt={product.name} className="size-[clamp(5rem,22vw,6rem)] object-cover" src={product.image} />
            </div>
            <div className="px-3 min-[380px]:px-4">
              <p className="min-h-12 break-keep text-sm font-semibold leading-5 text-[var(--text-product-title)]">
                {product.name}
              </p>
              <p className="mt-2 text-[1rem] font-bold text-[var(--text-cafe-ink)]">
                ₩{formatPrice(product.price)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
