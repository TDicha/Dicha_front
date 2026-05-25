import { useState } from "react";
import { Link } from "react-router-dom";

import {
  GuestOrderLookupForm,
  GuestOrderLookupResult,
  useLookupGuestOrder,
} from "@/features/orders";
import { ROUTES } from "@/shared/constants/routes";

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

  const canLookup = Boolean(orderNo.trim() && phone.trim() && orderPassword.trim());
  const order = lookupGuestOrder.data;

  return (
    <div className="bg-[var(--surface-page)] px-[var(--page-x)] pb-10 pt-8">
      <section className="rounded-[var(--radius-card)] bg-[var(--surface-base)] px-5 py-7 shadow-[0_8px_24px_var(--shadow-neutral-alpha-6)]">
        <GuestOrderLookupForm
          canLookup={canLookup}
          isPending={lookupGuestOrder.isPending}
          onChangeOrderNo={setOrderNo}
          onChangeOrderPassword={setOrderPassword}
          onChangePhone={setPhone}
          onLookup={handleLookup}
          orderNo={orderNo}
          orderPassword={orderPassword}
          phone={phone}
        />
        <GuestOrderLookupResult isSuccess={lookupGuestOrder.isSuccess} order={order} />
      </section>

      <Link
        className="mt-6 flex h-12 items-center justify-center rounded-[0.95rem] bg-[var(--surface-base)] text-sm font-semibold text-[var(--brand-secondary)]"
        to={ROUTES.products}
      >
        쇼핑 계속하기
      </Link>
    </div>
  );
}
