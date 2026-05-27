import type { Product } from "@/shared/types/models";

export interface ProductDetailReview {
  id: string;
  rating: number;
  author: string;
  date: string;
  content: string;
  optionLabel: string;
}

export interface ProductDetailContent {
  noteLabels: string[];
  storyLines: string[];
  brewingGuide: string;
  baseWeightLabel: string;
  defaultRoastLabel: string;
  salesCount: number;
  reviewMoreCount: number;
  descriptionSuffix?: string;
  reviews: ProductDetailReview[];
}

const defaultReviews: ProductDetailReview[] = [
  {
    id: "review-daily-aroma",
    rating: 5,
    author: "coffee***",
    date: "2026.03.12",
    content:
      '"향이 정말 진해요. 매일 아침 찾게 되는 커피예요. 미디엄 로스팅 강추합니다!"',
    optionLabel: "구매옵션: 미디엄 / 핸드드립 / 200g",
  },
  {
    id: "review-custom-roast",
    rating: 4,
    author: "roast***",
    date: "2026.02.28",
    content:
      '"커스텀 로스팅 덕분에 딱 제 취향을 찾았어요. 다음에도 꼭 구매할게요."',
    optionLabel: "구매옵션: 라이트 / 홀빈 / 500g",
  },
];

const productDetails: Record<string, ProductDetailContent> = {
  "ethiopia-yirgacheffe": {
    noteLabels: ["자스민", "베르가못", "복숭아", "산미", "플로럴"],
    storyLines: [
      "에티오피아 예가체프 지역 해발 1,700~2,200m",
      "고산지대에서 재배된 G1 등급 원두입니다.",
      "",
      "DICHA 로스터가 직접 선별하여 주문 당일",
      "신선하게 로스팅하여 발송합니다.",
    ],
    brewingGuide: "핸드드립 · 에스프레소 · 모카포트 추출 방법",
    baseWeightLabel: "200g",
    defaultRoastLabel: "미디엄",
    salesCount: 1240,
    reviewMoreCount: 26,
    descriptionSuffix: "아무리든 에티오피아 대표 스페셜티 커피입니다.",
    reviews: defaultReviews,
  },
  "kenya-kiambu-aa": {
    noteLabels: ["블랙커런트", "자스민", "시트러스", "산미", "클린컵"],
    storyLines: [
      "케냐 키암부 지역의 선명한 산미를 담은",
      "AA 등급 원두로 화사한 향미가 또렷합니다.",
      "",
      "밝은 과실감이 살아 있도록",
      "주문 후 신선하게 로스팅해 발송합니다.",
    ],
    brewingGuide: "핸드드립 · 푸어오버 · 아이스 브루잉 추천",
    baseWeightLabel: "200g",
    defaultRoastLabel: "라이트",
    salesCount: 870,
    reviewMoreCount: 18,
    reviews: defaultReviews,
  },
  "guatemala-antigua": {
    noteLabels: ["카라멜", "너티", "초콜릿", "밸런스", "스윗"],
    storyLines: [
      "과테말라 안티구아의 화산 토양에서 자란",
      "밸런스 좋은 싱글 오리진 원두입니다.",
      "",
      "견과류와 카라멜 풍미가 안정적으로 남도록",
      "디차 로스터가 세심하게 배전합니다.",
    ],
    brewingGuide: "에스프레소 · 라떼 베이스 · 프렌치프레스 추천",
    baseWeightLabel: "200g",
    defaultRoastLabel: "미디엄",
    salesCount: 620,
    reviewMoreCount: 12,
    reviews: defaultReviews,
  },
};

export function getProductDetail(product: Product): ProductDetailContent {
  if (product.productType === "drip-bag") {
    return {
      noteLabels: [...product.notes.slice(0, 3), "간편 추출", "데일리"],
      storyLines: [
        `${product.name}은 한 잔씩 간편하게 즐길 수 있도록`,
        "디차의 향미를 드립백 한 봉에 담았습니다.",
        "",
        "뜨거운 물만 준비하면 어디서든",
        "신선한 카페의 한 잔을 만날 수 있습니다.",
      ],
      brewingGuide: "컵 위에 드립백을 걸고 90°C 물로 2~3회 나누어 추출",
      baseWeightLabel: product.options[0]?.name ?? "1세트",
      defaultRoastLabel: product.roastLabel ?? "",
      salesCount: 0,
      reviewMoreCount: 0,
      reviews: defaultReviews,
    };
  }

  if (product.productType === "gift-set") {
    return {
      noteLabels: [...product.notes.slice(0, 3), "선물 포장", "시그니처"],
      storyLines: [
        `${product.name}은 디차의 인기 메뉴를 골라`,
        "소중한 마음과 함께 전할 수 있도록 구성했습니다.",
        "",
        "받는 순간부터 즐거운 경험이 되도록",
        "정갈한 패키지로 준비해 보내드립니다.",
      ],
      brewingGuide: "구성품별 권장 추출법과 보관 안내를 패키지에서 확인하세요",
      baseWeightLabel: product.options[0]?.name ?? "1세트",
      defaultRoastLabel: product.roastLabel ?? "",
      salesCount: 0,
      reviewMoreCount: 0,
      reviews: defaultReviews,
    };
  }

  return (
    productDetails[product.id] ?? {
      noteLabels: [...product.notes.slice(0, 3), "산미", "밸런스"],
      storyLines: [
        `${product.originLabel ?? product.name} 원두의 산지 특성을 살려`,
        "밸런스와 향미가 선명하게 느껴지도록 로스팅했습니다.",
        "",
        "주문 후 로스팅으로 신선도를 높여",
        "디차만의 기준으로 출고합니다.",
      ],
      brewingGuide: "핸드드립 · 에스프레소 · 모카포트 추출 방법",
      baseWeightLabel: "200g",
      defaultRoastLabel: product.roastLevel,
      salesCount: 0,
      reviewMoreCount: 0,
      reviews: defaultReviews,
    }
  );
}
