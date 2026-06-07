import { MapPinPlus } from "lucide-react";
import { useState } from "react";

import { EmptyState } from "@/components/common/EmptyState";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import {
  AddressFormModal,
  SavedAddressList,
  useAddresses,
  type SavedAddress,
} from "@/features/address";

export function AddressBookPage() {
  const {
    addresses,
    addAddress,
    updateAddress,
    removeAddress,
    setDefaultAddress,
  } = useAddresses();

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<SavedAddress | undefined>(undefined);

  function openAdd() {
    setEditing(undefined);
    setFormOpen(true);
  }

  function openEdit(address: SavedAddress) {
    setEditing(address);
    setFormOpen(true);
  }

  return (
    <div className="page-content space-y-5 bg-[var(--surface-base)] px-[var(--page-x)] pb-10 pt-4">
      <header className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-[var(--text-muted)]">
            Address Book
          </p>
          <h1 className="mt-1 font-heading text-xl font-semibold text-[var(--text-cafe-ink)]">
            배송지 관리
          </h1>
        </div>
        <PrimaryButton className="gap-2" onClick={openAdd}>
          <MapPinPlus className="size-4" />
          추가
        </PrimaryButton>
      </header>

      {addresses.length === 0 ? (
        <EmptyState
          description="자주 쓰는 배송지를 등록하면 주문이 더 빨라져요."
          title="등록된 배송지가 없어요"
          variant="menu-board"
        />
      ) : (
        <SavedAddressList
          addresses={addresses}
          onEdit={openEdit}
          onRemove={(address) => removeAddress(address.id)}
          onSetDefault={(address) => setDefaultAddress(address.id)}
        />
      )}

      <AddressFormModal
        initialValue={editing}
        onClose={() => setFormOpen(false)}
        onSubmit={(draft) => {
          if (editing) {
            updateAddress(editing.id, draft);
          } else {
            addAddress(draft);
          }
          setFormOpen(false);
        }}
        open={formOpen}
      />
    </div>
  );
}
