import { CheckCircle2, ChevronRight, CreditCard, MapPin } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useCartStore } from "@/app/store";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { buildCartItemOptionLabel } from "@/features/cart/cartItemDisplay";
import {
  calculateCartPricing,
  type CartPricingSummary,
} from "@/features/cart/cartPricing";
import { mockProducts } from "@/mock/products";
import { ROUTES } from "@/shared/constants/routes";
import { formatPrice } from "@/shared/utils/format";

const paymentOptions = [
  {
    id: "dicha-card",
    label: "DICHA Card ending 2048",
    description: "기본 결제 수단",
  },
  { id: "kakao-pay", label: "카카오페이", description: "간편 결제" },
  { id: "credit-card", label: "신용카드", description: "롯데카드 / 우리카드" },
] as const;

export function PurchasePage() {
  const navigate = useNavigate();
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const [step, setStep] = useState<"checkout" | "complete">("checkout");
  const [completedPricing, setCompletedPricing] =
    useState<CartPricingSummary | null>(null);
  const [selectedPaymentId, setSelectedPaymentId] =
    useState<(typeof paymentOptions)[number]["id"]>("dicha-card");

  const { subtotal, couponDiscount, shippingFee, total } = useMemo(
    () => calculateCartPricing(items),
    [items],
  );
  const selectedPayment = paymentOptions.find(
    (option) => option.id === selectedPaymentId,
  );

  function handlePlaceOrder() {
    setCompletedPricing({ subtotal, couponDiscount, shippingFee, total });
    clearCart();
    setStep("complete");
  }

  if (!items.length && step === "checkout") {
    return (
      <div className="bg-white px-6 py-12">
        <div className="rounded-[1.6rem] border border-[var(--palette-ebe6dd)] bg-[var(--palette-faf8f4)] px-6 py-8 text-center">
          <h2 className="text-[1.7rem] font-bold tracking-[-0.04em] text-[var(--palette-171717)]">
            구매할 상품이 없습니다
          </h2>
          <p className="mt-3 text-[1rem] text-[var(--palette-6d6a64)]">
            장바구니에서 상품을 먼저 선택해주세요.
          </p>
          <PrimaryButton
            asChild
            className="mt-8 h-14 w-full rounded-[1.15rem] shadow-none"
          >
            <Link to={ROUTES.cart}>장바구니로 이동</Link>
          </PrimaryButton>
        </div>
      </div>
    );
  }

  if (step === "complete") {
    return (
      <div className="bg-[var(--palette-f7f5f1)] px-6 pb-10 pt-8">
        <section className="rounded-[1.9rem] bg-white px-6 py-10 text-center">
          <div className="mx-auto flex size-24 items-center justify-center rounded-full bg-[var(--palette-edf3ec)]">
            <CheckCircle2 className="size-12 text-[var(--second-color)]" />
          </div>
          <h1 className="mt-7 text-[2rem] font-bold tracking-[-0.04em] text-[var(--palette-171717)]">
            결제가 완료되었어요
          </h1>
          <p className="mt-3 text-[1.05rem] leading-7 text-[var(--palette-666666)]">
            주문이 정상적으로 접수되었습니다.
            <br />
            주문 조회에서 준비 상태를 바로 확인할 수 있어요.
          </p>
        </section>

        <section className="mt-5 rounded-[1.6rem] bg-white px-5 py-6">
          <div className="flex items-center justify-between border-b border-[var(--palette-ebe6dd)] pb-4">
            <span className="text-[1rem] text-[var(--palette-6d6a64)]">
              총 결제 금액
            </span>
            <span className="text-[1.55rem] font-bold text-[var(--palette-992b22)]">
              ₩{formatPrice(completedPricing?.total ?? total)}
            </span>
          </div>
          <div className="pt-4 text-[1rem] text-[var(--palette-555555)]">
            <p>결제 수단: {selectedPayment?.label}</p>
            <p className="mt-2">
              배송지: 서울 성동구 연무장길 00, DICHA Studio 302호
            </p>
          </div>
        </section>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <PrimaryButton
            asChild
            className="h-14 rounded-[1.15rem] bg-white text-[var(--second-color)] shadow-none"
            variant="outline"
          >
            <Link to={ROUTES.home}>홈으로</Link>
          </PrimaryButton>
          <PrimaryButton
            className="h-14 rounded-[1.15rem] shadow-none"
            onClick={() => navigate(ROUTES.orders)}
          >
            주문 조회
          </PrimaryButton>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[var(--palette-f7f5f1)] pb-40">
      <section className="border-b border-[var(--palette-e8e3da)] bg-white px-6 py-6">
        <h1 className="text-[1.85rem] font-bold tracking-[-0.04em] text-[var(--palette-171717)]">
          주문 상세
        </h1>
        <p className="mt-2 text-[1rem] text-[var(--palette-6d6a64)]">
          배송 정보와 결제 수단을 확인하고 결제를 진행하세요
        </p>
      </section>

      <section className="mt-4 bg-white px-6 py-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="mt-1 flex size-10 items-center justify-center rounded-full bg-[var(--palette-edf3ec)]">
              <MapPin className="size-5 text-[var(--second-color)]" />
            </div>
            <div>
              <h2 className="text-[1.2rem] font-bold text-[var(--palette-171717)]">
                배송지
              </h2>
              <p className="mt-2 text-[1rem] font-medium text-[var(--palette-171717)]">
                우석 / 010-0000-0000
              </p>
              <p className="mt-1 text-[0.98rem] leading-7 text-[var(--palette-666666)]">
                서울 성동구 연무장길 00, DICHA Studio 302호
              </p>
            </div>
          </div>
          <button className="text-[var(--palette-6f6b63)]" type="button">
            <ChevronRight className="size-5" />
          </button>
        </div>
      </section>

      <section className="mt-4 bg-white px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-[var(--palette-edf3ec)]">
            <CreditCard className="size-5 text-[var(--second-color)]" />
          </div>
          <h2 className="text-[1.2rem] font-bold text-[var(--palette-171717)]">
            결제 수단 선택
          </h2>
        </div>

        <div className="mt-5 space-y-3">
          {paymentOptions.map((option) => {
            const isSelected = option.id === selectedPaymentId;

            return (
              <button
                key={option.id}
                className={[
                  "flex w-full items-center justify-between rounded-[1.25rem] border px-4 py-4 text-left transition",
                  isSelected
                    ? "border-[var(--second-color)] bg-[var(--palette-f7faf6)]"
                    : "border-[var(--palette-e5dfd5)] bg-white",
                ].join(" ")}
                onClick={() => setSelectedPaymentId(option.id)}
                type="button"
              >
                <div>
                  <p className="text-[1rem] font-semibold text-[var(--palette-171717)]">
                    {option.label}
                  </p>
                  <p className="mt-1 text-[0.92rem] text-[var(--palette-6d6a64)]">
                    {option.description}
                  </p>
                </div>
                <span
                  className={[
                    "flex size-6 items-center justify-center rounded-full border",
                    isSelected
                      ? "border-[var(--second-color)] bg-[var(--second-color)]"
                      : "border-[var(--palette-cdc5b8)] bg-white",
                  ].join(" ")}
                >
                  {isSelected ? (
                    <span className="size-2 rounded-full bg-white" />
                  ) : null}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="mt-4 bg-white px-6 py-6">
        <h2 className="text-[1.2rem] font-bold text-[var(--palette-171717)]">
          주문 상품
        </h2>
        <div className="mt-5 space-y-4">
          {items.map((item, index) => {
            const product = mockProducts.find(
              (candidate) => candidate.id === item.productId,
            );

            return (
              <div
                key={item.productId}
                className={
                  index < items.length - 1
                    ? "border-b border-[var(--palette-ebe6dd)] pb-4"
                    : ""
                }
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[1.05rem] font-semibold text-[var(--palette-171717)]">
                      {item.productName}
                    </p>
                    <p className="mt-1 text-[0.95rem] text-[var(--palette-6d6a64)]">
                      {buildCartItemOptionLabel(item, product)}
                    </p>
                    <p className="mt-1 text-[0.95rem] text-[var(--palette-6d6a64)]">
                      수량 {item.quantity}개
                    </p>
                  </div>
                  <span className="text-[1rem] font-semibold text-[var(--palette-171717)]">
                    ₩{formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-4 bg-white px-6 py-7">
        <h2 className="text-[1.2rem] font-bold text-[var(--palette-171717)]">
          결제 금액
        </h2>
        <div className="mt-6 space-y-5 text-[1rem]">
          <div className="flex items-center justify-between">
            <span className="text-[var(--palette-666666)]">상품 금액</span>
            <span className="font-semibold text-[var(--palette-171717)]">
              ₩{formatPrice(subtotal)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[var(--palette-666666)]">쿠폰 할인</span>
            <span className="font-bold text-[var(--palette-992b22)]">
              -₩{formatPrice(couponDiscount)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[var(--palette-666666)]">배송비</span>
            <span className="font-semibold text-[var(--second-color)]">
              {shippingFee ? `₩${formatPrice(shippingFee)}` : "무료"}
            </span>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-[var(--palette-1b1b1b)] pt-5">
          <span className="text-[1.5rem] font-bold text-[var(--palette-171717)]">
            총 결제 금액
          </span>
          <span className="text-[1.95rem] font-bold text-[var(--palette-992b22)]">
            ₩{formatPrice(total)}
          </span>
        </div>
      </section>

      <div className="fixed bottom-0 left-1/2 z-20 flex w-full max-w-md -translate-x-1/2 items-center gap-4 border-t border-[var(--palette-e7e2d9)] bg-white px-5 pb-[calc(env(safe-area-inset-bottom)+1rem)] pt-4">
        <div className="min-w-0 flex-1">
          <p className="text-[0.95rem] text-[var(--palette-6c6861)]">
            {selectedPayment?.label}
          </p>
          <p className="mt-1 text-[2rem] font-bold tracking-[-0.04em] text-[var(--palette-992b22)]">
            ₩{formatPrice(total)}
          </p>
        </div>
        <PrimaryButton
          className="h-16 min-w-[18rem] rounded-[1.35rem] px-6 text-[1.05rem] shadow-none"
          onClick={handlePlaceOrder}
        >
          결제하기
        </PrimaryButton>
      </div>
    </div>
  );
}
