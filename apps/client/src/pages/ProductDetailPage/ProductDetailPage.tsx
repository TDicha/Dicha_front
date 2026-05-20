import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useAppStore, useCartStore, useCheckoutStore } from "@/app/store";
import { EmptyState } from "@/components/common/EmptyState";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import {
  ProductBottomActionBar,
  ProductBrewingGuideSection,
  ProductDetailHeader,
  ProductFlavorNotesSection,
  ProductHeroSection,
  ProductOptionBottomSheet,
  ProductOptionSection,
  ProductReviewSection,
  ProductStorySection,
  ProductSummarySection,
} from "@/features/products";
import { useProduct, useProductOptions } from "@/features/products/hooks/useProducts";
import { getProductDetail } from "@/mock/productDetails";
import { ROUTES } from "@/shared/constants/routes";
import { formatPrice } from "@/shared/utils/format";

export function ProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { isBottomSheetOpen, openBottomSheet, closeBottomSheet } =
    useAppStore();
  const addItem = useCartStore((state) => state.addItem);
  const createDirectCheckout = useCheckoutStore((state) => state.createDirect);
  const itemCount = useCartStore((state) =>
    state.items.reduce((count, item) => count + item.quantity, 0),
  );
  const {
    data: product,
    isError: isProductError,
    isLoading: isProductLoading,
  } = useProduct(productId);
  const { data: productOptions = [] } = useProductOptions(productId);

  const detail = useMemo(() => (product ? getProductDetail(product) : null), [product]);
  const [selectedOptionId, setSelectedOptionId] = useState("");
  const [quantity, setQuantity] = useState(1);

  const selectedOption = productOptions.find(
    (option) => option.id === selectedOptionId,
  );
  const reviewTotal = product && detail ? product.reviewCount ?? detail.reviews.length : 0;
  const unitPrice = product ? product.price + (selectedOption?.extraPrice ?? 0) : 0;
  const totalPrice = unitPrice * quantity;
  const selectedSummary =
    detail && selectedOption
      ? `${detail.defaultRoastLabel} · ${selectedOption.name} · ${detail.baseWeightLabel}`
      : (detail?.defaultRoastLabel ?? "옵션을 선택해주세요");

  function ensureOptionSelected() {
    if (selectedOption) {
      return true;
    }

    openBottomSheet();
    return false;
  }

  function handleAddToCart() {
    if (!ensureOptionSelected()) {
      return;
    }

    if (!product || !selectedOption) {
      return;
    }

    addItem({
      cartItemId: `${product.id}:${selectedOption.id}`,
      productId: product.id,
      optionId: selectedOption.id,
      productName: product.name,
      optionName: selectedOption.name,
      unitPrice,
      quantity,
      selected: true,
    });
    closeBottomSheet();
  }

  function handlePurchase() {
    if (!ensureOptionSelected()) {
      return;
    }

    if (!product || !selectedOption) {
      return;
    }

    createDirectCheckout({
      cartItemId: `direct:${product.id}:${selectedOption.id}`,
      productId: product.id,
      optionId: selectedOption.id,
      productName: product.name,
      optionName: selectedOption.name,
      unitPrice,
      quantity,
      selected: true,
    });
    closeBottomSheet();
    navigate(ROUTES.purchase);
  }

  if (isProductLoading) {
    return (
      <div className="min-h-[100dvh] bg-[var(--surface-base)] px-[var(--page-x)] py-12 text-center text-sm text-[var(--text-muted)]">
        상품 정보를 불러오는 중입니다
      </div>
    );
  }

  if (isProductError || !product || !detail) {
    return (
      <div className="min-h-[100dvh] bg-[var(--surface-base)] px-[var(--page-x)] py-10">
        <EmptyState
          action={
            <PrimaryButton asChild className="h-12 rounded-[0.95rem] shadow-none">
              <Link to={ROUTES.products}>상품 목록으로 이동</Link>
            </PrimaryButton>
          }
          description="주소를 확인하거나 상품 목록에서 다시 선택해 주세요."
          title="상품을 찾을 수 없어요"
        />
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-[var(--surface-app)] pb-[var(--product-action-page-padding)]">
      <ProductDetailHeader itemCount={itemCount} onBack={() => navigate(-1)} />
      <ProductHeroSection productName={product.name} />
      <ProductSummarySection
        baseWeightLabel={detail.baseWeightLabel}
        product={product}
        reviewTotal={reviewTotal}
        salesCount={detail.salesCount}
      />
      <ProductOptionSection
        basePriceLabel={`${detail.baseWeightLabel} — ₩${formatPrice(product.price)}`}
        defaultRoastLabel={detail.defaultRoastLabel}
        onOpenOptions={openBottomSheet}
        selectedOptionName={selectedOption?.name}
      />
      <ProductBrewingGuideSection brewingGuide={detail.brewingGuide} />
      <ProductFlavorNotesSection
        description={product.description}
        descriptionSuffix={detail.descriptionSuffix}
        noteLabels={detail.noteLabels}
      />
      <ProductStorySection storyLines={detail.storyLines} />
      <ProductReviewSection
        rating={product.rating}
        reviewMoreCount={detail.reviewMoreCount}
        reviews={detail.reviews}
        reviewTotal={reviewTotal}
      />
      <ProductBottomActionBar
        onAddToCart={handleAddToCart}
        onPurchase={handlePurchase}
        selectedSummary={selectedSummary}
        totalPrice={totalPrice}
      />
      <ProductOptionBottomSheet
        baseWeightLabel={detail.baseWeightLabel}
        onClose={closeBottomSheet}
        onDecreaseQuantity={() => setQuantity((current) => Math.max(1, current - 1))}
        onIncreaseQuantity={() => setQuantity((current) => current + 1)}
        onSelectOption={setSelectedOptionId}
        open={isBottomSheetOpen}
        options={productOptions}
        productName={product.name}
        quantity={quantity}
        selectedOptionId={selectedOptionId}
      />
    </div>
  );
}
