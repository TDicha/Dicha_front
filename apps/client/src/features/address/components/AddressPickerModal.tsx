import { Plus, X } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";

import { PrimaryButton } from "@/components/common/PrimaryButton";
import { AddressForm } from "@/features/address/components/AddressForm";
import { SavedAddressList } from "@/features/address/components/SavedAddressList";
import type { SavedAddress } from "@/features/address/types";
import { useAddresses } from "@/features/address/useAddresses";

interface AddressPickerModalProps {
  open: boolean;
  selectedId?: string | null;
  onSelect: (address: SavedAddress) => void;
  onClose: () => void;
}

type View = "list" | "form";

export function AddressPickerModal({
  open,
  selectedId,
  onSelect,
  onClose,
}: AddressPickerModalProps) {
  const {
    addresses,
    addAddress,
    updateAddress,
    removeAddress,
    setDefaultAddress,
  } = useAddresses();
  const [view, setView] = useState<View>("list");
  const [editing, setEditing] = useState<SavedAddress | undefined>(undefined);

  if (!open || typeof document === "undefined") {
    return null;
  }

  function openAddForm() {
    setEditing(undefined);
    setView("form");
  }

  function openEditForm(address: SavedAddress) {
    setEditing(address);
    setView("form");
  }

  async function handleSubmit(draft: Parameters<typeof addAddress>[0]) {
    if (editing) {
      await updateAddress(editing.id, draft);
      setView("list");
      return;
    }

    const created = await addAddress(draft);
    // 새로 추가한 배송지를 바로 선택해 주문에 사용한다.
    onSelect(created);
    onClose();
  }

  // 저장된 배송지가 없으면 곧바로 입력 폼을 보여준다.
  const showForm = view === "form" || addresses.length === 0;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-[var(--overlay-black-28)] sm:items-center sm:px-[var(--page-x)]">
      <button
        aria-label="배송지 선택 닫기"
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
            {view === "form"
              ? editing
                ? "배송지 수정"
                : "배송지 추가"
              : "배송지 선택"}
          </h2>
          <button
            aria-label="배송지 선택 닫기"
            className="flex size-8 items-center justify-center rounded-full text-[var(--text-muted)]"
            onClick={onClose}
            type="button"
          >
            <X className="size-4" />
          </button>
        </div>

        {showForm ? (
          <AddressForm
            initialValue={editing}
            onCancel={
              addresses.length === 0 ? undefined : () => setView("list")
            }
            onSubmit={(draft) => void handleSubmit(draft)}
            submitLabel={editing ? "수정 완료" : "저장하고 선택"}
          />
        ) : (
          <div className="space-y-4">
            <SavedAddressList
              addresses={addresses}
              onEdit={openEditForm}
              onRemove={(address) => void removeAddress(address.id)}
              onSelect={(address) => {
                onSelect(address);
                onClose();
              }}
              onSetDefault={(address) => void setDefaultAddress(address.id)}
              selectedId={selectedId}
            />
            <PrimaryButton
              className="w-full gap-2 bg-[var(--surface-cafe-tile)] text-[var(--text-cafe-ink)] shadow-none"
              onClick={openAddForm}
              type="button"
            >
              <Plus className="size-4" />
              새 배송지 추가
            </PrimaryButton>
          </div>
        )}
      </section>
    </div>,
    document.body,
  );
}
