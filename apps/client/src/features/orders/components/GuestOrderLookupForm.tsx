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
      <div className="space-y-3">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-[var(--text-form-label)]">주문번호</span>
          <input
            className="h-12 w-full rounded-[0.85rem] border border-[var(--border-muted)] bg-[var(--surface-base)] px-4 text-sm text-[var(--brand-primary)] placeholder:text-[var(--text-placeholder)]"
            onChange={(event) => onChangeOrderNo(event.target.value)}
            placeholder="DICHA-20260506-0001"
            value={orderNo}
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-[var(--text-form-label)]">휴대폰 번호</span>
          <input
            className="h-12 w-full rounded-[0.85rem] border border-[var(--border-muted)] bg-[var(--surface-base)] px-4 text-sm text-[var(--brand-primary)] placeholder:text-[var(--text-placeholder)]"
            onChange={(event) => onChangePhone(event.target.value)}
            placeholder="010-0000-0000"
            value={phone}
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-[var(--text-form-label)]">주문 비밀번호</span>
          <input
            className="h-12 w-full rounded-[0.85rem] border border-[var(--border-muted)] bg-[var(--surface-base)] px-4 text-sm text-[var(--brand-primary)] placeholder:text-[var(--text-placeholder)]"
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
