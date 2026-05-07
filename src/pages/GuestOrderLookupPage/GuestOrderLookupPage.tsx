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
    <div className="bg-[var(--palette-f7f5f0)] px-5 pb-10 pt-8">
      <section className="rounded-[1.5rem] bg-white px-5 py-7 shadow-[0_8px_24px_var(--rgba-34-34-34-006)]">
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
        className="mt-6 flex h-12 items-center justify-center rounded-[0.95rem] bg-white text-sm font-semibold text-[var(--second-color)]"
        to={ROUTES.products}
      >
        쇼핑 계속하기
      </Link>
    </div>
  );
}
