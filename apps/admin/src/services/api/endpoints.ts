export const endpoints = {
  auth: {
    login: "/api/members/login",
    logout: "/api/members/logout",
    refresh: "/api/members/refresh",
    me: "/api/members/me",
  },
  admin: {
    members: "/api/admin/members",
    member: (memberId: number | string) => `/api/admin/members/${memberId}`,
    memberGrade: (memberId: number | string) =>
      `/api/admin/members/${memberId}/grade`,
    board: (boardId: number | string) => `/api/admin/boards/${boardId}`,
    orders: "/api/admin/orders",
    order: (orderNumber: string) => `/api/admin/orders/${orderNumber}`,
    orderStatus: (orderNumber: string) =>
      `/api/admin/orders/${orderNumber}/status`,
    dashboardSummary: "/api/admin/dashboard/summary",
    dashboardSalesChart: "/api/admin/dashboard/sales-chart",
    dashboardRecentLists: "/api/admin/dashboard/recent-lists",
  },
  categories: {
    list: "/api/categories",
    create: "/api/categories",
    remove: (categoryId: number | string) => `/api/categories/${categoryId}`,
  },
  products: {
    list: "/api/products",
    detail: (productId: number | string) => `/api/products/${productId}`,
    create: "/api/products",
    update: (productId: number | string) => `/api/products/${productId}`,
    remove: (productId: number | string) => `/api/products/${productId}`,
    image: (productId: number | string) => `/api/products/${productId}/image`,
    options: (productId: number | string) => `/api/products/${productId}/options`,
    option: (productId: number | string, optionId: number | string) =>
      `/api/products/${productId}/options/${optionId}`,
  },
  upload: "/api/upload",
} as const;
