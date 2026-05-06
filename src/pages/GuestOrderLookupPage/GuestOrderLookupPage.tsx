import { Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { PrimaryButton } from "@/components/common/PrimaryButton";
import { useLookupGuestOrder } from "@/features/orders";
import { ROUTES } from "@/shared/constants/routes";
import { formatPrice } from "@/shared/utils/format";

export function GuestOrderLookupPage() {
  const lookupGuestOrder = useLookupGuestOrder();
  const [orderNo, setOrderNo] = useState("");
  const [phone, setPhone] = useState("");
  const [orderPassword, setOrderPassword] = useState("");

  function handleLookup() {
    lookupGuestOrder.mutate({
      orderNo: orderNo.trim(),
      phone: phone.trim(),
      orderPassword,
    });
  }

  const canLookup = orderNo.trim() && phone.trim() && orderPassword.trim();
  const order = lookupGuestOrder.data;

  return (
    <div className="bg-[var(--palette-f7f5f0)] px-5 pb-10 pt-8">
      <section className="rounded-[1.5rem] bg-white px-5 py-7 shadow-[0_8px_24px_var(--rgba-34-34-34-006)]">
        <div className="flex size-12 items-center justify-center rounded-full bg-[var(--palette-eaf6ef)] text-[var(--palette-214b33)]">
          <Search className="size-5" />
        </div>
        <h1 className="mt-5 text-[1.7rem] font-bold tracking-[-0.03em] text-[var(--palette-171717)]">
          비회원 주문 조회
        </h1>
        <p className="mt-3 text-[0.98rem] leading-6 text-[var(--palette-666666)]">
          주문번호, 휴대폰 번호, 주문 비밀번호로 비회원 주문을 확인할 수 있습니다.
        </p>

        <div className="mt-6 space-y-3">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-[var(--palette-514b43)]">주문번호</span>
            <input
              className="h-12 w-full rounded-[0.85rem] border border-[var(--line-color)] bg-white px-4 text-sm text-[var(--color-primary-green)] placeholder:text-[var(--palette-a0a0a0)]"
              onChange={(event) => setOrderNo(event.target.value)}
              placeholder="DICHA-20260506-0001"
              value={orderNo}
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-[var(--palette-514b43)]">휴대폰 번호</span>
            <input
              className="h-12 w-full rounded-[0.85rem] border border-[var(--line-color)] bg-white px-4 text-sm text-[var(--color-primary-green)] placeholder:text-[var(--palette-a0a0a0)]"
              onChange={(event) => setPhone(event.target.value)}
              placeholder="010-0000-0000"
              value={phone}
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-[var(--palette-514b43)]">주문 비밀번호</span>
            <input
              className="h-12 w-full rounded-[0.85rem] border border-[var(--line-color)] bg-white px-4 text-sm text-[var(--color-primary-green)] placeholder:text-[var(--palette-a0a0a0)]"
              onChange={(event) => setOrderPassword(event.target.value)}
              placeholder="주문 비밀번호 입력"
              type="password"
              value={orderPassword}
            />
          </label>
        </div>

        <PrimaryButton
          className="mt-6 h-12 w-full rounded-[0.85rem]"
          disabled={!canLookup || lookupGuestOrder.isPending}
          onClick={handleLookup}
        >
          {lookupGuestOrder.isPending ? "조회 중..." : "주문 조회"}
        </PrimaryButton>

        {lookupGuestOrder.isSuccess ? (
          order ? (
            <div className="mt-6 rounded-[1.1rem] bg-[var(--palette-f7f5f0)] px-4 py-4">
              <p className="text-sm text-[var(--palette-6d6a64)]">주문번호</p>
              <p className="mt-1 font-bold text-[var(--palette-171717)]">{order.orderNo}</p>
              <p className="mt-4 text-sm text-[var(--palette-6d6a64)]">결제 금액</p>
              <p className="mt-1 text-[1.25rem] font-bold text-[var(--palette-992b22)]">
                ₩{formatPrice(order.totalAmount)}
              </p>
            </div>
          ) : (
            <p className="mt-5 text-center text-sm text-[var(--color-primary-red)]">
              일치하는 비회원 주문을 찾지 못했어요.
            </p>
          )
        ) : null}
      </section>

      <Link
        className="mt-6 flex h-12 items-center justify-center rounded-[0.95rem] bg-white text-sm font-semibold text-[var(--second-color)]"
        to={ROUTES.products}
      >
        쇼핑 계속하기
      </Link>
    </div>
  );
}
