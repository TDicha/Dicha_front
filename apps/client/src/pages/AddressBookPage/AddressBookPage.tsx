import { MapPinPlus } from "lucide-react";
import { useState } from "react";

import { EmptyState } from "@/components/common/EmptyState";
import { LoadingScreen } from "@/components/common/LoadingScreen";
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
    isError,
    isLoading,
    isPending,
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

  function handleSubmit(draft: Parameters<typeof addAddress>[0]) {
    void (async () => {
      if (editing) {
        await updateAddress(editing.id, draft);
      } else {
        await addAddress(draft);
      }
      setFormOpen(false);
    })();
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
        <PrimaryButton className="gap-2" disabled={isPending} onClick={openAdd}>
          <MapPinPlus className="size-4" />
          추가
        </PrimaryButton>
      </header>

      {isLoading ? (
        <LoadingScreen
          className="min-h-[12rem]"
          message="배송지를 불러오는 중"
        />
      ) : isError ? (
        <p className="text-center text-sm text-[var(--state-danger)]">
          배송지를 불러오지 못했어요.
        </p>
      ) : addresses.length === 0 ? (
        <EmptyState
          description="자주 쓰는 배송지를 등록하면 주문이 더 빨라져요."
          title="등록된 배송지가 없어요"
          variant="menu-board"
        />
      ) : (
        <SavedAddressList
          addresses={addresses}
          onEdit={openEdit}
          onRemove={(address) => void removeAddress(address.id)}
          onSetDefault={(address) => void setDefaultAddress(address.id)}
        />
      )}

      <AddressFormModal
        initialValue={editing}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSubmit}
        open={formOpen}
      />
    </div>
  );
}
