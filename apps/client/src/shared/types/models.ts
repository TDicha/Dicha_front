export type ProductBadge = "BEST" | "NEW" | "PICK";
export type ProductType = "beans" | "drip-bag" | "gift-set";

export interface ProductOption {
  id: string;
  name: string;
  description?: string;
  extraPrice?: number;
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  displayOrder: number;
}

export interface Product {
  id: string;
  productType: ProductType;
  name: string;
  subtitle: string;
  description: string;
  price: number;
  image: string;
  badges: ProductBadge[];
  category: string;
  categoryLabel?: string;
  originLabel?: string;
  roastLabel?: string;
  roastLevel: "Light" | "Medium" | "Dark";
  rating?: number;
  reviewCount?: number;
  notes: string[];
  options: ProductOption[];
}

export interface Order {
  id: string;
  productName: string;
  status: "preparing" | "shipping" | "completed";
  orderedAt: string;
  amount: number;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  content: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  tier: string;
  favoriteFlavor: string;
  totalSpent?: number;
  tasteAcidity?: number;
  tasteBody?: number;
  tasteSweetness?: number;
  tastePrimaryFlavorNote?: string;
}
