import { Check, Pencil, Trash2 } from "lucide-react";

import type { SavedAddress } from "@/features/address/types";

interface SavedAddressListProps {
  addresses: SavedAddress[];
  /** 현재 선택된 배송지 id (배송지 선택 용도) */
  selectedId?: string | null;
  onSelect?: (address: SavedAddress) => void;
  onEdit?: (address: SavedAddress) => void;
  onRemove?: (address: SavedAddress) => void;
  onSetDefault?: (address: SavedAddress) => void;
}

export function SavedAddressList({
  addresses,
  selectedId,
  onSelect,
  onEdit,
  onRemove,
  onSetDefault,
}: SavedAddressListProps) {
  return (
    <ul className="space-y-3">
      {addresses.map((address) => {
        const isSelected = selectedId === address.id;

        return (
          <li
            key={address.id}
            className={[
              "border bg-[var(--surface-base)] px-4 py-4 transition",
              isSelected
                ? "border-[var(--brand-primary)]"
                : "border-[var(--border-ink-8)]",
            ].join(" ")}
          >
            <button
              className="block w-full text-left"
              disabled={!onSelect}
              onClick={() => onSelect?.(address)}
              type="button"
            >
              <div className="flex items-center gap-2">
                <span className="text-[0.95rem] font-bold text-[var(--text-cafe-ink)]">
                  {address.label}
                </span>
                {address.isDefault ? (
                  <span className="bg-[var(--surface-chalkboard)] px-2 py-0.5 text-[0.7rem] font-semibold text-[var(--text-chalk)]">
                    기본 배송지
                  </span>
                ) : null}
                {isSelected ? (
                  <Check className="ml-auto size-4 text-[var(--brand-primary)]" />
                ) : null}
              </div>
              <p className="mt-2 text-[0.92rem] text-[var(--text-cafe-ink)]">
                {address.recipientName} · {address.phone}
              </p>
              <p className="mt-1 text-[0.9rem] leading-6 text-[var(--text-muted-subtle)]">
                {address.postalCode ? `(${address.postalCode}) ` : ""}
                {address.address} {address.detailAddress}
              </p>
            </button>

            {(onEdit || onRemove || onSetDefault) && (
              <div className="mt-3 flex items-center gap-3 border-t border-[var(--border-tile-grout)] pt-3 text-[0.85rem]">
                {onSetDefault && !address.isDefault ? (
                  <button
                    className="text-[var(--text-muted)]"
                    onClick={() => onSetDefault(address)}
                    type="button"
                  >
                    기본으로 설정
                  </button>
                ) : null}
                {onEdit ? (
                  <button
                    className="ml-auto flex items-center gap-1 text-[var(--text-muted)]"
                    onClick={() => onEdit(address)}
                    type="button"
                  >
                    <Pencil className="size-3.5" /> 수정
                  </button>
                ) : null}
                {onRemove ? (
                  <button
                    className="flex items-center gap-1 text-[var(--text-danger,#d14343)]"
                    onClick={() => onRemove(address)}
                    type="button"
                  >
                    <Trash2 className="size-3.5" /> 삭제
                  </button>
                ) : null}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
