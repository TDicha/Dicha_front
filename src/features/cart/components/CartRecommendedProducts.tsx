import { Link } from "react-router-dom";

import { mockProducts } from "@/mock/products";
import { formatPrice } from "@/shared/utils/format";

const recommendedProducts = mockProducts.slice(0, 2);

export function CartRecommendedProducts() {
  return (
    <section className="border-t border-[var(--palette-ece7df)] px-6 pt-6">
      <h3 className="text-[1.75rem] font-bold tracking-[-0.04em] text-[var(--palette-171717)]">
        지금 인기 있는 원두
      </h3>
      <div className="mt-5 grid grid-cols-2 gap-4">
        {recommendedProducts.map((product) => (
          <Link
            key={product.id}
            className="overflow-hidden rounded-[1.55rem] bg-[var(--palette-f4f1eb)] pb-5"
            to={`/products/${product.id}`}
          >
            <div className="flex h-44 items-center justify-center">
              <img alt={product.name} className="h-24 w-24 rounded-full object-cover" src={product.image} />
            </div>
            <div className="px-4">
              <p className="min-h-14 text-[1.1rem] font-semibold leading-7 tracking-[-0.03em] text-[var(--palette-191919)]">
                {product.name}
              </p>
              <p className="mt-2 text-[1rem] font-bold text-[var(--palette-992b22)]">
                ₩{formatPrice(product.price)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
