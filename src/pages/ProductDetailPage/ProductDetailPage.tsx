import { ChevronLeft, ChevronRight, Minus, Plus, ShoppingCart } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useAppStore, useCartStore } from "@/app/store";
import { BottomSheet } from "@/components/common/BottomSheet";
import { OptionRow } from "@/components/common/OptionRow";
import { PrimaryButton } from "@/components/common/PrimaryButton";
import { mockProducts } from "@/mock/products";
import { mockReviews } from "@/mock/reviews";
import { ROUTES } from "@/shared/constants/routes";
import { formatPrice } from "@/shared/utils/format";

const noteColorMap = ["#488972", "#c39f54", "#d89647", "#2a3663", "#94231e"];
const noteLabelMap: Record<string, string[]> = {
  "ethiopia-yirgacheffe": ["자스민", "베르가못", "복숭아", "산미", "플로럴"],
  "kenya-kiambu-aa": ["블랙커런트", "자스민", "시트러스", "산미", "클린컵"],
  "guatemala-antigua": ["카라멜", "너티", "초콜릿", "밸런스", "스윗"],
};

const storyMap: Record<string, string[]> = {
  "ethiopia-yirgacheffe": [
    "에티오피아 예가체프 지역 해발 1,700~2,200m",
    "고산지대에서 재배된 G1 등급 원두입니다.",
    "",
    "DICHA 로스터가 직접 선별하여 주문 당일",
    "신선하게 로스팅하여 발송합니다.",
  ],
  "kenya-kiambu-aa": [
    "케냐 키암부 지역의 선명한 산미를 담은",
    "AA 등급 원두로 화사한 향미가 또렷합니다.",
    "",
    "밝은 과실감이 살아 있도록",
    "주문 후 신선하게 로스팅해 발송합니다.",
  ],
  "guatemala-antigua": [
    "과테말라 안티구아의 화산 토양에서 자란",
    "밸런스 좋은 싱글 오리진 원두입니다.",
    "",
    "견과류와 카라멜 풍미가 안정적으로 남도록",
    "디차 로스터가 세심하게 배전합니다.",
  ],
};

const brewingGuideMap: Record<string, string> = {
  "ethiopia-yirgacheffe": "핸드드립 · 에스프레소 · 모카포트 추출 방법",
  "kenya-kiambu-aa": "핸드드립 · 푸어오버 · 아이스 브루잉 추천",
  "guatemala-antigua": "에스프레소 · 라떼 베이스 · 프렌치프레스 추천",
};

function SectionRow({
  label,
  value,
  onClick,
}: {
  label: string;
  value: string;
  onClick?: () => void;
}) {
  return (
    <button
      className="flex w-full items-center justify-between border-b border-[#e8e8e8] py-4 text-left last:border-b-0"
      onClick={onClick}
      type="button"
    >
      <span className="text-[0.95rem] font-medium text-[#121212]">{label}</span>
      <span className="flex items-center gap-3">
        <span className="text-[0.92rem] font-semibold text-[#1d3e2b]">{value}</span>
        <ChevronRight className="size-4 text-[#7a746d]" />
      </span>
    </button>
  );
}

export function ProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { isBottomSheetOpen, openBottomSheet, closeBottomSheet } = useAppStore();
  const addItem = useCartStore((state) => state.addItem);
  const itemCount = useCartStore((state) =>
    state.items.reduce((count, item) => count + item.quantity, 0),
  );

  const product = useMemo(
    () => mockProducts.find((item) => item.id === productId) ?? mockProducts[0],
    [productId],
  );
  const [selectedOptionId, setSelectedOptionId] = useState("");
  const [quantity, setQuantity] = useState(1);

  const selectedOption = product.options.find((option) => option.id === selectedOptionId);
  const noteLabels = noteLabelMap[product.id] ?? [...product.notes.slice(0, 3), "산미", "밸런스"];
  const storyLines = storyMap[product.id] ?? [
    `${product.originLabel ?? product.name} 원두의 산지 특성을 살려`,
    "밸런스와 향미가 선명하게 느껴지도록 로스팅했습니다.",
    "",
    "주문 후 로스팅으로 신선도를 높여",
    "디차만의 기준으로 출고합니다.",
  ];
  const brewingGuide =
    brewingGuideMap[product.id] ?? "핸드드립 · 에스프레소 · 모카포트 추출 방법";
  const reviewEntries = [
    {
      ratingText: "★★★★★",
      author: "coffee***",
      date: "2026.03.12",
      content:
        '"향이 정말 진해요. 매일 아침 찾게 되는 커피예요. 미디엄 로스팅 강추합니다!"',
      option: "구매옵션: 미디엄 / 핸드드립 / 200g",
    },
    {
      ratingText: "★★★★☆",
      author: "roast***",
      date: "2026.02.28",
      content:
        '"커스텀 로스팅 덕분에 딱 제 취향을 찾았어요. 다음에도 꼭 구매할게요."',
      option: "구매옵션: 라이트 / 홀빈 / 500g",
    },
  ];
  const unitPrice = product.price + (selectedOption?.extraPrice ?? 0);
  const totalPrice = unitPrice * quantity;
  const selectedSummary = selectedOption
    ? `미디엄 · ${selectedOption.name} · 200g`
    : "미디엄 · 200g";

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

    addItem({
      productId: product.id,
      productName: `${product.name}${selectedOption ? ` / ${selectedOption.name}` : ""}`,
      quantity,
      price: unitPrice,
    });
    closeBottomSheet();
  }

  function handlePurchase() {
    if (!ensureOptionSelected()) {
      return;
    }

    handleAddToCart();
    navigate(ROUTES.purchase);
  }

  return (
    <div className="min-h-screen bg-[#f4f2eb] pb-32">
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-[#e8e8e8] bg-white px-4">
        <button
          aria-label="뒤로가기"
          className="flex size-8 items-center justify-center text-[#121212]"
          onClick={() => navigate(-1)}
          type="button"
        >
          <ChevronLeft className="size-5" />
        </button>
        <Link
          aria-label="장바구니로 이동"
          className="relative flex size-8 items-center justify-center text-[#121212]"
          to={ROUTES.cart}
        >
          <ShoppingCart className="size-5" />
          <span className="absolute -right-1 -top-1 flex size-3.5 items-center justify-center rounded-full bg-[#94231e] text-[0.45rem] font-bold text-white">
            {itemCount}
          </span>
        </Link>
      </header>

      <section className="relative flex min-h-[24.4rem] flex-col items-center justify-center overflow-hidden bg-[#dae3d1] px-6 text-center">
        <div className="text-[5.8rem]">☕</div>
        <p className="mt-4 text-[0.72rem] text-[#1d3e2b]">DICHA × {product.name}</p>
        <div className="absolute bottom-3 flex gap-2">
          <span className="size-1.5 rounded-full bg-white/95" />
          <span className="size-1.5 rounded-full bg-white/65" />
          <span className="size-1.5 rounded-full bg-white/65" />
          <span className="size-1.5 rounded-full bg-white/65" />
        </div>
      </section>

      <section className="border-b border-[#e8e8e8] bg-white px-4 py-4">
        <div className="flex flex-wrap gap-1.5">
          {product.originLabel ? (
            <span className="rounded-full bg-[#e8efe5] px-2.5 py-1 text-[0.56rem] text-[#1d3e2b]">
              {product.originLabel}
            </span>
          ) : null}
          {product.roastLabel ? (
            <span className="rounded-full bg-[#f5edd8] px-2.5 py-1 text-[0.56rem] text-[#c39f54]">
              {product.roastLabel}
            </span>
          ) : null}
          {product.categoryLabel ? (
            <span className="rounded-full bg-[#ede8f5] px-2.5 py-1 text-[0.56rem] text-[#5a3a8a]">
              {product.categoryLabel.replace(" ", "")}
            </span>
          ) : null}
        </div>

        <h1 className="mt-4 text-[1.7rem] font-black tracking-[-0.05em] text-[#121212]">
          {product.name}
        </h1>
        <p className="mt-1 text-[0.82rem] text-[#666666]">{product.subtitle}</p>

        <div className="mt-3 flex items-end gap-2">
          <p className="text-[2.1rem] font-black tracking-[-0.05em] text-[#94231e]">
            ₩{formatPrice(product.price)}
          </p>
          <p className="pb-1 text-[0.7rem] text-[#666666]">200g 기준</p>
        </div>

        <div className="mt-1 flex items-center gap-2">
          <p className="text-[0.92rem] font-bold text-[#c39f54]">★ {product.rating?.toFixed(1) ?? "4.8"}</p>
          <p className="text-[0.78rem] text-[#666666]">
            리뷰 {product.reviewCount ?? 142}건 · 판매 1,240건
          </p>
        </div>
      </section>

      <section className="border-b border-[#e8e8e8] bg-white px-4 py-5">
        <h2 className="text-[1.1rem] font-black text-[#121212]">커스텀 로스팅 옵션</h2>
        <p className="mt-1 text-[0.76rem] text-[#666666]">
          원하는 대로 설정하거나, 매장 추천을 받아보세요
        </p>

        <button
          className="mt-4 flex w-full items-center justify-between rounded-[0.8rem] bg-[#c39f54] px-4 py-3 text-left"
          onClick={openBottomSheet}
          type="button"
        >
          <span className="text-[0.92rem] font-bold text-[#1d3e2b]">✨ 매장 추천 커스텀 적용</span>
          <span className="text-[0.74rem] font-medium text-[#1d3e2b]">바로 적용 →</span>
        </button>

        <div className="mt-4">
          <SectionRow label="로스팅 단계" onClick={openBottomSheet} value="미디엄" />
          <SectionRow
            label="분쇄 옵션"
            onClick={openBottomSheet}
            value={selectedOption?.name ?? "선택해주세요"}
          />
          <SectionRow label="용량" onClick={openBottomSheet} value={`200g — ₩${formatPrice(product.price)}`} />
        </div>
      </section>

      <section className="border-b border-[#e8e8e8] bg-white px-4 py-4">
        <button className="flex w-full items-center justify-between text-left" type="button">
          <div>
            <h2 className="text-[1rem] font-bold text-[#121212]">브루잉 가이드</h2>
            <p className="mt-1 text-[0.7rem] text-[#666666]">{brewingGuide}</p>
          </div>
          <ChevronRight className="size-4 text-[#666666]" />
        </button>
      </section>

      <section className="border-b border-[#e8e8e8] bg-white px-4 py-4">
        <h2 className="text-[1.1rem] font-black text-[#121212]">향미 노트</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {noteLabels.map((note, index) => (
            <span
              key={note}
              className="rounded-full px-3 py-1.5 text-[0.75rem] font-medium text-white"
              style={{ backgroundColor: noteColorMap[index % noteColorMap.length] }}
            >
              {note}
            </span>
          ))}
        </div>
        <p className="mt-4 text-[0.86rem] leading-7 text-[#121212]">
          {product.description} {product.id === "ethiopia-yirgacheffe" ? "아무리든 에티오피아 대표 스페셜티 커피입니다." : ""}
        </p>
      </section>

      <section className="border-b border-[#e8e8e8] bg-white px-4 py-4">
        <h2 className="text-[1.1rem] font-black text-[#121212]">원두 스토리</h2>
        <div className="mt-3 space-y-1 text-[0.86rem] leading-7 text-[#121212]">
          {storyLines.map((line, index) =>
            line ? <p key={`${line}-${index}`}>{line}</p> : <div key={`blank-${index}`} className="h-2" />,
          )}
        </div>
      </section>

      <section className="bg-white px-4 py-4">
        <div className="flex items-center gap-2">
          <h2 className="text-[1.1rem] font-black text-[#121212]">리뷰</h2>
          <span className="text-[0.92rem] text-[#666666]">{product.reviewCount ?? mockReviews.length}</span>
        </div>

        <div className="mt-2 flex items-end gap-2">
          <p className="text-[1.55rem] font-black text-[#c39f54]">★ {product.rating?.toFixed(1) ?? "4.8"}</p>
          <p className="pb-1 text-[0.9rem] text-[#666666]">/ 5.0</p>
        </div>

        <div className="mt-3 border-t border-[#e8e8e8]">
          {reviewEntries.map((review, index) => (
            <article
              key={review.author}
              className={[
                "py-3",
                index < reviewEntries.length - 1 ? "border-b border-[#e8e8e8]" : "",
              ].join(" ")}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-[0.8rem] text-[#c39f54]">{review.ratingText}</span>
                  <span className="text-[0.72rem] font-medium text-[#121212]">{review.author}</span>
                </div>
                <span className="text-[0.66rem] text-[#666666]">{review.date}</span>
              </div>
              <p className="mt-2 text-[0.82rem] leading-6 text-[#121212]">{review.content}</p>
              <p className="mt-2 text-[0.66rem] text-[#666666]">{review.option}</p>
            </article>
          ))}
        </div>

        <button
          className="mt-4 flex h-11 w-full items-center justify-center rounded-full border border-[#1d3e2b] text-[0.92rem] font-medium text-[#1d3e2b]"
          type="button"
        >
          더 보기 (26개)
        </button>
      </section>

      <div className="fixed bottom-0 left-1/2 z-30 w-full max-w-md -translate-x-1/2 border-t border-[#e8e8e8] bg-white px-4 py-2.5">
        <div className="mb-2 flex items-center justify-between text-[0.7rem]">
          <span className="text-[#666666]">선택된 옵션: {selectedSummary}</span>
          <span className="font-bold text-[#94231e]">₩{formatPrice(totalPrice)}</span>
        </div>
        <div className="grid grid-cols-[1fr_1.12fr] gap-2">
          <PrimaryButton
            className="h-11 rounded-[0.85rem] border border-[#1d3e2b] bg-white text-[#1d3e2b] shadow-none"
            onClick={handleAddToCart}
            variant="outline"
          >
            장바구니 담기
          </PrimaryButton>
          <PrimaryButton className="h-11 rounded-[0.85rem] shadow-none" onClick={handlePurchase}>
            바로 구매
          </PrimaryButton>
        </div>
      </div>

      <BottomSheet onClose={closeBottomSheet} open={isBottomSheetOpen} title="커스텀 옵션 선택">
        <div className="space-y-5">
          <section className="rounded-[1.15rem] border border-[rgba(29,62,43,0.08)] bg-white px-4 py-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h4 className="text-base font-semibold text-[var(--color-primary-green)]">
                  {product.name}
                </h4>
                <p className="mt-1 text-xs leading-5 text-[var(--color-muted)]">
                  분쇄 옵션과 수량을 선택한 뒤 바로 주문할 수 있어요.
                </p>
              </div>
              <span className="rounded-full bg-[rgba(29,62,43,0.05)] px-3 py-1 text-xs font-semibold text-[var(--color-primary-green)]">
                200g
              </span>
            </div>
          </section>

          <section>
            <div className="mb-3 flex items-center justify-between">
              <h4 className="text-base font-semibold text-[var(--color-primary-green)]">분쇄 옵션</h4>
              <span className="rounded-full bg-[rgba(29,62,43,0.05)] px-2.5 py-1 text-[11px] font-semibold text-[var(--color-primary-green)]">
                필수
              </span>
            </div>
            <div className="space-y-2.5">
              {product.options.map((option) => (
                <OptionRow
                  key={option.id}
                  description={option.description}
                  label={option.name}
                  onClick={() => setSelectedOptionId(option.id)}
                  price={option.extraPrice ? `+${formatPrice(option.extraPrice)}원` : "추가금액 없음"}
                  selected={selectedOptionId === option.id}
                />
              ))}
            </div>
          </section>

          <section className="rounded-[1.15rem] border border-[rgba(29,62,43,0.08)] bg-[rgba(29,62,43,0.035)] px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-base font-semibold text-[var(--color-primary-green)]">수량</h4>
                <p className="mt-1 text-xs text-[var(--color-muted)]">필요한 만큼 바로 조절해 주세요.</p>
              </div>
              <div className="flex items-center rounded-full border border-[rgba(29,62,43,0.1)] bg-white px-1 py-1">
                <button
                  className="flex size-9 items-center justify-center rounded-full text-[var(--color-primary-green)] disabled:text-[var(--color-muted)]"
                  disabled={quantity === 1}
                  onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                  type="button"
                >
                  <Minus className="size-4" />
                </button>
                <span className="min-w-10 text-center text-sm font-semibold text-[var(--color-primary-green)]">
                  {quantity}
                </span>
                <button
                  className="flex size-9 items-center justify-center rounded-full text-[var(--color-primary-green)]"
                  onClick={() => setQuantity((current) => current + 1)}
                  type="button"
                >
                  <Plus className="size-4" />
                </button>
              </div>
            </div>
          </section>
        </div>
      </BottomSheet>
    </div>
  );
}
