import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthStore, useCartStore, useCheckoutStore } from "@/app/store";
import {
  calculateCartPricing,
  type CartPricingSummary,
} from "@/features/cart/cartPricing";
import {
  PurchaseBottomActionBar,
  PurchaseCompleteView,
  PurchaseEmptyState,
  PurchaseHeaderSection,
  PurchaseItemsSection,
  PurchasePaymentMethodSection,
  PurchasePricingSection,
  PurchaseShippingAddressSection,
  type PaymentMethod,
} from "@/features/checkout";
import { useCreateOrder } from "@/features/orders";
import type { Order } from "@/features/orders";
import { ROUTES } from "@/shared/constants/routes";

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
  const draft = useCheckoutStore((state) => state.draft);
  const clearDraft = useCheckoutStore((state) => state.clearDraft);
  const clearPurchasedItems = useCartStore((state) => state.clearPurchasedItems);
  const authStatus = useAuthStore((state) => state.status);
  const user = useAuthStore((state) => state.user);
  const createOrderMutation = useCreateOrder();
  const [step, setStep] = useState<"checkout" | "complete">("checkout");
  const [completedPricing, setCompletedPricing] =
    useState<CartPricingSummary | null>(null);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [selectedPaymentId, setSelectedPaymentId] =
    useState<(typeof paymentOptions)[number]["id"]>("dicha-card");
  const items = useMemo(() => draft?.items ?? [], [draft]);

  const { subtotal, couponDiscount, shippingFee, total } = useMemo(
    () => calculateCartPricing(items),
    [items],
  );
  const selectedPayment = paymentOptions.find(
    (option) => option.id === selectedPaymentId,
  );

  async function handlePlaceOrder() {
    if (!draft) {
      return;
    }

    const addressSnapshot = {
      recipientName: user?.name ?? "비회원 고객",
      phone: "010-0000-0000",
      address: "서울 성동구 연무장길 00",
      detailAddress: "DICHA Studio 302호",
      postalCode: "04782",
    };
    const paymentMethod = selectedPaymentId as PaymentMethod;
    const payload =
      authStatus === "authenticated" && user
        ? {
            ordererType: "member" as const,
            userId: user.id,
            items: draft.items,
            addressSnapshot,
            paymentMethod,
            pricing: draft.pricing,
          }
        : {
            ordererType: "guest" as const,
            guestOrderer: {
              name: "비회원 고객",
              phone: "010-0000-0000",
              orderPassword: "0000",
            },
            items: draft.items,
            addressSnapshot,
            paymentMethod,
            pricing: draft.pricing,
          };

    const order = await createOrderMutation.mutateAsync(payload);

    setCompletedPricing({ subtotal, couponDiscount, shippingFee, total });
    setCompletedOrder(order);
    if (draft?.mode === "cart") {
      clearPurchasedItems(draft.items.map((item) => item.cartItemId));
    }
    clearDraft();
    setStep("complete");
  }

  if (!items.length && step === "checkout") {
    return <PurchaseEmptyState />;
  }

  if (step === "complete") {
    return (
      <PurchaseCompleteView
        completedOrder={completedOrder}
        completedPricing={completedPricing}
        fallbackTotal={total}
        onGoOrders={() => navigate(ROUTES.orders)}
        paymentLabel={selectedPayment?.label}
      />
    );
  }

  return (
    <div className="bg-[var(--palette-f7f5f1)] pb-40">
      <PurchaseHeaderSection />
      <PurchaseShippingAddressSection />
      <PurchasePaymentMethodSection
        onSelectPayment={setSelectedPaymentId}
        options={paymentOptions}
        selectedPaymentId={selectedPaymentId}
      />
      <PurchaseItemsSection items={items} />
      <PurchasePricingSection pricing={{ subtotal, couponDiscount, shippingFee, total }} />
      <PurchaseBottomActionBar
        isPending={createOrderMutation.isPending}
        onPlaceOrder={handlePlaceOrder}
        paymentLabel={selectedPayment?.label}
        total={total}
      />
    </div>
  );
}
