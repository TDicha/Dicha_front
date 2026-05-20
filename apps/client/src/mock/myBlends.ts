export interface MyBlendCard {
  id: string;
  recipeId: string;
  productId: string;
  title: string;
  savedAt: string;
  source: string;
  beanName: string;
  method: string;
  amount: string;
  isQr: boolean;
}

export const mockMyBlendCards: MyBlendCard[] = [
  {
    id: "morning",
    recipeId: "blend-signature-balance",
    productId: "ethiopia-yirgacheffe",
    title: "나의 모닝 블렌드",
    savedAt: "2026.03.15",
    source: "직접 저장",
    beanName: "에티오피아 예가체프 G1",
    method: "핸드드립",
    amount: "200g",
    isQr: false,
  },
  {
    id: "office",
    recipeId: "blend-signature-balance",
    productId: "colombia-huila",
    title: "오피스 블렌드",
    savedAt: "2026.02.28",
    source: "직접 저장",
    beanName: "콜롬비아 수프리모",
    method: "에스프레소",
    amount: "500g",
    isQr: false,
  },
  {
    id: "weekend",
    recipeId: "blend-soft-floral",
    productId: "kenya-kiambu-aa",
    title: "주말 스페셜",
    savedAt: "2026.02.14",
    source: "QR 블렌드",
    beanName: "케냐 AA 키암부",
    method: "푸어오버",
    amount: "200g",
    isQr: true,
  },
  {
    id: "basic",
    recipeId: "blend-signature-balance",
    productId: "guatemala-antigua",
    title: "기본 원두",
    savedAt: "2026.01.30",
    source: "직접 저장",
    beanName: "과테말라 안티구아",
    method: "프렌치프레스",
    amount: "200g",
    isQr: false,
  },
];
