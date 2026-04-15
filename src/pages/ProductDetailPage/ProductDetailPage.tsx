import { ChevronLeft, Heart, Minus, Plus, ShoppingCart, ShoppingBag, Star } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useAppStore, useCartStore } from "@/app/store";
import { BottomSheet } from "@/components/common/BottomSheet";
import { InfoListRow } from "@/components/common/InfoListRow";
import { OptionRow } from "@/components/common/OptionRow";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { mockProducts } from "@/mock/products";
import { mockReviews } from "@/mock/reviews";
import { ROUTES } from "@/shared/constants/routes";
import { formatPrice } from "@/shared/utils/format";

export function ProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { isBottomSheetOpen, openBottomSheet, closeBottomSheet } = useAppStore();
  const addItem = useCartStore((state) => state.addItem);
  const itemCount = useCartStore((state) =>
    state.items.reduce((count, item) => count + item.quantity, 0),
  );

  const product = useMemo(
    () => mockProducts.find((item) => item.id === productId) ?? mockProducts[0],
    [productId],
  );
  const [selectedOptionId, setSelectedOptionId] = useState(product.options[0]?.id ?? "");
  const [quantity, setQuantity] = useState(1);

  const heroName = `DICHA × ${product.name}`;
  const selectedOption =
    product.options.find((option) => option.id === selectedOptionId) ?? product.options[0];
  const totalPrice = product.price + (selectedOption?.extraPrice ?? 0);

  function handleAddToCart() {
    addItem({
      productId: product.id,
      productName: `${product.name}${selectedOption ? ` / ${selectedOption.name}` : ""}`,
      quantity,
      price: totalPrice,
    });
    closeBottomSheet();
  }

  function handlePurchase() {
    handleAddToCart();
    navigate(ROUTES.orders);
  }

  return (
    <div className="min-h-screen bg-white pb-32">
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-[rgba(17,24,39,0.06)] bg-[rgba(255,255,255,0.96)] px-4 backdrop-blur-md">
        <button
          aria-label="뒤로가기"
          className="flex size-8 items-center justify-center rounded-full text-[var(--color-primary-green)]"
          onClick={() => navigate(-1)}
          type="button"
        >
          <ChevronLeft className="size-5" />
        </button>
        <div className="relative text-[var(--color-primary-green)]">
          <ShoppingCart className="size-5" />
          <span className="absolute -right-1.5 -top-1.5 flex size-4 items-center justify-center rounded-full bg-[var(--color-accent-gold)] text-[9px] font-semibold text-white">
            {itemCount}
          </span>
        </div>
      </header>

      <section className="relative flex min-h-[24.375rem] flex-col items-center justify-center overflow-hidden bg-[linear-gradient(180deg,#f6f3ec_0%,#ece5d7_100%)] px-6 text-center">
        <img
          alt={product.name}
          className="absolute inset-0 h-full w-full object-cover opacity-[0.14]"
          src={product.image}
        />
        <div className="absolute bottom-3 flex gap-2">
          <span className="size-1.5 rounded-full bg-[var(--color-primary-green)]/40" />
          <span className="size-1.5 rounded-full bg-[var(--color-primary-green)]/22" />
          <span className="size-1.5 rounded-full bg-[var(--color-primary-green)]/22" />
          <span className="size-1.5 rounded-full bg-[var(--color-primary-green)]/22" />
        </div>
        <div className="relative flex size-28 items-center justify-center rounded-full bg-[rgba(255,255,255,0.7)] shadow-[0_18px_36px_rgba(31,37,31,0.08)]">
          <span className="text-[5rem]">☕</span>
        </div>
        <p className="relative mt-5 text-sm font-medium text-[var(--color-primary-green)]">{heroName}</p>
      </section>

      <div className="space-y-4 px-4 pb-8 pt-4">
        <section className="space-y-3 rounded-[1.6rem] bg-white">
          <div className="flex flex-wrap gap-2">
            {product.originLabel ? (
              <span className="rounded-full bg-[rgba(29,62,43,0.06)] px-3 py-1 text-[11px] font-medium text-[var(--color-primary-green)]">
                {product.originLabel}
              </span>
            ) : null}
            {product.roastLabel ? (
              <span className="rounded-full bg-[rgba(29,62,43,0.06)] px-3 py-1 text-[11px] font-medium text-[var(--color-primary-green)]">
                {product.roastLabel}
              </span>
            ) : null}
            {product.categoryLabel ? (
              <span className="rounded-full bg-[rgba(29,62,43,0.06)] px-3 py-1 text-[11px] font-medium text-[var(--color-primary-green)]">
                {product.categoryLabel}
              </span>
            ) : null}
          </div>

          <div>
            <h1 className="font-heading text-[1.65rem] font-semibold tracking-[-0.04em] text-[var(--color-primary-green)]">
              {product.name}
            </h1>
            <p className="mt-1 text-sm leading-6 text-[var(--color-muted)]">{product.subtitle}</p>
          </div>

          <div className="flex items-end gap-2">
            <p className="font-heading text-[2rem] font-semibold tracking-[-0.04em] text-[var(--color-primary-green)]">
              ₩{formatPrice(product.price)}
            </p>
            <p className="pb-1 text-xs text-[var(--color-muted)]">200g 기준</p>
          </div>

          <div className="flex items-center gap-1 text-sm text-[var(--color-muted)]">
            <Star className="size-4 fill-[var(--color-accent-gold)] text-[var(--color-accent-gold)]" />
            <span className="font-semibold text-[var(--color-primary-green)]">
              {product.rating?.toFixed(1) ?? "4.8"}
            </span>
            <span>리뷰 {product.reviewCount ?? mockReviews.length}</span>
          </div>
        </section>

        <section className="rounded-[1.4rem] bg-[linear-gradient(135deg,#f7f3ea_0%,#efe6d8_100%)] px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold tracking-[0.08em] text-[var(--color-muted)]">
                TASTING NOTE
              </p>
              <h2 className="mt-1 font-heading text-lg font-semibold text-[var(--color-primary-green)]">
                {product.notes.join(" · ")}
              </h2>
            </div>
            <Heart className="size-5 text-[var(--color-primary-red)]" />
          </div>
          <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">{product.description}</p>
        </section>

        <section className="rounded-[1.4rem] border border-[rgba(17,24,39,0.06)] bg-white px-4 py-4 shadow-[0_12px_24px_rgba(31,37,31,0.05)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold tracking-[0.08em] text-[var(--color-muted)]">
                SELECTED OPTION
              </p>
              <h2 className="mt-1 font-heading text-lg font-semibold text-[var(--color-primary-green)]">
                {selectedOption?.name ?? "옵션을 선택해 주세요"}
              </h2>
            </div>
            <button
              className="rounded-full bg-[rgba(29,62,43,0.06)] px-3 py-1.5 text-sm font-medium text-[var(--color-primary-green)]"
              onClick={openBottomSheet}
              type="button"
            >
              변경
            </button>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-[1rem] bg-[rgba(29,62,43,0.04)] px-4 py-3">
              <p className="text-[11px] text-[var(--color-muted)]">수량</p>
              <p className="mt-1 text-sm font-semibold text-[var(--color-primary-green)]">{quantity}개</p>
            </div>
            <div className="rounded-[1rem] bg-[rgba(29,62,43,0.04)] px-4 py-3">
              <p className="text-[11px] text-[var(--color-muted)]">예상 결제금액</p>
              <p className="mt-1 text-sm font-semibold text-[var(--color-primary-green)]">
                ₩{formatPrice(totalPrice * quantity)}
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-[1.4rem] border border-[rgba(17,24,39,0.06)] bg-white px-4 py-2 shadow-[0_12px_24px_rgba(31,37,31,0.05)]">
          <h2 className="py-3 font-heading text-lg font-semibold text-[var(--color-primary-green)]">
            상품 정보
          </h2>
          <InfoListRow label="로스팅" value={product.roastLabel ?? product.roastLevel} />
          <InfoListRow label="테이스팅 노트" value={product.notes.join(", ")} />
          <InfoListRow label="배송" value="오늘 주문 시 내일 출고" />
          <InfoListRow label="분류" value={product.categoryLabel ?? product.category} />
        </section>

        <section className="rounded-[1.4rem] bg-[rgba(29,62,43,0.04)] px-4 py-4">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-lg font-semibold text-[var(--color-primary-green)]">
              함께 보면 좋은 리뷰
            </h2>
            <Link className="text-sm font-medium text-[var(--color-primary-green)]" to="/products">
              더 보기
            </Link>
          </div>
          <div className="mt-3 space-y-3">
            {mockReviews.map((review) => (
              <article key={review.id} className="rounded-[1rem] bg-white px-4 py-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-[var(--color-primary-green)]">
                    {review.author}
                  </p>
                  <p className="text-xs text-[var(--color-accent-gold)]">
                    {"★".repeat(review.rating)}
                    {"☆".repeat(5 - review.rating)}
                  </p>
                </div>
                <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">{review.content}</p>
              </article>
            ))}
          </div>
        </section>
      </div>

      <div className="fixed bottom-0 left-1/2 z-30 w-full max-w-md -translate-x-1/2 border-t border-[rgba(17,24,39,0.06)] bg-[rgba(255,255,255,0.97)] px-4 py-3 backdrop-blur-md">
        <div className="mb-3 flex items-center justify-between rounded-[1rem] bg-[rgba(29,62,43,0.04)] px-4 py-3">
          <div>
            <p className="text-[11px] text-[var(--color-muted)]">선택 옵션</p>
            <p className="mt-1 text-sm font-semibold text-[var(--color-primary-green)]">
              {selectedOption?.name ?? "옵션을 선택해 주세요"}
            </p>
          </div>
          <button
            className="text-sm font-medium text-[var(--color-primary-green)]"
            onClick={openBottomSheet}
            type="button"
          >
            변경
          </button>
        </div>

        <div className="flex gap-3">
          <PrimaryButton
            className="flex-1 bg-white text-[var(--color-primary-green)]"
            onClick={handleAddToCart}
            variant="outline"
          >
            <ShoppingCart className="size-4" />
            장바구니
          </PrimaryButton>
          <PrimaryButton className="flex-1" onClick={handlePurchase}>
            <ShoppingBag className="size-4" />
            구매하기
          </PrimaryButton>
        </div>
      </div>

      <BottomSheet onClose={closeBottomSheet} open={isBottomSheetOpen} title="옵션 선택">
        <div className="space-y-4">
          <section className="rounded-[1.2rem] bg-[linear-gradient(135deg,#f7f1e4_0%,#ecdfc4_100%)] px-4 py-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold tracking-[0.08em] text-[var(--color-muted)]">
                  DICHA SELECT
                </p>
                <h4 className="mt-1 font-heading text-lg font-semibold text-[var(--color-primary-green)]">
                  {product.name}
                </h4>
                <p className="mt-1 text-sm text-[var(--color-muted)]">원하는 분쇄 방식과 수량을 선택해 주세요.</p>
              </div>
              <div className="rounded-full bg-white/80 px-3 py-1.5 text-sm font-semibold text-[var(--color-primary-green)]">
                200g
              </div>
            </div>
          </section>

          <section>
            <div className="mb-3 flex items-center justify-between">
              <h4 className="font-heading text-base font-semibold text-[var(--color-primary-green)]">
                분쇄 방식
              </h4>
              <span className="text-xs text-[var(--color-muted)]">필수 선택</span>
            </div>
            <div className="space-y-3">
          {product.options.map((option) => (
            <OptionRow
              key={option.id}
              description={option.description}
              label={option.name}
              onClick={() => setSelectedOptionId(option.id)}
              price={option.extraPrice ? `+${formatPrice(option.extraPrice)}원` : "기본"}
              selected={selectedOptionId === option.id}
            />
          ))}
            </div>
          </section>

          <section className="rounded-[1.2rem] bg-[rgba(29,62,43,0.04)] px-4 py-4">
            <div className="flex items-center justify-between">
              <h4 className="font-heading text-base font-semibold text-[var(--color-primary-green)]">
                수량 선택
              </h4>
              <div className="flex items-center gap-3">
                <button
                  className="flex size-8 items-center justify-center rounded-full border border-[rgba(17,24,39,0.08)] bg-white text-[var(--color-primary-green)]"
                  onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                  type="button"
                >
                  <Minus className="size-4" />
                </button>
                <span className="min-w-5 text-center text-sm font-semibold text-[var(--color-primary-green)]">
                  {quantity}
                </span>
                <button
                  className="flex size-8 items-center justify-center rounded-full border border-[rgba(17,24,39,0.08)] bg-white text-[var(--color-primary-green)]"
                  onClick={() => setQuantity((current) => current + 1)}
                  type="button"
                >
                  <Plus className="size-4" />
                </button>
              </div>
            </div>
          </section>

          <section className="rounded-[1.2rem] border border-[rgba(17,24,39,0.06)] bg-white px-4 py-4 shadow-[0_12px_24px_rgba(31,37,31,0.04)]">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[var(--color-muted)]">선택 옵션</span>
              <span className="font-medium text-[var(--color-primary-green)]">
                {selectedOption?.name}
              </span>
            </div>
            <div className="mt-3 flex items-center justify-between text-sm">
              <span className="text-[var(--color-muted)]">총 수량</span>
              <span className="font-medium text-[var(--color-primary-green)]">{quantity}개</span>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-[var(--color-muted)]">총 결제금액</span>
              <span className="font-heading text-xl font-semibold text-[var(--color-primary-green)]">
                ₩{formatPrice(totalPrice * quantity)}
              </span>
            </div>
          </section>

          <div className="grid grid-cols-2 gap-3">
            <PrimaryButton
              className="w-full bg-white text-[var(--color-primary-green)]"
              onClick={handleAddToCart}
              variant="outline"
            >
              장바구니
            </PrimaryButton>
            <PrimaryButton className="w-full" onClick={handlePurchase}>
              구매하기
            </PrimaryButton>
          </div>
        </div>
      </BottomSheet>
    </div>
  );
}
