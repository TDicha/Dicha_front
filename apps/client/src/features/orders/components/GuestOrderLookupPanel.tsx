import { useState } from "react";

import { GuestOrderLookupForm } from "@/features/orders/components/GuestOrderLookupForm";
import { GuestOrderLookupResult } from "@/features/orders/components/GuestOrderLookupResult";
import { useLookupGuestOrder } from "@/features/orders/hooks/useOrders";

interface GuestOrderLookupPanelProps {
  initialOrderNo?: string;
  initialPhone?: string;
}

export function GuestOrderLookupPanel({
  initialOrderNo = "",
  initialPhone = "",
}: GuestOrderLookupPanelProps) {
  const lookupGuestOrder = useLookupGuestOrder();
  const [orderNo, setOrderNo] = useState(initialOrderNo);
  const [phone, setPhone] = useState(initialPhone);
  const [orderPassword, setOrderPassword] = useState("");

  function handleLookup() {
    lookupGuestOrder.mutate({
      orderNo: orderNo.trim(),
      phone: phone.trim(),
      orderPassword,
    });
  }

  const canLookup = Boolean(
    orderNo.trim() && phone.trim() && orderPassword.trim(),
  );
  const order = lookupGuestOrder.data;

  return (
    <div>
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
      <GuestOrderLookupResult
        isSuccess={lookupGuestOrder.isSuccess}
        order={order}
      />
    </div>
  );
}
