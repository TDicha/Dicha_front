import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthStore, useCartStore, useCheckoutStore } from "@/app/store";
import { AuthField } from "@/components/common/AuthField";
import { LoadingScreen } from "@/components/common/LoadingScreen";
import { AddressPickerModal, toAddressSnapshot, useAddresses } from "@/features/address";
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
} from "@/features/checkout";
import type { AddressSnapshot, PaymentMethod } from "@/features/checkout/types";
import { useCreateOrder } from "@/features/orders/hooks/useOrders";
import type { CheckoutItem, CreateOrderPayload, Order } from "@/features/orders/types";
import {
  toAnalyticsCartItems,
  trackAnalyticsEvent,
} from "@/services/analytics";
import { ROUTES } from "@/shared/constants/routes";

const paymentOptions = [
  {
    id: "account" as const,
    label: "무통장입금",
    description: "무통장입금",
  },
  {
    id: "kakao-pay" as const,
    label: "카카오페이",
    description: "카카오 간편결제",
  },
  {
    id: "credit-card" as const,
    label: "신용/체크카드",
    description: "카드 결제",
  },
] satisfies ReadonlyArray<{
  id: PaymentMethod;
  label: string;
  description: string;
}>;

function buildShippingLabel(address: AddressSnapshot | null) {
  if (!address) {
    return "-";
  }
  return [address.address, address.detailAddress].filter(Boolean).join(" ");
}

function toCheckoutItem(item: {
  productId: string;
  optionId: string;
  productName: string;
  optionName: string;
  productImage?: string;
  unitPrice: number;
  quantity: number;
}): CheckoutItem {
  return {
    productId: item.productId,
    optionId: item.optionId,
    productName: item.productName,
    optionName: item.optionName,
    productImage: item.productImage,
    unitPrice: item.unitPrice,
    quantity: item.quantity,
  };
}

export function PurchasePage() {
  const navigate = useNavigate();

  const draft = useCheckoutStore((state) => state.draft);
  const setAddress = useCheckoutStore((state) => state.setAddress);
  const setPaymentMethod = useCheckoutStore((state) => state.setPaymentMethod);
  const clearDraft = useCheckoutStore((state) => state.clearDraft);

  const user = useAuthStore((state) => state.user);
  const authStatus = useAuthStore((state) => state.status);
  const isAuthenticated = authStatus === "authenticated";

  const { defaultAddress } = useAddresses();
  const clearPurchasedItems = useCartStore((state) => state.clearPurchasedItems);
  const createOrderMutation = useCreateOrder();

  const items = useMemo(() => draft?.items ?? [], [draft]);

  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>(
    draft?.paymentMethod ?? "account",
  );
  const [pickerOpen, setPickerOpen] = useState(false);
  const [guestPassword, setGuestPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [completedPricing, setCompletedPricing] =
    useState<CartPricingSummary | null>(null);
  const trackedCheckoutKeyRef = useRef<string | null>(null);
  const trackedShippingKeyRef = useRef<string | null>(null);

  const selectedAddress = draft?.addressSnapshot ?? null;

  const { subtotal, couponDiscount, shippingFee, total } = useMemo(
    () => calculateCartPricing(items),
    [items],
  );

  const paymentLabel =
    paymentOptions.find((option) => option.id === selectedPayment)?.label ??
    "결제 수단";

  const trackShippingInfo = useCallback(
    (address: AddressSnapshot) => {
      const shippingKey = [
        address.recipientName,
        address.phone,
        address.postalCode,
        address.address,
        address.detailAddress,
      ].join(":");

      if (trackedShippingKeyRef.current === shippingKey) {
        return;
      }

      trackedShippingKeyRef.current = shippingKey;
      trackAnalyticsEvent("add_shipping_info", {
        currency: "KRW",
        orderer_type: isAuthenticated ? "member" : "guest",
        shipping_tier: "standard",
        value: total,
        items: toAnalyticsCartItems(items),
      });
    },
    [isAuthenticated, items, total],
  );

  // 진입 시 기본 배송지가 있으면 자동 선택한다.
  useEffect(() => {
    if (!selectedAddress && defaultAddress) {
      const addressSnapshot = toAddressSnapshot(defaultAddress);
      setAddress(addressSnapshot);
      trackShippingInfo(addressSnapshot);
    }
  }, [selectedAddress, defaultAddress, setAddress, trackShippingInfo]);

  useEffect(() => {
    if (!items.length) {
      return;
    }

    const checkoutKey = `${draft?.mode ?? "unknown"}:${items
      .map((item) => `${item.cartItemId}:${item.quantity}`)
      .join(",")}`;

    if (trackedCheckoutKeyRef.current === checkoutKey) {
      return;
    }

    trackedCheckoutKeyRef.current = checkoutKey;
    trackAnalyticsEvent("begin_checkout", {
      checkout_mode: draft?.mode,
      currency: "KRW",
      orderer_type: isAuthenticated ? "member" : "guest",
      value: total,
      items: toAnalyticsCartItems(items),
    });
  }, [draft?.mode, isAuthenticated, items, total]);

  function handleGoOrders() {
    if (isAuthenticated) {
      navigate(ROUTES.orders);
      return;
    }

    // 비회원은 로그인 페이지의 비회원 조회 탭으로 이동하며 주문번호·연락처를 자동 입력한다.
    navigate(`${ROUTES.login}?tab=guest`, {
      state: {
        orderNo: completedOrder?.orderNo,
        phone: completedOrder?.addressSnapshot.phone,
      },
    });
  }

  if (completedOrder) {
    return (
      <PurchaseCompleteView
        completedOrder={completedOrder}
        completedPricing={completedPricing}
        fallbackTotal={completedOrder.totalAmount}
        onGoOrders={handleGoOrders}
        paymentLabel={paymentLabel}
        shippingLabel={buildShippingLabel(completedOrder.addressSnapshot)}
      />
    );
  }

  if (authStatus === "checking") {
    return (
      <LoadingScreen className="min-h-full" message="로그인 상태 확인 중" />
    );
  }

  if (!items.length) {
    return <PurchaseEmptyState />;
  }

  function handleSelectPayment(paymentId: PaymentMethod) {
    setSelectedPayment(paymentId);
    setPaymentMethod(paymentId);
    trackAnalyticsEvent("add_payment_info", {
      currency: "KRW",
      orderer_type: isAuthenticated ? "member" : "guest",
      payment_type: paymentId,
      value: total,
      items: toAnalyticsCartItems(items),
    });
  }

  async function handlePlaceOrder() {
    if (!selectedAddress) {
      setError("배송지를 등록해 주세요.");
      return;
    }
    if (!isAuthenticated && guestPassword.trim().length < 4) {
      setError("비회원 주문 조회 비밀번호를 4자 이상 입력해 주세요.");
      return;
    }

    setError(null);

    const checkoutItems = items.map(toCheckoutItem);
    const pricing = { subtotal, couponDiscount, shippingFee, total };

    const payload: CreateOrderPayload = isAuthenticated
      ? {
          ordererType: "member",
          userId: user?.id ?? "",
          items: checkoutItems,
          addressSnapshot: selectedAddress,
          paymentMethod: selectedPayment,
          pricing,
        }
      : {
          ordererType: "guest",
          guestOrderer: {
            name: selectedAddress.recipientName,
            phone: selectedAddress.phone,
            orderPassword: guestPassword.trim(),
          },
          items: checkoutItems,
          addressSnapshot: selectedAddress,
          paymentMethod: selectedPayment,
          pricing,
        };

    try {
      const order = await createOrderMutation.mutateAsync(payload);
      const orderPayload = {
        currency: "KRW",
        orderer_type: payload.ordererType,
        payment_type: selectedPayment,
        payment_status: order.paymentStatus,
        transaction_id: order.orderNo,
        value: order.totalAmount,
        shipping: order.shippingFee,
        items: order.items.map((item) => ({
          item_id: item.productId,
          item_name: item.productName,
          item_variant: item.optionName,
          price: item.unitPrice,
          quantity: item.quantity,
        })),
      };

      trackAnalyticsEvent("order_created", orderPayload);

      if (payload.ordererType === "guest") {
        trackAnalyticsEvent("guest_order_created", orderPayload);
      }

      trackAnalyticsEvent("purchase", orderPayload);
      setCompletedPricing(pricing);
      // 주문에 사용한 장바구니 항목 정리 후 draft 초기화.
      clearPurchasedItems(items.map((item) => item.cartItemId));
      clearDraft();
      setCompletedOrder(order);
    } catch {
      setError("주문 생성에 실패했습니다. 잠시 후 다시 시도해 주세요.");
    }
  }

  return (
    <div className="cafe-tile-bg min-h-full pb-[var(--fixed-action-page-padding)]">
      <PurchaseHeaderSection />

      <PurchaseShippingAddressSection
        address={selectedAddress}
        onEdit={() => setPickerOpen(true)}
      />

      {!isAuthenticated ? (
        <section className="mt-2 bg-[var(--surface-menu-board)] px-[var(--page-x)] py-6">
          <h2 className="text-[1.2rem] font-bold text-[var(--text-cafe-ink)]">
            비회원 주문 조회 비밀번호
          </h2>
          <p className="mt-1 text-[0.92rem] text-[var(--text-muted-warm)]">
            주문 조회 시 사용할 비밀번호를 입력해 주세요.
          </p>
          <div className="mt-4">
            <AuthField
              label="비밀번호"
              onChange={(event) => setGuestPassword(event.target.value)}
              placeholder="4자 이상"
              type="password"
              value={guestPassword}
            />
          </div>
        </section>
      ) : null}

      <PurchasePaymentMethodSection
        onSelectPayment={handleSelectPayment}
        options={paymentOptions}
        selectedPaymentId={selectedPayment}
      />

      <PurchaseItemsSection items={items} />
      <PurchasePricingSection
        pricing={{ subtotal, couponDiscount, shippingFee, total }}
      />

      {error ? (
        <p className="px-[var(--page-x)] pt-3 text-sm text-[var(--text-danger,#d14343)]">
          {error}
        </p>
      ) : null}

      <PurchaseBottomActionBar
        disabled={!selectedAddress}
        isPending={createOrderMutation.isPending}
        onPlaceOrder={handlePlaceOrder}
        paymentLabel={paymentLabel}
        total={total}
      />

      <AddressPickerModal
        onClose={() => setPickerOpen(false)}
        onSelect={(address) => {
          const addressSnapshot = toAddressSnapshot(address);
          setAddress(addressSnapshot);
          trackShippingInfo(addressSnapshot);
        }}
        open={pickerOpen}
      />
    </div>
  );
}
