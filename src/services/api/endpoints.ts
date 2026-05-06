export const endpoints = {
  auth: {
    session: "/api/auth/session",
    login: "/api/auth/login",
    signup: "/api/auth/signup",
    logout: "/api/auth/logout",
    refresh: "/api/auth/refresh",
    csrf: "/api/auth/csrf",
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
