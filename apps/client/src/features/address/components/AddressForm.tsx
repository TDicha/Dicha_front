import { Search } from "lucide-react";
import { useState } from "react";

import { AuthField } from "@/components/common/AuthField";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import type { AddressDraft, SavedAddress } from "@/features/address/types";
import { openDaumPostcode } from "@/shared/lib/loadDaumPostcode";

interface AddressFormProps {
  initialValue?: SavedAddress;
  submitLabel?: string;
  onSubmit: (draft: AddressDraft) => void;
  onCancel?: () => void;
}

function createInitialDraft(initialValue?: SavedAddress): AddressDraft {
  return {
    label: initialValue?.label ?? "",
    recipientName: initialValue?.recipientName ?? "",
    phone: initialValue?.phone ?? "",
    postalCode: initialValue?.postalCode ?? "",
    address: initialValue?.address ?? "",
    detailAddress: initialValue?.detailAddress ?? "",
  };
}

export function AddressForm({
  initialValue,
  submitLabel = "저장",
  onSubmit,
  onCancel,
}: AddressFormProps) {
  const [draft, setDraft] = useState<AddressDraft>(() =>
    createInitialDraft(initialValue),
  );
  const [error, setError] = useState<string | null>(null);

  function update<TKey extends keyof AddressDraft>(
    key: TKey,
    value: AddressDraft[TKey],
  ) {
    setDraft((previous) => ({ ...previous, [key]: value }));
  }

  async function handleSearchPostcode() {
    const result = await openDaumPostcode();
    if (!result) {
      return;
    }

    setDraft((previous) => ({
      ...previous,
      postalCode: result.zonecode,
      address: result.address,
    }));
  }

  function handleSubmit() {
    if (!draft.recipientName.trim()) {
      setError("받는 분 이름을 입력해 주세요.");
      return;
    }
    if (!draft.phone.trim()) {
      setError("연락처를 입력해 주세요.");
      return;
    }
    if (!draft.address.trim()) {
      setError("우편번호 찾기로 주소를 선택해 주세요.");
      return;
    }

    setError(null);
    onSubmit({
      label: draft.label.trim() || "배송지",
      recipientName: draft.recipientName.trim(),
      phone: draft.phone.trim(),
      postalCode: draft.postalCode.trim(),
      address: draft.address.trim(),
      detailAddress: draft.detailAddress.trim(),
    });
  }

  return (
    <div className="space-y-4">
      <AuthField
        label="배송지 이름 (선택)"
        onChange={(event) => update("label", event.target.value)}
        placeholder="집, 회사 등"
        value={draft.label}
      />
      <AuthField
        label="받는 분"
        onChange={(event) => update("recipientName", event.target.value)}
        placeholder="이름"
        value={draft.recipientName}
      />
      <AuthField
        inputMode="tel"
        label="연락처"
        onChange={(event) => update("phone", event.target.value)}
        placeholder="010-0000-0000"
        value={draft.phone}
      />

      <div className="space-y-2">
        <span className="text-sm text-[var(--text-muted)]">주소</span>
        <div className="flex gap-2">
          <input
            className="w-full rounded-[1rem] border border-[var(--border-ink-8)] bg-[var(--surface-base)] px-4 py-3 text-sm text-[var(--brand-primary)] placeholder:text-[var(--text-muted)]"
            placeholder="우편번호"
            readOnly
            value={draft.postalCode}
          />
          <PrimaryButton
            className="h-auto shrink-0 gap-2 rounded-[1rem] px-4"
            onClick={handleSearchPostcode}
            type="button"
          >
            <Search className="size-4" />
            우편번호 찾기
          </PrimaryButton>
        </div>
        <input
          className="w-full rounded-[1rem] border border-[var(--border-ink-8)] bg-[var(--surface-base)] px-4 py-3 text-sm text-[var(--brand-primary)] placeholder:text-[var(--text-muted)]"
          placeholder="주소를 검색해 주세요"
          readOnly
          value={draft.address}
        />
        <input
          className="w-full rounded-[1rem] border border-[var(--border-ink-8)] bg-[var(--surface-base)] px-4 py-3 text-sm text-[var(--brand-primary)] placeholder:text-[var(--text-muted)]"
          onChange={(event) => update("detailAddress", event.target.value)}
          placeholder="상세 주소 (동/호수 등)"
          value={draft.detailAddress}
        />
      </div>

      {error ? (
        <p className="text-sm text-[var(--text-danger,#d14343)]">{error}</p>
      ) : null}

      <div className="flex gap-2 pt-1">
        {onCancel ? (
          <PrimaryButton
            className="flex-1 bg-[var(--surface-cafe-tile)] text-[var(--text-cafe-ink)] shadow-none"
            onClick={onCancel}
            type="button"
          >
            취소
          </PrimaryButton>
        ) : null}
        <PrimaryButton className="flex-1" onClick={handleSubmit} type="button">
          {submitLabel}
        </PrimaryButton>
      </div>
    </div>
  );
}
