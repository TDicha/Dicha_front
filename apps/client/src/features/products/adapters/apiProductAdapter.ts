import { apiClient } from "@/services/api/client";
import { endpoints } from "@/services/api/endpoints";
import { resolveApiMediaUrl } from "@/services/api/media";
import type {
  Product,
  ProductBadge,
  ProductCategory,
  ProductOption,
  ProductType,
} from "@/shared/types/models";

import type { ProductListParams, ProductRepository } from "../types";

interface ApiCategory {
  id?: number | string;
  name?: string;
  slug?: string;
  displayOrder?: number;
}

interface ApiProductOption {
  id?: number | string;
  name?: string;
  optionName?: string;
  description?: string;
  extraPrice?: number;
}

export interface ApiProduct {
  id?: number | string;
  productType?: string;
  type?: string;
  name?: string;
  subtitle?: string;
  description?: string;
  price?: number;
  image?: string | null;
  imageUrl?: string | null;
  thumbnailUrl?: string | null;
  badges?: string[];
  badgeList?: string[];
  category?: ApiCategory | string;
  categoryId?: number | string;
  categoryName?: string;
  categorySlug?: string;
  origin?: string | null;
  originLabel?: string;
  roastLabel?: string;
  roastLevel?: string;
  rating?: number;
  reviewCount?: number;
  notes?: string[];
  flavorNotes?: string[];
  options?: ApiProductOption[];
}

const fallbackProductImage =
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80";

function normalizeRoastLevel(roastLevel?: string): Product["roastLevel"] {
  const normalized = roastLevel?.toUpperCase();

  if (normalized === "LIGHT") return "Light";
  if (normalized === "DARK") return "Dark";

  return "Medium";
}

function toRoastLabel(roastLevel?: string) {
  const normalized = normalizeRoastLevel(roastLevel);

  if (normalized === "Light") return "라이트";
  if (normalized === "Dark") return "다크";

  return "미디엄";
}

function normalizeBadges(badges?: string[]): ProductBadge[] {
  return (badges ?? []).flatMap((badge) => {
    const normalized = badge.toUpperCase();

    if (
      normalized === "BEST" ||
      normalized === "NEW" ||
      normalized === "PICK"
    ) {
      return [normalized];
    }

    return [];
  });
}

function normalizeProductType(productType?: string): ProductType {
  const normalized = productType?.toLowerCase().replaceAll("_", "-");

  if (normalized === "drip-bag" || normalized === "dripbag") return "drip-bag";
  if (normalized === "gift-set" || normalized === "giftset") return "gift-set";

  return "beans";
}

function getCategoryValue(product: ApiProduct) {
  if (typeof product.category === "string") {
    return {
      id: product.categoryId ?? product.category,
      label: product.categoryName ?? product.category,
      slug: product.categorySlug ?? product.category,
    };
  }

  const category = product.category;

  return {
    id:
      product.categoryId ??
      category?.id ??
      product.categorySlug ??
      "uncategorized",
    label: product.categoryName ?? category?.name ?? "카테고리",
    slug:
      product.categorySlug ??
      category?.slug ??
      String(product.categoryId ?? category?.id ?? "uncategorized"),
  };
}

function toProductOption(option: ApiProductOption): ProductOption {
  return {
    id: String(option.id ?? option.name ?? option.optionName ?? "default"),
    name: option.name ?? option.optionName ?? "기본 옵션",
    description: option.description,
    extraPrice: option.extraPrice ?? 0,
  };
}

export function toProduct(product: ApiProduct): Product {
  const category = getCategoryValue(product);
  const notes = product.notes ?? product.flavorNotes ?? [];
  const description = product.description ?? "";

  return {
    id: String(product.id ?? ""),
    productType: normalizeProductType(product.productType ?? product.type),
    name: product.name ?? "상품명 없음",
    subtitle: product.subtitle ?? description,
    description,
    price: product.price ?? 0,
    image:
      resolveApiMediaUrl(
        product.imageUrl ?? product.thumbnailUrl ?? product.image,
      ) ?? fallbackProductImage,
    badges: normalizeBadges(product.badges ?? product.badgeList),
    category: String(category.id),
    categoryLabel: category.label,
    originLabel: product.originLabel ?? product.origin ?? undefined,
    roastLabel: product.roastLabel ?? toRoastLabel(product.roastLevel),
    roastLevel: normalizeRoastLevel(product.roastLevel),
    rating: product.rating,
    reviewCount: product.reviewCount,
    notes,
    options: (product.options ?? []).map(toProductOption),
  };
}

function toProductCategory(category: ApiCategory): ProductCategory {
  const id = String(category.id ?? category.slug ?? category.name ?? "");

  return {
    id,
    name: category.name ?? category.slug ?? "카테고리",
    slug: category.slug ?? id,
    displayOrder: category.displayOrder ?? 0,
  };
}

export const apiProductAdapter: ProductRepository = {
  async listCategories() {
    const { data } = await apiClient.get<ApiCategory[]>(
      endpoints.categories.list,
    );

    return data.map(toProductCategory);
  },
  async list(params?: ProductListParams) {
    const { data } = await apiClient.get<ApiProduct[]>(
      endpoints.products.list,
      {
        params: {
          categoryId: params?.categoryId,
          keyword: params?.query,
        },
      },
    );

    return data.map(toProduct);
  },
  async getById(productId: string) {
    const { data } = await apiClient.get<ApiProduct>(
      endpoints.products.detail(productId),
    );

    return toProduct(data);
  },
};
