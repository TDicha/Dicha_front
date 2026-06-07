import { X } from "lucide-react";
import { createPortal } from "react-dom";

import { AddressForm } from "@/features/address/components/AddressForm";
import type { AddressDraft, SavedAddress } from "@/features/address/types";

interface AddressFormModalProps {
  open: boolean;
  title?: string;
  initialValue?: SavedAddress;
  onSubmit: (draft: AddressDraft) => void;
  onClose: () => void;
}

export function AddressFormModal({
  open,
  title,
  initialValue,
  onSubmit,
  onClose,
}: AddressFormModalProps) {
  if (!open || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-[var(--overlay-black-28)] sm:items-center sm:px-[var(--page-x)]">
      <button
        aria-label="배송지 입력 닫기"
        className="absolute inset-0 h-full w-full"
        onClick={onClose}
        type="button"
      />
      <section
        aria-modal="true"
        className="relative max-h-[90vh] w-full max-w-[26rem] overflow-y-auto rounded-t-[var(--radius-card)] bg-[var(--surface-base)] px-5 pb-6 pt-4 shadow-[var(--shadow-bottom-sheet)] sm:rounded-[var(--radius-card)]"
        role="dialog"
      >
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="font-semibold text-[var(--text-title)]">
            {title ?? (initialValue ? "배송지 수정" : "배송지 추가")}
          </h2>
          <button
            aria-label="배송지 입력 닫기"
            className="flex size-8 items-center justify-center rounded-full text-[var(--text-muted)]"
            onClick={onClose}
            type="button"
          >
            <X className="size-4" />
          </button>
        </div>
        <AddressForm
          initialValue={initialValue}
          onCancel={onClose}
          onSubmit={onSubmit}
          submitLabel={initialValue ? "수정 완료" : "저장"}
        />
      </section>
    </div>,
    document.body,
  );
}
