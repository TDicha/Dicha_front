import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { PrimaryButton } from "@/components/common/PrimaryButton";
import { mockOrders } from "@/mock/orders";
import { mockProducts } from "@/mock/products";
import { ROUTES } from "@/shared/constants/routes";
import { formatPrice } from "@/shared/utils/format";

const filterOptions = [
  { key: "all", label: "전체" },
  { key: "active", label: "진행중" },
  { key: "done", label: "완료" },
  { key: "empty", label: "빈 상태" },
] as const;

const orderMeta = {
  shipping: {
    badge: "배송중",
    badgeClassName: "bg-[#eaf6ef] text-[#37795e]",
    detailLabel: "미디엄·핸드드립·200g",
    reviewEnabled: false,
  },
  preparing: {
    badge: "배송준비",
    badgeClassName: "bg-[#f3f2ef] text-[#7c776f]",
    detailLabel: "미디엄 200g·월 1회",
    reviewEnabled: false,
  },
  completed: {
    badge: "배송완료",
    badgeClassName: "bg-[#eef6ef] text-[#214b33]",
    detailLabel: "라이트·핸드드립·200g",
    reviewEnabled: true,
  },
} as const;

const recommendedProducts = [
  { productId: "ethiopia-yirgacheffe", price: 18000 },
  { productId: "colombia-huila", price: 16000 },
  { productId: "kenya-kiambu-aa", price: 20000 },
];

function formatOrderNumber(orderId: string, index: number) {
  const digits = orderId.replace(/\D/g, "").slice(-8);
  return `2026${digits}${index + 1}`;
}

function formatOrderDate(date: string) {
  return date.replace(/-/g, ".");
}

export function OrderListPage() {
  const [filter, setFilter] = useState<(typeof filterOptions)[number]["key"]>("all");

  const filteredOrders = useMemo(() => {
    if (filter === "all") {
      return mockOrders;
    }

    if (filter === "active") {
      return mockOrders.filter((order) => order.status !== "completed");
    }

    if (filter === "done") {
      return mockOrders.filter((order) => order.status === "completed");
    }

    return [];
  }, [filter]);

  return (
    <div className="bg-[#f7f5f0] px-4 pb-10 pt-3">
      <section className="flex gap-2 overflow-x-auto pb-2">
        {filterOptions.map((option) => (
          <button
            key={option.key}
            className={[
              "rounded-full px-4 py-2 text-sm font-medium transition",
              filter === option.key
                ? "bg-[#204a32] text-white"
                : "bg-white text-[#204a32]",
            ].join(" ")}
            onClick={() => setFilter(option.key)}
            type="button"
          >
            {option.label}
          </button>
        ))}
      </section>

      <p className="px-1 pt-2 text-[1rem] text-[#7b776f]">총 {filteredOrders.length}건</p>

      {filteredOrders.length ? (
        <section className="mt-2 space-y-4">
          {filteredOrders.map((order, index) => {
            const product = mockProducts.find((item) => item.name === order.productName);
            const meta = orderMeta[order.status];

            return (
              <article
                key={`${order.id}-${order.productName}-${index}`}
                className="overflow-hidden rounded-[1.6rem] bg-white shadow-[0_8px_24px_rgba(34,34,34,0.06)]"
              >
                <div className="flex items-start justify-between gap-4 px-4 pb-3 pt-4">
                  <div>
                    <p className="text-[1rem] text-[#8b867d]">{formatOrderDate(order.orderedAt)}</p>
                    <p className="mt-1 text-[0.92rem] text-[#c5c0b6]">
                      주문번호 {formatOrderNumber(order.id, index)}
                    </p>
                  </div>
                  <button className="pt-0.5 text-[1rem] text-[#1e3f2d]" type="button">
                    상세보기
                  </button>
                </div>

                <div className="border-y border-[#ebe6dd] px-4 py-4">
                  <div className="flex gap-3">
                    <div className="flex size-20 shrink-0 items-center justify-center rounded-[0.8rem] bg-[#dfe8d8]">
                      {product ? (
                        <img
                          alt={order.productName}
                          className="h-12 w-12 rounded-full object-cover"
                          src={product.image}
                        />
                      ) : (
                        <div className="text-3xl">☕</div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="text-[1.18rem] font-bold leading-7 tracking-[-0.03em] text-[#171717]">
                        {order.productName}
                      </h2>
                      <p className="mt-1 text-[0.98rem] text-[#88837a]">{meta.detailLabel}</p>
                      <p className="mt-2 text-[1.05rem] font-bold text-[#171717]">
                        ₩{formatPrice(order.amount)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="px-4 pb-4 pt-3">
                  <div className="flex items-center justify-between">
                    <span
                      className={[
                        "rounded-full px-3 py-1 text-[0.92rem] font-semibold",
                        meta.badgeClassName,
                      ].join(" ")}
                    >
                      {meta.badge}
                    </span>
                    <div className="text-right">
                      <p className="text-[0.95rem] text-[#9a958c]">결제금액</p>
                      <p className="mt-0.5 text-[1rem] font-bold text-[#171717]">
                        ₩{formatPrice(order.amount)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2">
                    <Link
                      className="flex h-12 items-center justify-center rounded-[1rem] border border-[#204a32] bg-white text-[1rem] font-semibold text-[#204a32]"
                      to={ROUTES.products}
                    >
                      재주문
                    </Link>
                    <button
                      className={[
                        "h-12 rounded-[1rem] text-[1rem] font-semibold",
                        meta.reviewEnabled
                          ? "bg-[#cda24d] text-[#173726]"
                          : "bg-[#f3f2ef] text-[#b6b1a8]",
                      ].join(" ")}
                      disabled={!meta.reviewEnabled}
                      type="button"
                    >
                      리뷰 쓰기
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      ) : (
        <section className="px-1 pt-8">
          <div className="rounded-[1.8rem] bg-white px-4 py-8 text-center">
            <div className="mx-auto flex size-[7.5rem] items-center justify-center rounded-full bg-[#f3f2ef] text-[3rem]">
              📦
            </div>
            <h2 className="mt-6 text-[2rem] font-bold tracking-[-0.04em] text-[#171717]">
              주문 내역이 없습니다
            </h2>
            <p className="mt-3 text-[1.1rem] leading-7 text-[#666666]">
              아직 주문하신 상품이 없어요.
              <br />
              지금 디차 원두를 만나보세요!
            </p>

            <PrimaryButton asChild className="mt-8 h-14 w-full rounded-[1.15rem] text-[1.05rem] shadow-none">
              <Link to={ROUTES.products}>쇼핑하러 가기</Link>
            </PrimaryButton>

            <div className="mt-8 text-left">
              <h3 className="text-[1.55rem] font-bold tracking-[-0.04em] text-[#171717]">
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
                      className="overflow-hidden rounded-[1.1rem] bg-[#faf8f4] pb-3 shadow-[0_6px_16px_rgba(34,34,34,0.04)]"
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
                        <p className="min-h-10 text-[0.82rem] leading-4 text-[#262626]">
                          {product.name}
                        </p>
                        <p className="mt-1 text-[0.85rem] text-[#7b231d]">
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
      )}
    </div>
  );
}
