import { Minus, Plus, ShoppingCart, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { useCartStore } from "@/app/store";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { mockProducts } from "@/mock/products";
import { ROUTES } from "@/shared/constants/routes";
import { formatPrice } from "@/shared/utils/format";

function buildOptionLabel(productId: string) {
  switch (productId) {
    case "ethiopia-yirgacheffe":
      return "미디엄 / 핸드드립 / 200g";
    case "kenya-kiambu-aa":
      return "라이트 / 홀빈 / 500g";
    default:
      return "핸드드립용 / 기본";
  }
}

export function CartPage() {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const [selectedIdState, setSelectedIdState] = useState<string[] | null>(null);

  const recommendedProducts = mockProducts.slice(0, 2);
  const availableIds = useMemo(() => items.map((item) => item.productId), [items]);
  const selectedIds = useMemo(() => {
    if (selectedIdState === null) {
      return availableIds;
    }

    return selectedIdState.filter((id) => availableIds.includes(id));
  }, [availableIds, selectedIdState]);
  const selectedItems = items.filter((item) => selectedIds.includes(item.productId));
  const subtotal = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const couponDiscount = selectedItems.length ? 5000 : 0;
  const shippingFee = selectedItems.length ? 0 : 0;
  const total = Math.max(subtotal - couponDiscount + shippingFee, 0);
  const isAllSelected = items.length > 0 && selectedIds.length === items.length;

  function handleToggleAll() {
    if (isAllSelected) {
      setSelectedIdState([]);
      return;
    }

    setSelectedIdState(availableIds);
  }

  function handleToggleItem(productId: string) {
    setSelectedIdState((current) => {
      const base = current === null ? availableIds : current.filter((id) => availableIds.includes(id));
      return base.includes(productId)
        ? base.filter((id) => id !== productId)
        : [...base, productId];
    });
  }

  if (!items.length) {
    return (
      <div className="bg-white pb-10">
        <section className="px-6 pb-14 pt-12 text-center">
          <div className="mx-auto flex size-36 items-center justify-center rounded-full bg-[#f2efea] text-[3.7rem]">
            <ShoppingCart className="size-16 stroke-[1.4] text-[#8f8a81]" />
          </div>
          <h2 className="mt-8 text-[2rem] font-bold tracking-[-0.04em] text-[#666666]">
            장바구니가 비어있어요
          </h2>
          <p className="mt-3 text-[1.05rem] text-[#777777]">마음에 드는 원두를 담아보세요</p>

          <PrimaryButton asChild className="mt-10 h-16 w-full rounded-[1.35rem] text-xl shadow-none">
            <Link to={ROUTES.products}>지금 쇼핑하러 가기</Link>
          </PrimaryButton>
        </section>

        <section className="border-t border-[#ece7df] px-6 pt-6">
          <h3 className="text-[1.75rem] font-bold tracking-[-0.04em] text-[#171717]">지금 인기 있는 원두</h3>
          <div className="mt-5 grid grid-cols-2 gap-4">
            {recommendedProducts.map((product) => (
              <Link
                key={product.id}
                className="overflow-hidden rounded-[1.55rem] bg-[#f4f1eb] pb-5"
                to={`/products/${product.id}`}
              >
                <div className="flex h-44 items-center justify-center">
                  <img
                    alt={product.name}
                    className="h-24 w-24 rounded-full object-cover"
                    src={product.image}
                  />
                </div>
                <div className="px-4">
                  <p className="min-h-14 text-[1.1rem] font-semibold leading-7 tracking-[-0.03em] text-[#191919]">
                    {product.name}
                  </p>
                  <p className="mt-2 text-[1rem] font-bold text-[#992b22]">
                    ₩{formatPrice(product.price)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-[#f7f5f1] pb-44">
      <section className="border-b border-[#e8e3da] bg-white px-6 py-5">
        <button
          className="flex w-full items-center justify-between"
          onClick={handleToggleAll}
          type="button"
        >
          <span className="flex items-center gap-4">
            <span
              className={[
                "flex size-9 items-center justify-center rounded-[0.8rem] border",
                isAllSelected
                  ? "border-[#204a32] bg-[#204a32]"
                  : "border-[#d7d0c5] bg-white",
              ].join(" ")}
            />
            <span className="text-[1.15rem] font-semibold tracking-[-0.03em] text-[#171717]">
              전체선택
            </span>
          </span>
          <span className="text-[1.05rem] text-[#6f6b63]">{selectedIds.length}개 선택됨</span>
        </button>
      </section>

      <section className="bg-white">
        {items.map((item, index) => {
          const product = mockProducts.find((candidate) => candidate.id === item.productId);
          const isSelected = selectedIds.includes(item.productId);
          const lineTotal = item.price * item.quantity;

          return (
            <article
              key={item.productId}
              className={[
                "flex gap-4 px-6 py-8",
                index < items.length - 1 ? "border-b border-[#ebe6dd]" : "",
              ].join(" ")}
            >
              <button
                aria-label={`${item.productName} 선택`}
                className="mt-16"
                onClick={() => handleToggleItem(item.productId)}
                type="button"
              >
                <span
                  className={[
                    "flex size-9 items-center justify-center rounded-[0.8rem] border",
                    isSelected
                      ? "border-[#204a32] bg-[#204a32]"
                      : "border-[#d7d0c5] bg-white",
                  ].join(" ")}
                />
              </button>

              <div className="flex h-[8.5rem] w-[8.5rem] shrink-0 items-center justify-center rounded-[1.5rem] bg-[#dde6d4]">
                {product ? (
                  <img
                    alt={item.productName}
                    className="h-24 w-24 rounded-full object-cover"
                    src={product.image}
                  />
                ) : (
                  <div className="text-4xl">☕</div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-[1.2rem] font-bold leading-8 tracking-[-0.03em] text-[#141414]">
                      {item.productName}
                    </h2>
                    <p className="mt-1 text-[1rem] text-[#6c6c6c]">
                      {buildOptionLabel(item.productId)}
                    </p>
                  </div>
                  <button
                    aria-label={`${item.productName} 삭제`}
                    className="text-[#7a746d]"
                    onClick={() => removeItem(item.productId)}
                    type="button"
                  >
                    <X className="size-7 stroke-[1.5]" />
                  </button>
                </div>

                <div className="mt-5 flex items-end justify-between gap-3">
                  <div>
                    <p className="text-[1.15rem] font-bold text-[#992b22]">
                      ₩{formatPrice(item.price)}
                    </p>
                    {item.quantity > 1 ? (
                      <p className="mt-1 text-[0.95rem] text-[#76706a]">
                        (x{item.quantity}) 합계 ₩{formatPrice(lineTotal)}
                      </p>
                    ) : null}
                  </div>

                  <div className="flex items-center rounded-full bg-[#f2efea] px-2 py-1">
                    <button
                      className="flex size-10 items-center justify-center text-[#55514a]"
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      type="button"
                    >
                      <Minus className="size-5" />
                    </button>
                    <span className="min-w-10 text-center text-[1.1rem] font-semibold text-[#151515]">
                      {item.quantity}
                    </span>
                    <button
                      className="flex size-10 items-center justify-center text-[#204a32]"
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      type="button"
                    >
                      <Plus className="size-5" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <section className="mt-5 border-y border-[#ebe6dd] bg-white px-6 py-8">
        <h3 className="text-[1.65rem] font-bold tracking-[-0.04em] text-[#171717]">결제 금액</h3>
        <div className="mt-7 space-y-6 text-[1.15rem]">
          <div className="flex items-center justify-between">
            <span className="text-[#666666]">상품 금액</span>
            <span className="font-semibold text-[#212121]">₩{formatPrice(subtotal)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#666666]">쿠폰 할인</span>
            <span className="font-bold text-[#992b22]">-₩{formatPrice(couponDiscount)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#666666]">배송비</span>
            <span className="font-semibold text-[#204a32]">무료</span>
          </div>
        </div>

        <div className="mt-7 flex items-center justify-between border-t border-[#1b1b1b] pt-5">
          <span className="text-[1.8rem] font-bold tracking-[-0.04em] text-[#171717]">총 결제 금액</span>
          <span className="text-[2.1rem] font-bold tracking-[-0.04em] text-[#992b22]">
            ₩{formatPrice(total)}
          </span>
        </div>
      </section>

      <div className="fixed bottom-0 left-1/2 z-20 flex w-full max-w-md -translate-x-1/2 items-center gap-4 border-t border-[#e7e2d9] bg-white px-5 pb-[calc(env(safe-area-inset-bottom)+1rem)] pt-4">
        <div className="min-w-0 flex-1">
          <p className="text-[0.95rem] text-[#6c6861]">선택 상품 {selectedItems.length}개</p>
          <p className="mt-1 text-[2rem] font-bold tracking-[-0.04em] text-[#992b22]">
            ₩{formatPrice(total)}
          </p>
        </div>
        <PrimaryButton
          asChild
          className="h-16 min-w-[18rem] rounded-[1.35rem] px-6 text-[1.05rem] shadow-none"
        >
          <Link to={ROUTES.purchase}>₩{formatPrice(total)} 결제하기</Link>
        </PrimaryButton>
      </div>
    </div>
  );
}
