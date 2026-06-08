import { useState } from "react";

import { GuestOrderLookupForm } from "@/features/orders/components/GuestOrderLookupForm";
import { GuestOrderLookupResult } from "@/features/orders/components/GuestOrderLookupResult";
import {
  useCancelGuestOrder,
  useLookupGuestOrder,
} from "@/features/orders/hooks/useOrders";

interface GuestOrderLookupPanelProps {
  initialOrderNo?: string;
  initialPhone?: string;
}

export function GuestOrderLookupPanel({
  initialOrderNo = "",
  initialPhone = "",
}: GuestOrderLookupPanelProps) {
  const lookupGuestOrder = useLookupGuestOrder();
  const cancelGuestOrder = useCancelGuestOrder();
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

  async function handleCancel() {
    const shouldCancel = window.confirm(`${orderNo} 주문을 취소할까요?`);

    if (!shouldCancel) {
      return;
    }

    await cancelGuestOrder.mutateAsync({
      orderNo: orderNo.trim(),
      orderPassword,
    });
  }

  const canLookup = Boolean(
    orderNo.trim() && phone.trim() && orderPassword.trim(),
  );
  const order = cancelGuestOrder.data ?? lookupGuestOrder.data;

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
        isCanceling={cancelGuestOrder.isPending}
        isSuccess={lookupGuestOrder.isSuccess}
        onCancel={handleCancel}
        order={order}
      />
    </div>
  );
}
