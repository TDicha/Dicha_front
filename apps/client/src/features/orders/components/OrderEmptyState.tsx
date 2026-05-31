import { Link } from "react-router-dom";

import { EmptyState } from "@/components/common/EmptyState";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { useProducts } from "@/features/products";
import { ROUTES } from "@/shared/constants/routes";
import { formatPrice } from "@/shared/utils/format";

export function OrderEmptyState() {
  const { data: products = [] } = useProducts();
  const recommendedProducts = products.slice(0, 3);

  return (
    <section className="space-y-4 px-1 pt-8">
      <EmptyState
        action={
          <PrimaryButton
            asChild
            className="h-12 w-full rounded-none text-base shadow-none"
          >
            <Link to={ROUTES.products}>쇼핑하러 가기</Link>
          </PrimaryButton>
        }
        description="아직 주문하신 상품이 없어요. 지금 디차 원두를 만나보세요."
        eyebrow="Orders"
        title="주문 내역이 없습니다"
      />

      {recommendedProducts.length ? (
        <div className="rounded-[var(--radius-card)] bg-[var(--surface-base)] px-4 py-5 text-left">
          <h3 className="text-xl font-bold text-[var(--text-heading)]">
            이런 원두 어떠세요?
          </h3>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {recommendedProducts.map((product) => (
              <Link
                key={product.id}
                className="overflow-hidden rounded-[1.1rem] bg-[var(--surface-card-muted)] pb-3 shadow-[0_6px_16px_var(--shadow-neutral-alpha-4)]"
                to={`/products/${product.id}`}
              >
                <div className="flex h-16 items-center justify-center">
                  <img
                    alt={product.name}
                    className="h-10 w-10 rounded-full object-cover"
                    src={product.image}
                  />
                </div>
                <div className="px-2">
                  <p className="min-h-10 text-[0.82rem] leading-4 text-[var(--text-neutral-900)]">
                    {product.name}
                  </p>
                  <p className="mt-1 text-[0.85rem] text-[var(--text-danger-dark)]">
                    ₩{formatPrice(product.price)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
