import { Link } from "react-router-dom";

import { PrimaryButton } from "@/components/common/PrimaryButton";
import { mockProducts } from "@/mock/products";
import { ROUTES } from "@/shared/constants/routes";
import { formatPrice } from "@/shared/utils/format";

const recommendedProducts = [
  { productId: "ethiopia-yirgacheffe", price: 18000 },
  { productId: "colombia-huila", price: 16000 },
  { productId: "kenya-kiambu-aa", price: 20000 },
];

export function OrderEmptyState() {
  return (
    <section className="px-1 pt-8">
      <div className="rounded-[1.8rem] bg-white px-4 py-8 text-center">
        <div className="mx-auto flex size-[7.5rem] items-center justify-center rounded-full bg-[var(--palette-f3f2ef)] text-[3rem]">
          📦
        </div>
        <h2 className="mt-6 text-[2rem] font-bold tracking-[-0.04em] text-[var(--palette-171717)]">
          주문 내역이 없습니다
        </h2>
        <p className="mt-3 text-[1.1rem] leading-7 text-[var(--palette-666666)]">
          아직 주문하신 상품이 없어요.
          <br />
          지금 디차 원두를 만나보세요!
        </p>

        <PrimaryButton asChild className="mt-8 h-14 w-full rounded-[1.15rem] text-[1.05rem] shadow-none">
          <Link to={ROUTES.products}>쇼핑하러 가기</Link>
        </PrimaryButton>

        <div className="mt-8 text-left">
          <h3 className="text-[1.55rem] font-bold tracking-[-0.04em] text-[var(--palette-171717)]">
            이런 원두 어떠세요?
          </h3>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {recommendedProducts.map((recommended) => {
              const product = mockProducts.find((item) => item.id === recommended.productId);

              if (!product) {
                return null;
              }

              return (
                <Link
                  key={product.id}
                  className="overflow-hidden rounded-[1.1rem] bg-[var(--palette-faf8f4)] pb-3 shadow-[0_6px_16px_var(--rgba-34-34-34-004)]"
                  to={`/products/${product.id}`}
                >
                  <div className="flex h-16 items-center justify-center">
                    <img alt={product.name} className="h-10 w-10 rounded-full object-cover" src={product.image} />
                  </div>
                  <div className="px-2">
                    <p className="min-h-10 text-[0.82rem] leading-4 text-[var(--palette-262626)]">{product.name}</p>
                    <p className="mt-1 text-[0.85rem] text-[var(--palette-7b231d)]">
                      ₩{formatPrice(recommended.price)}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
