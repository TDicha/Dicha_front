import { useEffect, useMemo, useState } from "react";

import {
  createCategory,
  createProduct,
  deleteCategory,
  deleteProduct,
  fetchCategories,
  fetchProducts,
  updateProduct,
  type AdminCategory,
  type AdminProduct,
  type AdminProductPayload,
} from "@/services/api/adminApi";

const priceFormatter = new Intl.NumberFormat("ko-KR");

interface ProductFormState {
  name: string;
  subtitle: string;
  description: string;
  price: string;
  imageUrl: string;
  origin: string;
  roastLevel: "LIGHT" | "MEDIUM" | "DARK";
  categoryId: string;
  onSale: boolean;
  stockQuantity: string;
  flavorNotes: string;
  badges: string;
  optionName: string;
  optionDescription: string;
  optionExtraPrice: string;
}

interface CategoryFormState {
  name: string;
  slug: string;
  displayOrder: string;
}

const emptyProductForm: ProductFormState = {
  name: "",
  subtitle: "",
  description: "",
  price: "",
  imageUrl: "",
  origin: "",
  roastLevel: "MEDIUM",
  categoryId: "",
  onSale: true,
  stockQuantity: "",
  flavorNotes: "",
  badges: "",
  optionName: "기본",
  optionDescription: "",
  optionExtraPrice: "0",
};

const emptyCategoryForm: CategoryFormState = {
  name: "",
  slug: "",
  displayOrder: "",
};

function formatPrice(price: number) {
  return `${priceFormatter.format(price)}원`;
}

function toCsvList(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function toOptionalNumber(value: string) {
  if (!value.trim()) {
    return undefined;
  }

  return Number(value);
}

function getCategoryName(
  product: AdminProduct,
  categoriesById: Map<number, AdminCategory>,
) {
  if (product.categoryName) {
    return product.categoryName;
  }

  if (product.categoryId) {
    return categoriesById.get(product.categoryId)?.name ?? `#${product.categoryId}`;
  }

  return "미분류";
}

function sortCategories(categories: AdminCategory[]) {
  return [...categories].sort((first, second) => {
    const firstOrder = first.displayOrder ?? 0;
    const secondOrder = second.displayOrder ?? 0;

    if (firstOrder !== secondOrder) {
      return firstOrder - secondOrder;
    }

    return first.id - second.id;
  });
}

function toProductForm(product: AdminProduct): ProductFormState {
  const firstOption = product.options?.[0];

  return {
    name: product.name,
    subtitle: product.subtitle ?? "",
    description: product.description ?? "",
    price: String(product.price),
    imageUrl: product.imageUrl ?? "",
    origin: product.origin ?? "",
    roastLevel: product.roastLevel ?? "MEDIUM",
    categoryId: product.categoryId ? String(product.categoryId) : "",
    onSale: product.onSale !== false,
    stockQuantity:
      product.stockQuantity === null || product.stockQuantity === undefined
        ? ""
        : String(product.stockQuantity),
    flavorNotes: product.flavorNotes?.join(", ") ?? "",
    badges: product.badges?.join(", ") ?? "",
    optionName: firstOption?.name ?? "기본",
    optionDescription: firstOption?.description ?? "",
    optionExtraPrice: String(firstOption?.extraPrice ?? 0),
  };
}

function toProductPayload(form: ProductFormState): AdminProductPayload {
  const categoryId = toOptionalNumber(form.categoryId);
  const stockQuantity = toOptionalNumber(form.stockQuantity);

  return {
    name: form.name.trim(),
    subtitle: form.subtitle.trim() || undefined,
    description: form.description.trim() || undefined,
    price: Number(form.price),
    imageUrl: form.imageUrl.trim() || undefined,
    origin: form.origin.trim() || undefined,
    roastLevel: form.roastLevel,
    categoryId,
    onSale: form.onSale,
    stockQuantity,
    flavorNotes: toCsvList(form.flavorNotes),
    badges: toCsvList(form.badges),
    options: form.optionName.trim()
      ? [
          {
            name: form.optionName.trim(),
            description: form.optionDescription.trim() || undefined,
            extraPrice: Number(form.optionExtraPrice || 0),
          },
        ]
      : [],
  };
}

export function ProductsPage() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [productForm, setProductForm] =
    useState<ProductFormState>(emptyProductForm);
  const [categoryForm, setCategoryForm] =
    useState<CategoryFormState>(emptyCategoryForm);
  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingProduct, setIsSavingProduct] = useState(false);
  const [isSavingCategory, setIsSavingCategory] = useState(false);
  const [deletingProductId, setDeletingProductId] = useState<number | null>(null);
  const [deletingCategoryId, setDeletingCategoryId] = useState<number | null>(null);
  const [error, setError] = useState("");

  const categoriesById = useMemo(
    () => new Map(categories.map((category) => [category.id, category])),
    [categories],
  );

  async function loadProducts() {
    setIsLoading(true);
    setError("");

    const [categoriesResult, productsResult] = await Promise.allSettled([
      fetchCategories(),
      fetchProducts(),
    ]);

    if (categoriesResult.status === "fulfilled") {
      setCategories(sortCategories(categoriesResult.value));
    }

    if (productsResult.status === "fulfilled") {
      setProducts(productsResult.value);
    }

    if (categoriesResult.status === "rejected" || productsResult.status === "rejected") {
      const loadError =
        categoriesResult.status === "rejected"
          ? categoriesResult.reason
          : productsResult.status === "rejected"
            ? productsResult.reason
            : null;
      setError(
        loadError instanceof Error
          ? loadError.message
          : "상품 목록을 불러오지 못했습니다.",
      );
    }

    setIsLoading(false);
  }

  async function handleSaveProduct() {
    if (!productForm.name.trim() || !productForm.price.trim()) {
      setError("상품명과 가격은 필수입니다.");
      return;
    }

    setIsSavingProduct(true);
    setError("");

    try {
      const payload = toProductPayload(productForm);

      if (editingProductId) {
        await updateProduct(editingProductId, payload);
      } else {
        await createProduct(payload);
      }

      setProductForm(emptyProductForm);
      setEditingProductId(null);
      await loadProducts();
    } catch (saveError) {
      setError(
        saveError instanceof Error
          ? saveError.message
          : "상품 저장에 실패했습니다.",
      );
    } finally {
      setIsSavingProduct(false);
    }
  }

  async function handleDeleteProduct(product: AdminProduct) {
    const shouldDelete = window.confirm(`${product.name} 상품을 삭제할까요?`);

    if (!shouldDelete) {
      return;
    }

    setDeletingProductId(product.id);
    setError("");

    try {
      await deleteProduct(product.id);
      await loadProducts();
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "상품 삭제에 실패했습니다.",
      );
    } finally {
      setDeletingProductId(null);
    }
  }

  async function handleSaveCategory() {
    if (!categoryForm.name.trim() || !categoryForm.slug.trim()) {
      setError("카테고리명과 slug는 필수입니다.");
      return;
    }

    setIsSavingCategory(true);
    setError("");

    try {
      const createdCategory = await createCategory({
        name: categoryForm.name.trim(),
        slug: categoryForm.slug.trim(),
        displayOrder: toOptionalNumber(categoryForm.displayOrder),
      });

      setCategories((currentCategories) =>
        sortCategories([
          ...currentCategories.filter(
            (category) => category.id !== createdCategory.id,
          ),
          createdCategory,
        ]),
      );
      setCategoryForm(emptyCategoryForm);
      await loadProducts();
    } catch (saveError) {
      setError(
        saveError instanceof Error
          ? saveError.message
          : "카테고리 저장에 실패했습니다.",
      );
    } finally {
      setIsSavingCategory(false);
    }
  }

  async function handleDeleteCategory(category: AdminCategory) {
    const shouldDelete = window.confirm(`${category.name} 카테고리를 삭제할까요?`);

    if (!shouldDelete) {
      return;
    }

    setDeletingCategoryId(category.id);
    setError("");

    try {
      await deleteCategory(category.id);
      await loadProducts();
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "카테고리 삭제에 실패했습니다.",
      );
    } finally {
      setDeletingCategoryId(null);
    }
  }

  useEffect(() => {
    void loadProducts();
  }, []);

  return (
    <div className="page-stack">
      <section className="metric-grid product-summary-grid">
        <article className="admin-card metric-card">
          <span>전체 상품</span>
          <strong>{products.length}개</strong>
          <small className="positive">판매 중인 상품</small>
        </article>
        <article className="admin-card metric-card">
          <span>카테고리</span>
          <strong>{categories.length}개</strong>
          <small>등록된 분류</small>
        </article>
      </section>

      <section className="admin-card">
        <div className="section-heading">
          <div>
            <h2>{editingProductId ? "상품 수정" : "상품 등록"}</h2>
            <p className="section-description">상품 정보를 입력하고 저장합니다.</p>
          </div>
          {editingProductId ? (
            <button
              onClick={() => {
                setEditingProductId(null);
                setProductForm(emptyProductForm);
              }}
              type="button"
            >
              신규 등록으로 전환
            </button>
          ) : null}
        </div>

        <div className="admin-form-grid">
          <label className="field">
            <span>상품명 *</span>
            <input
              onChange={(event) =>
                setProductForm((current) => ({
                  ...current,
                  name: event.target.value,
                }))
              }
              placeholder="에티오피아 예가체프"
              value={productForm.name}
            />
          </label>
          <label className="field">
            <span>가격 *</span>
            <input
              inputMode="numeric"
              onChange={(event) =>
                setProductForm((current) => ({
                  ...current,
                  price: event.target.value,
                }))
              }
              placeholder="18000"
              value={productForm.price}
            />
          </label>
          <label className="field">
            <span>카테고리</span>
            <select
              onChange={(event) =>
                setProductForm((current) => ({
                  ...current,
                  categoryId: event.target.value,
                }))
              }
              value={productForm.categoryId}
            >
              <option value="">미분류</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>로스팅</span>
            <select
              onChange={(event) =>
                setProductForm((current) => ({
                  ...current,
                  roastLevel: event.target.value as ProductFormState["roastLevel"],
                }))
              }
              value={productForm.roastLevel}
            >
              <option value="LIGHT">LIGHT</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="DARK">DARK</option>
            </select>
          </label>
          <label className="field">
            <span>부제목</span>
            <input
              onChange={(event) =>
                setProductForm((current) => ({
                  ...current,
                  subtitle: event.target.value,
                }))
              }
              placeholder="플로럴한 향의 싱글 오리진"
              value={productForm.subtitle}
            />
          </label>
          <label className="field">
            <span>원산지</span>
            <input
              onChange={(event) =>
                setProductForm((current) => ({
                  ...current,
                  origin: event.target.value,
                }))
              }
              placeholder="에티오피아"
              value={productForm.origin}
            />
          </label>
          <label className="field">
            <span>이미지 URL</span>
            <input
              onChange={(event) =>
                setProductForm((current) => ({
                  ...current,
                  imageUrl: event.target.value,
                }))
              }
              placeholder="/uploads/products/example.jpg 또는 https://..."
              value={productForm.imageUrl}
            />
          </label>
          <label className="field">
            <span>재고 수량</span>
            <input
              inputMode="numeric"
              onChange={(event) =>
                setProductForm((current) => ({
                  ...current,
                  stockQuantity: event.target.value,
                }))
              }
              placeholder="비우면 무제한"
              value={productForm.stockQuantity}
            />
          </label>
          <label className="field span-2">
            <span>상세 설명</span>
            <textarea
              onChange={(event) =>
                setProductForm((current) => ({
                  ...current,
                  description: event.target.value,
                }))
              }
              placeholder="상품 상세 설명을 입력하세요."
              value={productForm.description}
            />
          </label>
          <label className="field">
            <span>향미 노트</span>
            <input
              onChange={(event) =>
                setProductForm((current) => ({
                  ...current,
                  flavorNotes: event.target.value,
                }))
              }
              placeholder="자스민, 복숭아, 레몬"
              value={productForm.flavorNotes}
            />
          </label>
          <label className="field">
            <span>뱃지</span>
            <input
              onChange={(event) =>
                setProductForm((current) => ({
                  ...current,
                  badges: event.target.value,
                }))
              }
              placeholder="BEST, NEW, PICK"
              value={productForm.badges}
            />
          </label>
          <label className="field">
            <span>옵션명</span>
            <input
              onChange={(event) =>
                setProductForm((current) => ({
                  ...current,
                  optionName: event.target.value,
                }))
              }
              placeholder="200g"
              value={productForm.optionName}
            />
          </label>
          <label className="field">
            <span>옵션 추가금</span>
            <input
              inputMode="numeric"
              onChange={(event) =>
                setProductForm((current) => ({
                  ...current,
                  optionExtraPrice: event.target.value,
                }))
              }
              placeholder="0"
              value={productForm.optionExtraPrice}
            />
          </label>
          <label className="field span-2">
            <span>옵션 설명</span>
            <input
              onChange={(event) =>
                setProductForm((current) => ({
                  ...current,
                  optionDescription: event.target.value,
                }))
              }
              placeholder="기본 용량"
              value={productForm.optionDescription}
            />
          </label>
          <label className="field checkbox-field">
            <input
              checked={productForm.onSale}
              onChange={(event) =>
                setProductForm((current) => ({
                  ...current,
                  onSale: event.target.checked,
                }))
              }
              type="checkbox"
            />
            <span>판매 중</span>
          </label>
        </div>

        <div className="admin-actions">
          <p className="form-helper">
            쉼표 입력 필드: 향미 노트는 `자스민, 복숭아, 레몬`, 뱃지는 `BEST, NEW, PICK`
            형태로 입력합니다.
          </p>
          <button
            className="primary-action compact"
            disabled={isSavingProduct}
            onClick={() => void handleSaveProduct()}
            type="button"
          >
            {isSavingProduct ? "저장 중" : editingProductId ? "상품 수정" : "상품 등록"}
          </button>
        </div>
      </section>

      <section className="admin-card">
        <div className="section-heading">
          <div>
            <h2>카테고리 관리</h2>
            <p className="section-description">상품 분류를 등록하고 관리합니다.</p>
          </div>
        </div>

        <div className="admin-form-grid category-form-grid">
          <label className="field">
            <span>카테고리명 *</span>
            <input
              onChange={(event) =>
                setCategoryForm((current) => ({
                  ...current,
                  name: event.target.value,
                }))
              }
              placeholder="원두"
              value={categoryForm.name}
            />
          </label>
          <label className="field">
            <span>slug *</span>
            <input
              onChange={(event) =>
                setCategoryForm((current) => ({
                  ...current,
                  slug: event.target.value,
                }))
              }
              placeholder="beans"
              value={categoryForm.slug}
            />
          </label>
          <label className="field">
            <span>노출 순서</span>
            <input
              inputMode="numeric"
              onChange={(event) =>
                setCategoryForm((current) => ({
                  ...current,
                  displayOrder: event.target.value,
                }))
              }
              placeholder="1"
              value={categoryForm.displayOrder}
            />
          </label>
          <button
            className="primary-action compact align-end"
            disabled={isSavingCategory}
            onClick={() => void handleSaveCategory()}
            type="button"
          >
            {isSavingCategory ? "저장 중" : "카테고리 추가"}
          </button>
        </div>

        <div className="category-chip-list">
          {categories.map((category) => (
            <span className="category-chip" key={category.id}>
              {category.name}
              <small>{category.slug}</small>
              <button
                aria-label={`${category.name} 삭제`}
                disabled={deletingCategoryId === category.id}
                onClick={() => void handleDeleteCategory(category)}
                type="button"
              >
                삭제
              </button>
            </span>
          ))}
        </div>
      </section>

      <section className="admin-card">
        <div className="section-heading">
          <div>
            <h2>상품 목록</h2>
            <p className="section-description">등록된 상품 정보를 확인합니다.</p>
          </div>
          <button onClick={() => void loadProducts()} type="button">
            새로고침
          </button>
        </div>

        {error ? <p className="form-error">{error}</p> : null}

        <div className="simple-table admin-data-table products-table">
          <div className="table-row table-head">
            <span>상품명</span>
            <span>카테고리</span>
            <span>가격</span>
            <span>재고</span>
            <span>상태</span>
            <span>관리</span>
          </div>

          {isLoading ? (
            <div className="table-row table-empty">
              <span>상품 목록을 불러오는 중입니다.</span>
            </div>
          ) : products.length ? (
            products.map((product) => (
              <div className="table-row" key={product.id}>
                <span>
                  <strong>{product.name}</strong>
                  <small>{product.subtitle ?? product.origin ?? "설명 없음"}</small>
                </span>
                <span>{getCategoryName(product, categoriesById)}</span>
                <span>{formatPrice(product.price)}</span>
                <span>
                  {product.stockQuantity === null || product.stockQuantity === undefined
                    ? "무제한"
                    : `${product.stockQuantity}개`}
                </span>
                <span>{product.onSale === false ? "판매 중지" : "판매 중"}</span>
                <span className="row-actions">
                  <button
                    className="secondary-action"
                    onClick={() => {
                      setEditingProductId(product.id);
                      setProductForm(toProductForm(product));
                    }}
                    type="button"
                  >
                    수정
                  </button>
                  <button
                    className="danger-action"
                    disabled={deletingProductId === product.id}
                    onClick={() => void handleDeleteProduct(product)}
                    type="button"
                  >
                    {deletingProductId === product.id ? "삭제 중" : "삭제"}
                  </button>
                </span>
              </div>
            ))
          ) : (
            <div className="table-row table-empty">
              <span>등록된 상품이 없습니다.</span>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
