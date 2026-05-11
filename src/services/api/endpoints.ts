export const endpoints = {
  auth: {
    session: "/api/members/me",
    login: "/api/members/login",
    signup: "/api/members/signup",
  },
  products: {
    list: "/api/products",
    detail: (productId: string) => `/api/products/${productId}`,
  },
  orders: {
    list: "/api/orders",
    create: "/api/orders",
    detail: (orderId: string) => `/api/orders/${orderId}`,
    guestLookup: "/api/guest-orders/lookup",
  },
  addresses: {
    list: "/api/addresses",
  },
  payments: {
    create: "/api/payments",
    confirm: "/api/payments/confirm",
  },
  subscriptions: {
    list: "/api/subscriptions",
  },
  qr: {
    resolve: "/api/qr/resolve",
  },
} as const;
