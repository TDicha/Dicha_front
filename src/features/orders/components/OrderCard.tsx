import { Link } from "react-router-dom";

import type { Order, OrderStatus } from "@/features/orders/types";
import { mockProducts } from "@/mock/products";
import { ROUTES } from "@/shared/constants/routes";
import { formatPrice } from "@/shared/utils/format";

const orderMeta: Record<
  OrderStatus,
  { badge: string; badgeClassName: string; reviewEnabled: boolean }
> = {
  order_created: {
    badge: "주문접수",
    badgeClassName: "bg-[var(--palette-f3f2ef)] text-[var(--palette-7c776f)]",
    reviewEnabled: false,
  },
  payment_completed: {
    badge: "결제완료",
    badgeClassName: "bg-[var(--palette-eaf6ef)] text-[var(--palette-37795e)]",
    reviewEnabled: false,
  },
  shipping: {
    badge: "배송중",
    badgeClassName: "bg-[var(--palette-eaf6ef)] text-[var(--palette-37795e)]",
    reviewEnabled: false,
  },
  preparing: {
    badge: "배송준비",
    badgeClassName: "bg-[var(--palette-f3f2ef)] text-[var(--palette-7c776f)]",
    reviewEnabled: false,
  },
  delivered: {
    badge: "배송완료",
    badgeClassName: "bg-[var(--palette-eef6ef)] text-[var(--palette-214b33)]",
    reviewEnabled: true,
  },
  canceled: {
    badge: "취소",
    badgeClassName: "bg-[var(--palette-f3f2ef)] text-[var(--palette-7c776f)]",
    reviewEnabled: false,
  },
  refunded: {
    badge: "환불",
    badgeClassName: "bg-[var(--palette-f3f2ef)] text-[var(--palette-7c776f)]",
    reviewEnabled: false,
  },
};

function formatOrderDate(date: string) {
  return date.slice(0, 10).replace(/-/g, ".");
}

interface OrderCardProps {
  order: Order;
}

export function OrderCard({ order }: OrderCardProps) {
  const firstItem = order.items[0];
  const productName = firstItem?.productName ?? "DICHA Coffee";
  const product = mockProducts.find((item) => item.name === productName);
  const meta = orderMeta[order.status];
  const detailLabel = firstItem ? `${firstItem.optionName} · ${firstItem.quantity}개` : "주문 상품";

  return (
    <article className="overflow-hidden rounded-[1.6rem] bg-white shadow-[0_8px_24px_var(--rgba-34-34-34-006)]">
      <div className="flex items-start justify-between gap-4 px-4 pb-3 pt-4">
        <div>
          <p className="text-[1rem] text-[var(--palette-8b867d)]">{formatOrderDate(order.orderedAt)}</p>
          <p className="mt-1 text-[0.92rem] text-[var(--palette-c5c0b6)]">주문번호 {order.orderNo}</p>
        </div>
        <button className="pt-0.5 text-[1rem] text-[var(--palette-1e3f2d)]" type="button">
          상세보기
        </button>
      </div>

      <div className="border-y border-[var(--palette-ebe6dd)] px-4 py-4">
        <div className="flex gap-3">
          <div className="flex size-20 shrink-0 items-center justify-center rounded-[0.8rem] bg-[var(--palette-dfe8d8)]">
            {product ? (
              <img alt={productName} className="h-12 w-12 rounded-full object-cover" src={product.image} />
            ) : (
              <div className="text-3xl">☕</div>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-[1.18rem] font-bold leading-7 tracking-[-0.03em] text-[var(--palette-171717)]">
              {productName}
            </h2>
            <p className="mt-1 text-[0.98rem] text-[var(--palette-88837a)]">{detailLabel}</p>
            <p className="mt-2 text-[1.05rem] font-bold text-[var(--palette-171717)]">
              ₩{formatPrice(order.totalAmount)}
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 pb-4 pt-3">
        <div className="flex items-center justify-between">
          <span className={["rounded-full px-3 py-1 text-[0.92rem] font-semibold", meta.badgeClassName].join(" ")}>
            {meta.badge}
          </span>
          <div className="text-right">
            <p className="text-[0.95rem] text-[var(--palette-9a958c)]">결제금액</p>
            <p className="mt-0.5 text-[1rem] font-bold text-[var(--palette-171717)]">
              ₩{formatPrice(order.totalAmount)}
            </p>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <Link
            className="flex h-12 items-center justify-center rounded-[1rem] border border-[var(--second-color)] bg-white text-[1rem] font-semibold text-[var(--second-color)]"
            to={ROUTES.products}
          >
            재주문
          </Link>
          <button
            className={[
              "h-12 rounded-[1rem] text-[1rem] font-semibold",
              meta.reviewEnabled
                ? "bg-[var(--palette-cda24d)] text-[var(--palette-173726)]"
                : "bg-[var(--palette-f3f2ef)] text-[var(--palette-b6b1a8)]",
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
}
