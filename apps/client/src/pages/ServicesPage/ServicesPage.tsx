import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  CalendarCheck,
  ChevronRight,
  Clock3,
  Coffee,
  MapPin,
  PackageCheck,
  Repeat2,
  Truck,
  Users,
} from "lucide-react";

import { useAddresses } from "@/features/address";
import { useProductOptions, useProducts } from "@/features/products";
import { useCreateSubscription } from "@/features/subscriptions";
import { ImplementationNoticeModal } from "@/components/common/ImplementationNoticeModal";
import { LoadingScreen } from "@/components/common/LoadingScreen";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { ROUTES } from "@/shared/constants/routes";
import type { ProductType } from "@/shared/types/models";
import { formatPrice } from "@/shared/utils/format";

type ServiceTab = "subscription" | "class";

interface SubscriptionKind {
  id: ProductType;
  title: string;
  description: string;
}

const subscriptionKinds: SubscriptionKind[] = [
  {
    id: "beans",
    title: "원두 정기 배송",
    description: "취향에 맞는 원두를 매월 받아요.",
  },
  {
    id: "drip-bag",
    title: "드립백 정기 배송",
    description: "사무실과 집에서 편하게 마시는 구성.",
  },
  {
    id: "gift-set",
    title: "오피스/선물 구독",
    description: "여러 명이 함께 쓰는 커피 박스.",
  },
];

const classPrograms = [
  {
    id: "hand-drip-basic",
    title: "핸드드립 입문 클래스",
    description: "분쇄도, 물온도, 추출 흐름을 한 번에 익혀요.",
    duration: "90분",
    seats: 6,
  },
  {
    id: "cupping-note",
    title: "커핑과 향미 노트",
    description: "산미, 바디감, 단맛을 비교하며 취향을 기록해요.",
    duration: "120분",
    seats: 8,
  },
  {
    id: "espresso-home",
    title: "홈 에스프레소 세팅",
    description: "가정용 머신으로 안정적인 샷을 맞추는 수업.",
    duration: "90분",
    seats: 4,
  },
] as const;

const classSlots = [
  { id: "2026-07-04-1100", dateId: "2026-07-04", date: "2026.07.04", day: "토", time: "11:00" },
  { id: "2026-07-04-1400", dateId: "2026-07-04", date: "2026.07.04", day: "토", time: "14:00" },
  { id: "2026-07-04-1630", dateId: "2026-07-04", date: "2026.07.04", day: "토", time: "16:30" },
  { id: "2026-07-08-1900", dateId: "2026-07-08", date: "2026.07.08", day: "수", time: "19:00" },
  { id: "2026-07-12-1100", dateId: "2026-07-12", date: "2026.07.12", day: "일", time: "11:00" },
  { id: "2026-07-12-1400", dateId: "2026-07-12", date: "2026.07.12", day: "일", time: "14:00" },
] as const;

function toBackendNumericId(value?: string) {
  if (!value) return null;
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
}

export function ServicesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get("tab");
  const initialTab =
    tabParam === "class" ? "class" : "subscription";
  const productIdFromQuery = searchParams.get("productId") ?? "";
  const [activeTab, setActiveTab] = useState<ServiceTab>(initialTab);
  const [selectedKind, setSelectedKind] = useState<ProductType>("beans");
  const [selectedProductId, setSelectedProductId] =
    useState(productIdFromQuery);
  const [selectedOptionId, setSelectedOptionId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [formMessage, setFormMessage] = useState<string | null>(null);
  const [implementationFeature, setImplementationFeature] = useState<
    string | null
  >(null);
  const [selectedClassProgramId, setSelectedClassProgramId] = useState<string>(
    classPrograms[0].id,
  );
  const [selectedClassDateId, setSelectedClassDateId] = useState<string>(
    classSlots[0].dateId,
  );
  const [selectedClassSlotId, setSelectedClassSlotId] = useState<string>(
    classSlots[0].id,
  );

  const productsQuery = useProducts();
  const {
    addresses,
    defaultAddress,
    isLoading: isAddressLoading,
  } = useAddresses();
  const createSubscriptionMutation = useCreateSubscription();

  const products = useMemo(() => productsQuery.data ?? [], [productsQuery.data]);
  const selectedProductFromState = products.find(
    (product) => product.id === selectedProductId,
  );
  const activeSubscriptionKind =
    selectedProductFromState?.productType ?? selectedKind;
  const visibleProducts = useMemo(() => {
    const filtered = products.filter(
      (product) => product.productType === activeSubscriptionKind,
    );

    return filtered.length > 0 ? filtered : products;
  }, [activeSubscriptionKind, products]);
  const selectedProduct = selectedProductFromState ?? visibleProducts[0];
  const selectedBackendProductId = toBackendNumericId(selectedProduct?.id);
  const productOptionsQuery = useProductOptions(
    selectedBackendProductId ? selectedProduct?.id : undefined,
  );
  const productOptions = useMemo(
    () =>
      productOptionsQuery.data && productOptionsQuery.data.length > 0
        ? productOptionsQuery.data
        : (selectedProduct?.options ?? []),
    [productOptionsQuery.data, selectedProduct?.options],
  );
  const selectedOption =
    productOptions.find((option) => option.id === selectedOptionId) ??
    productOptions[0];
  const selectedAddress =
    addresses.find((address) => address.id === selectedAddressId) ??
    defaultAddress ??
    addresses[0];
  const selectedSubscriptionKind = subscriptionKinds.find(
    (kind) => kind.id === activeSubscriptionKind,
  );
  const selectedClassProgram = classPrograms.find(
    (program) => program.id === selectedClassProgramId,
  );
  const classDates = useMemo(
    () =>
      classSlots.filter(
        (slot, index, slots) =>
          slots.findIndex((candidate) => candidate.dateId === slot.dateId) ===
          index,
      ),
    [],
  );
  const slotsForSelectedDate = classSlots.filter(
    (slot) => slot.dateId === selectedClassDateId,
  );
  const selectedClassSlot =
    slotsForSelectedDate.find((slot) => slot.id === selectedClassSlotId) ??
    slotsForSelectedDate[0];
  const selectedClassDate = classDates.find(
    (slot) => slot.dateId === selectedClassDateId,
  );
  const expectedPrice =
    selectedProduct !== undefined
      ? (selectedProduct.price + (selectedOption?.extraPrice ?? 0)) * quantity
      : 0;

  function handleTabChange(tab: ServiceTab) {
    setActiveTab(tab);
    setSearchParams({ tab });
  }

  async function handleCreateSubscription() {
    setFormMessage(null);

    if (!selectedProduct) {
      setFormMessage("구독할 상품을 먼저 선택해 주세요.");
      return;
    }

    if (!selectedAddress) {
      setFormMessage("정기 배송을 받을 주소를 먼저 등록해 주세요.");
      return;
    }

    const productId = selectedBackendProductId;
    const productOptionId = toBackendNumericId(selectedOption?.id);

    if (!productId) {
      setImplementationFeature("구독 신청 API 상품 연결");
      return;
    }

    await createSubscriptionMutation.mutateAsync({
      productId,
      productOptionId: productOptionId ?? undefined,
      quantity,
      recipientName: selectedAddress.recipientName,
      phone: selectedAddress.phone,
      postalCode: selectedAddress.postalCode,
      address: selectedAddress.address,
      detailAddress: selectedAddress.detailAddress,
    });

    setFormMessage("정기구독 신청이 완료됐어요.");
  }

  return (
    <div className="cafe-tile-bg min-h-[100dvh] pb-10">
      <section className="bg-[var(--surface-chalkboard)] px-[var(--page-x)] py-6 text-[var(--text-chalk)]">
        <p className="text-[0.62rem] font-semibold tracking-[0.18em] text-[var(--text-chalk-muted)]">
          DICHA SERVICE
        </p>
        <h1 className="mt-2 break-keep text-[1.45rem] font-black leading-8">
          정기구독과 클래스 예약을 신청해요
        </h1>
        <p className="mt-2 break-keep text-[0.82rem] leading-6 text-[var(--text-chalk-muted)]">
          구독은 원하는 배송지를 선택하고, 클래스는 지정된 날짜와 시간 중
          골라 신청합니다.
        </p>
      </section>

      <div className="sticky top-0 z-10 grid grid-cols-2 bg-[var(--surface-menu-board)] px-[var(--page-x)] py-2 shadow-[var(--shadow-soft)]">
        <button
          className={[
            "flex h-11 items-center justify-center gap-2 text-sm font-black",
            activeTab === "subscription"
              ? "bg-[var(--surface-chalkboard)] text-[var(--text-chalk)]"
              : "text-[var(--text-cafe-ink)]",
          ].join(" ")}
          onClick={() => handleTabChange("subscription")}
          type="button"
        >
          <Truck className="size-4" />
          구독
        </button>
        <button
          className={[
            "flex h-11 items-center justify-center gap-2 text-sm font-black",
            activeTab === "class"
              ? "bg-[var(--surface-chalkboard)] text-[var(--text-chalk)]"
              : "text-[var(--text-cafe-ink)]",
          ].join(" ")}
          onClick={() => handleTabChange("class")}
          type="button"
        >
          <CalendarCheck className="size-4" />
          클래스
        </button>
      </div>

      {activeTab === "subscription" ? (
        <div className="space-y-3 pt-3">
          <section className="bg-[var(--surface-menu-board)] px-[var(--page-x)] py-5">
            <div className="flex items-start gap-3">
              <div className="flex size-11 shrink-0 items-center justify-center bg-[var(--surface-soft-green)] text-[var(--brand-primary)]">
                <Repeat2 className="size-5" />
              </div>
              <div className="min-w-0">
                <p className="text-[0.62rem] font-semibold tracking-[0.16em] text-[var(--text-muted)]">
                  COFFEE SUBSCRIPTION
                </p>
                <h2 className="mt-1 break-keep text-lg font-black text-[var(--text-cafe-ink)]">
                  커피 정기 배송 신청
                </h2>
                <p className="mt-1 break-keep text-sm leading-6 text-[var(--text-muted)]">
                  현재 백엔드는 30일 주기 구독을 지원합니다. 상품, 옵션,
                  수량, 배송지를 선택해 신청할 수 있어요.
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-3">
              <div>
                <p className="mb-2 text-xs font-bold text-[var(--text-muted)]">
                  구독 종류
                </p>
                <div className="grid gap-2">
                  {subscriptionKinds.map((kind) => (
                    <button
                      key={kind.id}
                      className={[
                        "w-full px-4 py-3 text-left",
                        activeSubscriptionKind === kind.id
                          ? "bg-[var(--surface-chalkboard)] text-[var(--text-chalk)]"
                          : "bg-[var(--surface-cafe-tile)] text-[var(--text-cafe-ink)]",
                      ].join(" ")}
                      onClick={() => {
                        setSelectedKind(kind.id);
                        setSelectedProductId("");
                        setSelectedOptionId("");
                      }}
                      type="button"
                    >
                      <span className="block text-sm font-black">
                        {kind.title}
                      </span>
                      <span
                        className={[
                          "mt-1 block text-xs leading-5",
                          activeSubscriptionKind === kind.id
                            ? "text-[var(--text-chalk-muted)]"
                            : "text-[var(--text-muted)]",
                        ].join(" ")}
                      >
                        {kind.description}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 text-xs font-bold text-[var(--text-muted)]">
                  구독 상품
                </p>
                {productsQuery.isLoading ? (
                  <LoadingScreen message="상품을 불러오는 중" />
                ) : (
                  <div className="grid gap-2">
                    {visibleProducts.slice(0, 6).map((product) => (
                      <button
                        key={product.id}
                        className={[
                          "grid grid-cols-[4.25rem_minmax(0,1fr)] gap-3 px-3 py-3 text-left",
                          selectedProduct?.id === product.id
                            ? "bg-[var(--surface-chalkboard)] text-[var(--text-chalk)]"
                            : "bg-[var(--surface-cafe-tile)] text-[var(--text-cafe-ink)]",
                        ].join(" ")}
                        onClick={() => {
                          setSelectedProductId(product.id);
                          setSelectedOptionId("");
                        }}
                        type="button"
                      >
                        <img
                          alt=""
                          aria-hidden="true"
                          className="aspect-square w-full object-cover"
                          src={product.image}
                        />
                        <span className="min-w-0">
                          <span className="line-clamp-2 break-keep text-sm font-black leading-5">
                            {product.name}
                          </span>
                          <span className="mt-1 block text-xs">
                            ₩{formatPrice(product.price)}
                          </span>
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {productOptions.length > 0 ? (
                <div>
                  <p className="mb-2 text-xs font-bold text-[var(--text-muted)]">
                    옵션 선택
                  </p>
                  <div className="grid gap-2">
                    {productOptions.map((option) => (
                      <button
                        key={option.id}
                        className={[
                          "flex items-center justify-between gap-3 px-4 py-3 text-left",
                          selectedOption?.id === option.id
                            ? "bg-[var(--surface-chalkboard)] text-[var(--text-chalk)]"
                            : "bg-[var(--surface-cafe-tile)] text-[var(--text-cafe-ink)]",
                        ].join(" ")}
                        onClick={() => setSelectedOptionId(option.id)}
                        type="button"
                      >
                        <span className="text-sm font-bold">{option.name}</span>
                        <span className="shrink-0 text-xs">
                          {option.extraPrice
                            ? `+${formatPrice(option.extraPrice)}원`
                            : "추가금액 없음"}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="bg-[var(--surface-cafe-tile)] px-4 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-black text-[var(--text-cafe-ink)]">
                      수량
                    </p>
                    <p className="mt-1 text-xs text-[var(--text-muted)]">
                      매월 배송될 상품 수량입니다.
                    </p>
                  </div>
                  <div className="flex items-center bg-[var(--surface-menu-board)]">
                    <button
                      className="size-10 text-sm font-black disabled:text-[var(--text-muted)]"
                      disabled={quantity === 1}
                      onClick={() =>
                        setQuantity((current) => Math.max(1, current - 1))
                      }
                      type="button"
                    >
                      -
                    </button>
                    <span className="min-w-10 text-center text-sm font-black">
                      {quantity}
                    </span>
                    <button
                      className="size-10 text-sm font-black"
                      onClick={() => setQuantity((current) => current + 1)}
                      type="button"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-xs font-bold text-[var(--text-muted)]">
                    배송지
                  </p>
                  <Link
                    className="text-xs font-bold text-[var(--brand-primary)]"
                    to={ROUTES.addressBook}
                  >
                    배송지 관리
                  </Link>
                </div>
                {isAddressLoading ? (
                  <LoadingScreen message="배송지를 불러오는 중" />
                ) : addresses.length > 0 ? (
                  <div className="grid gap-2">
                    {addresses.map((address) => (
                      <button
                        key={address.id}
                        className={[
                          "w-full px-4 py-3 text-left",
                          selectedAddress?.id === address.id
                            ? "bg-[var(--surface-chalkboard)] text-[var(--text-chalk)]"
                            : "bg-[var(--surface-cafe-tile)] text-[var(--text-cafe-ink)]",
                        ].join(" ")}
                        onClick={() => setSelectedAddressId(address.id)}
                        type="button"
                      >
                        <span className="flex items-center gap-2 text-sm font-black">
                          <MapPin className="size-4 shrink-0" />
                          {address.label}
                          {address.isDefault ? (
                            <span className="text-[0.68rem] font-bold">
                              기본
                            </span>
                          ) : null}
                        </span>
                        <span className="mt-1 block break-keep text-xs leading-5 opacity-80">
                          {address.recipientName} · {address.address}{" "}
                          {address.detailAddress}
                        </span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="bg-[var(--surface-cafe-tile)] px-4 py-4">
                    <p className="break-keep text-sm font-bold text-[var(--text-cafe-ink)]">
                      등록된 배송지가 없어요.
                    </p>
                    <p className="mt-1 break-keep text-xs leading-5 text-[var(--text-muted)]">
                      정기구독은 배송지가 필요합니다. 배송지를 먼저 등록해
                      주세요.
                    </p>
                  </div>
                )}
              </div>

              <div className="bg-[var(--surface-soft-green)] px-4 py-4">
                <div className="flex items-center justify-between gap-3">
                  <span>
                    <span className="block text-xs font-bold text-[var(--text-muted)]">
                      예상 월 구독금액
                    </span>
                    <span className="mt-1 block text-lg font-black text-[var(--text-cafe-ink)]">
                      ₩{formatPrice(expectedPrice)}
                    </span>
                  </span>
                  <PackageCheck className="size-6 text-[var(--brand-primary)]" />
                </div>
                <PrimaryButton
                  className="mt-3 w-full rounded-none bg-[var(--surface-chalkboard)] text-[var(--text-chalk)] shadow-none"
                  disabled={createSubscriptionMutation.isPending}
                  onClick={() => void handleCreateSubscription()}
                >
                  {createSubscriptionMutation.isPending
                    ? "신청 중"
                    : `${selectedSubscriptionKind?.title ?? "정기구독"} 신청`}
                </PrimaryButton>
                {formMessage ? (
                  <p className="mt-2 break-keep text-xs font-bold text-[var(--brand-primary)]">
                    {formMessage}
                  </p>
                ) : null}
              </div>
            </div>
          </section>

        </div>
      ) : (
        <div className="space-y-3 pt-3">
          <section className="bg-[var(--surface-menu-board)] px-[var(--page-x)] py-5">
            <div className="flex items-start gap-3">
              <div className="flex size-11 shrink-0 items-center justify-center bg-[var(--surface-soft-green)] text-[var(--brand-primary)]">
                <Coffee className="size-5" />
              </div>
              <div className="min-w-0">
                <p className="text-[0.62rem] font-semibold tracking-[0.16em] text-[var(--text-muted)]">
                  COFFEE CLASS
                </p>
                <h2 className="mt-1 break-keep text-lg font-black text-[var(--text-cafe-ink)]">
                  클래스 신청
                </h2>
                <p className="mt-1 break-keep text-sm leading-6 text-[var(--text-muted)]">
                  관리자가 지정한 날짜와 시간 중 하나를 선택해서 신청하는
                  구조입니다. 현재 예약 API는 백엔드에 아직 없습니다.
                </p>
              </div>
            </div>

            <button
              className="mt-4 flex w-full items-center justify-between gap-3 bg-[var(--surface-soft-green)] px-4 py-3 text-left"
              onClick={() => handleTabChange("subscription")}
              type="button"
            >
              <span className="min-w-0">
                <span className="block text-sm font-black text-[var(--text-cafe-ink)]">
                  구독 배송 관리는 구독 탭에서 처리해요
                </span>
                <span className="mt-1 block break-keep text-xs leading-5 text-[var(--text-muted)]">
                  정기 배송 신청, 배송지 선택, 일시정지와 해지는 별도 관리합니다.
                </span>
              </span>
              <ChevronRight className="size-4 shrink-0 text-[var(--brand-primary)]" />
            </button>

            <div className="mt-5 grid gap-3">
              <div>
                <p className="mb-2 text-xs font-bold text-[var(--text-muted)]">
                  클래스 선택
                </p>
                <div className="grid gap-2">
                  {classPrograms.map((program) => (
                    <button
                      key={program.id}
                      className={[
                        "w-full px-4 py-3 text-left",
                        selectedClassProgramId === program.id
                          ? "bg-[var(--surface-chalkboard)] text-[var(--text-chalk)]"
                          : "bg-[var(--surface-cafe-tile)] text-[var(--text-cafe-ink)]",
                      ].join(" ")}
                      onClick={() => setSelectedClassProgramId(program.id)}
                      type="button"
                    >
                      <span className="block break-keep text-sm font-black">
                        {program.title}
                      </span>
                      <span className="mt-1 block break-keep text-xs leading-5 opacity-80">
                        {program.description}
                      </span>
                      <span className="mt-2 flex items-center gap-3 text-[0.72rem] font-bold opacity-80">
                        <span className="inline-flex items-center gap-1">
                          <Clock3 className="size-3.5" />
                          {program.duration}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Users className="size-3.5" />
                          정원 {program.seats}명
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 text-xs font-bold text-[var(--text-muted)]">
                  날짜 및 시간
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {classDates.map((slot) => (
                    <button
                      key={slot.dateId}
                      className={[
                        "px-3 py-3 text-center",
                        selectedClassDateId === slot.dateId
                          ? "bg-[var(--surface-chalkboard)] text-[var(--text-chalk)]"
                          : "bg-[var(--surface-cafe-tile)] text-[var(--text-cafe-ink)]",
                      ].join(" ")}
                      onClick={() => {
                        setSelectedClassDateId(slot.dateId);
                        setSelectedClassSlotId("");
                      }}
                      type="button"
                    >
                      <span className="block text-xs font-bold">
                        {slot.date}
                      </span>
                      <span className="mt-1 block text-sm font-black">
                        {slot.day}
                      </span>
                    </button>
                  ))}
                </div>
                <div className="mt-3 flex w-full min-w-0 touch-pan-x snap-x snap-mandatory gap-2 overflow-x-auto overscroll-x-contain pb-2 [-webkit-overflow-scrolling:touch] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {slotsForSelectedDate.map((slot) => (
                      <button
                        key={slot.id}
                        className={[
                          "h-11 min-w-[5.75rem] flex-none snap-start px-4 text-sm font-black",
                          selectedClassSlot?.id === slot.id
                            ? "bg-[var(--surface-chalkboard)] text-[var(--text-chalk)]"
                            : "bg-[var(--surface-cafe-tile)] text-[var(--text-cafe-ink)]",
                        ].join(" ")}
                        onClick={() => setSelectedClassSlotId(slot.id)}
                        type="button"
                      >
                        {slot.time}
                      </button>
                    ))}
                </div>
              </div>

              <div className="bg-[var(--surface-soft-green)] px-4 py-4">
                <p className="text-xs font-bold text-[var(--text-muted)]">
                  신청 예정 내용
                </p>
                <p className="mt-1 break-keep text-sm font-black leading-6 text-[var(--text-cafe-ink)]">
                  {selectedClassProgram?.title} · {selectedClassDate?.date}{" "}
                  {selectedClassDate?.day} {selectedClassSlot?.time}
                </p>
                <PrimaryButton
                  className="mt-3 w-full rounded-none bg-[var(--surface-chalkboard)] text-[var(--text-chalk)] shadow-none"
                  onClick={() => setImplementationFeature("클래스 예약 API")}
                >
                  클래스 신청하기
                </PrimaryButton>
              </div>
            </div>
          </section>

        </div>
      )}

      <section className="px-[var(--page-x)] pt-3">
        <Link
          className="flex w-full items-center justify-between gap-3 bg-[var(--surface-menu-board)] px-4 py-4 text-left"
          to={ROUTES.serviceManagement}
        >
          <span className="min-w-0">
            <span className="block text-sm font-black text-[var(--text-cafe-ink)]">
              구독/예약 관리로 이동
            </span>
            <span className="mt-1 block break-keep text-xs leading-5 text-[var(--text-muted)]">
              구독 배송 상태와 클래스 신청 내역은 관리 화면에서 확인해요.
            </span>
          </span>
          <ChevronRight className="size-4 shrink-0 text-[var(--brand-primary)]" />
        </Link>
      </section>

      <ImplementationNoticeModal
        featureLabel={implementationFeature}
        onClose={() => setImplementationFeature(null)}
      />
    </div>
  );
}
