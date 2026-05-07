import { Search } from "lucide-react";

import { PrimaryButton } from "@/components/common/PrimaryButton";

interface GuestOrderLookupFormProps {
  canLookup: boolean;
  isPending: boolean;
  orderNo: string;
  orderPassword: string;
  phone: string;
  onChangeOrderNo: (value: string) => void;
  onChangeOrderPassword: (value: string) => void;
  onChangePhone: (value: string) => void;
  onLookup: () => void;
}

export function GuestOrderLookupForm({
  canLookup,
  isPending,
  orderNo,
  orderPassword,
  phone,
  onChangeOrderNo,
  onChangeOrderPassword,
  onChangePhone,
  onLookup,
}: GuestOrderLookupFormProps) {
  return (
    <>
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
            onChange={(event) => onChangeOrderNo(event.target.value)}
            placeholder="DICHA-20260506-0001"
            value={orderNo}
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-[var(--palette-514b43)]">휴대폰 번호</span>
          <input
            className="h-12 w-full rounded-[0.85rem] border border-[var(--line-color)] bg-white px-4 text-sm text-[var(--color-primary-green)] placeholder:text-[var(--palette-a0a0a0)]"
            onChange={(event) => onChangePhone(event.target.value)}
            placeholder="010-0000-0000"
            value={phone}
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-[var(--palette-514b43)]">주문 비밀번호</span>
          <input
            className="h-12 w-full rounded-[0.85rem] border border-[var(--line-color)] bg-white px-4 text-sm text-[var(--color-primary-green)] placeholder:text-[var(--palette-a0a0a0)]"
            onChange={(event) => onChangeOrderPassword(event.target.value)}
            placeholder="주문 비밀번호 입력"
            type="password"
            value={orderPassword}
          />
        </label>
      </div>

      <PrimaryButton className="mt-6 h-12 w-full rounded-[0.85rem]" disabled={!canLookup || isPending} onClick={onLookup}>
        {isPending ? "조회 중..." : "주문 조회"}
      </PrimaryButton>
    </>
  );
}
