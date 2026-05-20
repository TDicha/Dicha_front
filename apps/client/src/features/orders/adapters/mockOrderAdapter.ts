import type {
  CreateOrderPayload,
  GuestOrderLookupPayload,
  Order,
  OrderRepository,
} from "@/features/orders/types";

const createdOrders: Order[] = [];

function createOrderNo() {
  const now = new Date();
  const date = now.toISOString().slice(0, 10).replace(/-/g, "");
  const suffix = String(createdOrders.length + 1).padStart(4, "0");

  return `DICHA-${date}-${suffix}`;
}

export const mockOrderAdapter: OrderRepository = {
  async list() {
    return createdOrders;
  },
  async createOrder(payload: CreateOrderPayload) {
    const orderId = crypto.randomUUID();
    const order: Order = {
      id: orderId,
      orderNo: createOrderNo(),
      userId: payload.ordererType === "member" ? payload.userId : undefined,
      guestPhone: payload.ordererType === "guest" ? payload.guestOrderer.phone : undefined,
      status: "payment_completed",
      subtotal: payload.pricing.subtotal,
      shippingFee: payload.pricing.shippingFee,
      discountAmount: payload.pricing.couponDiscount,
      totalAmount: payload.pricing.total,
      addressSnapshot: payload.addressSnapshot,
      paymentMethod: payload.paymentMethod,
      paymentStatus: "mock_paid",
      orderedAt: new Date().toISOString(),
      items: payload.items.map((item, index) => ({
        ...item,
        id: `${orderId}-item-${index + 1}`,
        orderId,
      })),
    };

    createdOrders.unshift(order);

    return order;
  },
  async lookupGuestOrder(payload: GuestOrderLookupPayload) {
    return (
      createdOrders.find(
        (order) => order.orderNo === payload.orderNo && order.guestPhone === payload.phone,
      ) ?? null
    );
  },
};
