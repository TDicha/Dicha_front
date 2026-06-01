import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  useAppStore,
  useAuthStore,
  useCartStore,
  useCheckoutStore,
} from "@/app/store";
import { EmptyState } from "@/components/common/EmptyState";
import { ImplementationNoticeModal } from "@/components/common/ImplementationNoticeModal";
import { LoadingScreen } from "@/components/common/LoadingScreen";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import {
  ProductBottomActionBar,
  ProductCartAddedDialog,
  ProductDetailHeader,
  ProductFlavorNotesSection,
  ProductHeroSection,
  ProductOptionBottomSheet,
  ProductOptionSection,
  ProductReviewSection,
  ProductSummarySection,
} from "@/features/products";
import { useAddCartItem } from "@/features/cart";
import {
  useProduct,
  useProductOptions,
} from "@/features/products/hooks/useProducts";
import { ROUTES } from "@/shared/constants/routes";
import { env } from "@/shared/lib/env";
import { formatPrice } from "@/shared/utils/format";

const ROAST_OPTIONS = ["라이트", "미디엄", "다크"] as const;
const GRIND_OPTIONS = ["홀빈", "핸드드립 분쇄", "에스프레소 분쇄"] as const;
const TEMPORARY_WEIGHT_OPTIONS = [
  { id: "temp-200g", name: "200g", extraPrice: 0 },
  { id: "temp-400g", name: "400g", extraPrice: 5000 },
  { id: "temp-500g", name: "500g", extraPrice: 8000 },
];

function getDefaultRoast(roastLevel: "Light" | "Medium" | "Dark") {
  if (roastLevel === "Light") return "라이트";
  if (roastLevel === "Dark") return "다크";

  return "미디엄";
}

export function ProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { isBottomSheetOpen, openBottomSheet, closeBottomSheet } =
    useAppStore();
  const addItem = useCartStore((state) => state.addItem);
  const authStatus = useAuthStore((state) => state.status);
  const createDirectCheckout = useCheckoutStore((state) => state.createDirect);
  const addCartItemMutation = useAddCartItem();
  const itemCount = useCartStore((state) =>
    state.items.reduce((count, item) => count + item.quantity, 0),
  );
  const {
    data: product,
    isError: isProductError,
    isLoading: isProductLoading,
  } = useProduct(productId);
  const { data: productOptions = [], isLoading: isProductOptionsLoading } =
    useProductOptions(productId);

  const enablesRoastCustomization = product?.productType === "beans";
  const weightOptions = useMemo(() => {
    if (product && product.productType !== "beans") {
      return !env.enableMock && productOptions.length > 0
        ? productOptions
        : product.options;
    }

    return !env.enableMock && productOptions.length > 0
      ? productOptions
      : TEMPORARY_WEIGHT_OPTIONS;
  }, [product, productOptions]);
  const [selectedRoast, setSelectedRoast] = useState<string | null>(null);
  const [selectedGrind, setSelectedGrind] = useState<string>(GRIND_OPTIONS[0]);
  const [selectedWeightId, setSelectedWeightId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [implementationFeature, setImplementationFeature] = useState<
    string | null
  >(null);
  const [isCartAddedDialogOpen, setIsCartAddedDialogOpen] = useState(false);

  const selectedRoastLabel =
    selectedRoast ?? (product ? getDefaultRoast(product.roastLevel) : "");
  const activeWeightId = weightOptions.some(
    (option) => option.id === selectedWeightId,
  )
    ? selectedWeightId
    : isProductOptionsLoading
      ? ""
      : (weightOptions[0]?.id ?? "");
  const selectedWeight = weightOptions.find(
    (option) => option.id === activeWeightId,
  );
  const backendProductOptionId = productOptions.some(
    (option) => option.id === activeWeightId,
  )
    ? activeWeightId
    : undefined;
  const reviewTotal =
    product ? (product.reviewCount ?? 0) : 0;
  const reviewMoreCount = reviewTotal;
  const unitPrice = product
    ? product.price + (selectedWeight?.extraPrice ?? 0)
    : 0;
  const totalPrice = unitPrice * quantity;
  const selectedSummary =
    selectedWeight && !enablesRoastCustomization
      ? selectedWeight.name
      : selectedRoastLabel && selectedGrind && selectedWeight
        ? `${selectedRoastLabel} · ${selectedGrind} · ${selectedWeight.name}`
        : "옵션을 선택해주세요";
  const shouldUseCartApi = authStatus === "authenticated" && !env.enableMock;

  function ensureOptionSelected() {
    if (
      selectedWeight &&
      (!enablesRoastCustomization || (selectedRoastLabel && selectedGrind))
    ) {
      return true;
    }

    openBottomSheet();
    return false;
  }

  function handleAddToCart() {
    if (!ensureOptionSelected()) {
      return;
    }

    if (!product || !selectedWeight) {
      return;
    }

    addItem({
      cartItemId: `${product.id}:${selectedSummary}:${selectedWeight.id}`,
      productId: product.id,
      optionId: enablesRoastCustomization
        ? `${selectedRoastLabel}:${selectedGrind}:${selectedWeight.id}`
        : selectedWeight.id,
      productName: product.name,
      optionName: selectedSummary,
      productImage: product.image,
      unitPrice,
      quantity,
      selected: true,
    });

    if (shouldUseCartApi) {
      addCartItemMutation.mutate({
        productId: product.id,
        productOptionId: backendProductOptionId,
        quantity,
      });
    }

    closeBottomSheet();
    setIsCartAddedDialogOpen(true);
  }

  function handlePurchase() {
    if (!ensureOptionSelected()) {
      return;
    }

    if (!product || !selectedWeight) {
      return;
    }

    createDirectCheckout({
      cartItemId: `direct:${product.id}:${selectedSummary}:${selectedWeight.id}`,
      productId: product.id,
      optionId: enablesRoastCustomization
        ? `${selectedRoastLabel}:${selectedGrind}:${selectedWeight.id}`
        : selectedWeight.id,
      productName: product.name,
      optionName: selectedSummary,
      productImage: product.image,
      unitPrice,
      quantity,
      selected: true,
    });
    closeBottomSheet();
    navigate(ROUTES.purchase);
  }

  function handleApplyRecommendation() {
    if (!product || weightOptions.length === 0) {
      return;
    }

    setSelectedRoast(getDefaultRoast(product.roastLevel));
    setSelectedGrind("핸드드립 분쇄");
    setSelectedWeightId(weightOptions[0].id);
  }

  if (isProductLoading) {
    return (
      <LoadingScreen
        className="min-h-[100dvh]"
        message="상품 정보를 불러오는 중"
      />
    );
  }

  if (isProductError || !product) {
    return (
      <div className="cafe-tile-bg min-h-[100dvh] px-[var(--page-x)] py-10">
        <EmptyState
          action={
            <PrimaryButton
              asChild
              className="h-12 rounded-none bg-[var(--surface-chalkboard)] shadow-none"
            >
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
    <div className="cafe-tile-bg min-h-[100dvh] pb-[var(--product-action-page-padding)]">
      <ProductDetailHeader itemCount={itemCount} onBack={() => navigate(-1)} />
      <ProductHeroSection
        productImage={product.image}
        productName={product.name}
      />
      <ProductSummarySection
        baseWeightLabel={weightOptions[0]?.name ?? "기본 옵션"}
        product={product}
        reviewTotal={reviewTotal}
      />
      <ProductOptionSection
        enablesRoastCustomization={enablesRoastCustomization}
        onApplyRecommendation={handleApplyRecommendation}
        onOpenOptions={openBottomSheet}
        selectedGrindLabel={selectedGrind}
        selectedRoastLabel={selectedRoastLabel || getDefaultRoast(product.roastLevel)}
        selectedWeightLabel={
          selectedWeight
            ? `${selectedWeight.name} - ₩${formatPrice(unitPrice)}`
            : "선택해주세요"
        }
      />
      <ProductFlavorNotesSection
        description={product.description}
        noteLabels={product.notes}
      />
      <ProductReviewSection
        rating={product.rating}
        onViewMore={() => setImplementationFeature("리뷰 더 보기")}
        reviewMoreCount={reviewMoreCount}
        reviews={[]}
        reviewTotal={reviewTotal}
      />
      <ProductBottomActionBar
        onAddToCart={handleAddToCart}
        onPurchase={handlePurchase}
        selectedSummary={selectedSummary}
        totalPrice={totalPrice}
      />
      <ProductCartAddedDialog
        onClose={() => setIsCartAddedDialogOpen(false)}
        onGoCart={() => {
          setIsCartAddedDialogOpen(false);
          navigate(ROUTES.cart);
        }}
        open={isCartAddedDialogOpen}
      />
      <ProductOptionBottomSheet
        enablesRoastCustomization={enablesRoastCustomization}
        grindOptions={GRIND_OPTIONS}
        onClose={closeBottomSheet}
        onDecreaseQuantity={() =>
          setQuantity((current) => Math.max(1, current - 1))
        }
        onIncreaseQuantity={() => setQuantity((current) => current + 1)}
        onSelectGrind={setSelectedGrind}
        onSelectRoast={setSelectedRoast}
        onSelectWeight={setSelectedWeightId}
        open={isBottomSheetOpen}
        productName={product.name}
        quantity={quantity}
        roastOptions={ROAST_OPTIONS}
        selectedGrind={selectedGrind}
        selectedRoast={selectedRoastLabel}
        selectedWeightId={activeWeightId}
        weightOptions={weightOptions}
      />
      <ImplementationNoticeModal
        featureLabel={implementationFeature}
        onClose={() => setImplementationFeature(null)}
      />
    </div>
  );
}
