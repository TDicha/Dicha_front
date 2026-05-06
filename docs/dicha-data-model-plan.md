# DICHA Front Data Model Planning

작성일: 2026-04-30

## 목적

이 문서는 DICHA 사용자 앱과 관리자 페이지에서 공통으로 사용할 프론트 데이터 형식을 정리하기 위한 초안이다. 현재 프로젝트는 mock 데이터, 화면 내부 하드코딩, 일부 feature 계층 분리가 함께 존재하므로, 이후 API 연동과 관리자 페이지 운영을 고려해 도메인별 데이터 계약을 먼저 통일하는 것을 목표로 한다.

## 핵심 도메인

### 1. User / Auth

필요 데이터:

- 회원 id
- 이름
- 이메일
- 휴대폰 번호
- 권한
- 로그인 상태
- 토큰 또는 세션 여부
- 배송지 목록
- 취향 테스트 결과
- 관리자 여부 또는 role

권장 role 예시:

```ts
type UserRole = "USER" | "ADMIN" | "ROASTER" | "MANAGER";
```

### 2. Product

필요 데이터:

- 상품 id
- 이름
- 카테고리
- 가격
- 대표 이미지
- 원산지
- 로스팅 정도
- 향미 노트
- 옵션 목록
- 재고 상태
- 판매 상태
- 상세 설명
- 브루잉 가이드
- 리뷰 요약

카테고리 예시:

- 원두
- 드립백
- 구독
- 굿즈
- 클래스

판매 상태 예시:

```ts
type ProductStatus = "draft" | "published" | "hidden" | "sold_out";
```

관리자 페이지까지 고려한 추가 필드:

```ts
type ProductAdminFields = {
  status: "draft" | "published" | "hidden" | "sold_out";
  stockQuantity: number;
  displayOrder: number;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
  adminMemo?: string;
};
```

### 3. Product Option

필요 데이터:

- optionId
- productId
- 옵션명
- 추가 금액
- 재고
- 관리자에서 수정 가능 여부

옵션 예시:

- 200g / 홀빈 / 미디엄
- 500g / 분쇄 / 다크
- 드립백 10개입
- 2주 구독

권장 방향:

현재 장바구니에서는 상품명 문자열에 옵션이 섞일 수 있으므로, 옵션은 독립된 구조로 관리하는 것이 좋다.

### 4. Cart

필요 데이터:

- cartItemId
- productId
- optionId
- 상품명 snapshot
- 옵션명 snapshot
- unitPrice
- quantity
- selected 여부

권장 구조:

```ts
type CartItem = {
  cartItemId: string;
  productId: string;
  optionId: string;
  productName: string;
  optionName: string;
  unitPrice: number;
  quantity: number;
  selected: boolean;
};
```

주의점:

상품명 snapshot과 옵션명 snapshot은 주문 시점의 표시 정보를 보존하기 위해 필요하다. 상품명이 나중에 변경되어도 과거 주문과 장바구니 표시가 흔들리지 않게 해준다.

### 5. Order

필요 데이터:

- orderId
- userId
- 주문 상품 목록
- 결제 금액
- 배송비
- 할인액
- 주문 상태
- 배송지
- 결제수단
- 주문일
- 관리자 메모

사용자 앱 표시용 주문 상태 예시:

- 주문완료
- 결제완료
- 배송준비
- 배송중
- 배송완료
- 취소
- 환불

관리자 페이지용 상태 예시:

```ts
type PaymentStatus = "pending" | "paid" | "failed" | "refunded";
type FulfillmentStatus = "preparing" | "shipped" | "delivered" | "canceled";

type OrderAdminFields = {
  paymentStatus: PaymentStatus;
  fulfillmentStatus: FulfillmentStatus;
  trackingNumber?: string;
  shippingCompany?: string;
  adminMemo?: string;
};
```

### 6. Payment

필요 데이터:

- paymentId
- orderId
- paymentMethod
- amount
- status
- approvedAt
- receiptUrl
- 실패 사유

상태 예시:

```ts
type PaymentStatus = "pending" | "paid" | "failed" | "canceled" | "refunded";
```

### 7. Subscription

필요 데이터:

- subscriptionId
- userId
- productId
- optionId
- 주기
- 다음 배송일
- 상태
- 배송 이력
- 결제 예정 금액
- 관리자에서 강제 중지 또는 수정 가능한 필드

상태 예시:

```ts
type SubscriptionStatus = "active" | "paused" | "canceled";
```

주기 예시:

- 2주
- 4주
- 매월

### 8. Taste Test / Preference

필요 데이터:

- 질문 목록
- 답변 목록
- 결과 타입
- 추천 상품 id 목록

결정이 필요한 지점:

취향 테스트 질문을 프론트 config로 둘지, 서버 데이터로 관리할지 결정해야 한다. 관리자 페이지에서 질문과 결과를 수정해야 한다면 서버 데이터가 되어야 한다.

### 9. Review

필요 데이터:

- reviewId
- productId
- userId
- rating
- content
- imageUrls
- createdAt
- 숨김 여부
- 관리자 답변 여부

관리자 페이지에서 필요한 추가 데이터:

- 신고 여부
- 노출 여부
- 관리자 답변 내용
- 답변 작성일
- 작성자 식별 정보

### 10. Reservation / Class

필요 데이터:

- 클래스 id
- 클래스명
- 날짜/시간
- 정원
- 예약 가능 인원
- 예약자 정보
- 예약 상태
- 관리자 확인/취소 상태

상태 예시:

```ts
type ReservationStatus = "pending" | "confirmed" | "canceled" | "completed";
```

### 11. QR / O2O

필요 데이터:

- qrCode
- targetType
- targetId
- 유효 기간
- 관리자에서 생성/폐기 가능 여부

targetType 예시:

```ts
type QrTargetType = "product" | "blend" | "event" | "reservation";
```

### 12. My Blend

필요 데이터:

- blendId
- userId
- 이름
- 레시피 구성
- 추천 상품 id
- 취향 테스트 결과와 연결 여부
- 주문 가능 여부

고려할 점:

블렌드가 실제 상품처럼 주문 가능하다면 Product 또는 ProductOption과 연결되는 구조가 필요하다. 단순 추천 결과라면 별도 MyBlend 도메인으로 관리해도 된다.

### 13. Home / Display Content

필요 데이터:

- 홈 히어로 슬라이드
- 베스트 상품 id 목록
- 추천 상품 id
- 배너
- 리뷰 노출 목록

관리자 페이지 고려:

관리자 페이지가 있다면 홈 노출 데이터는 CMS 성격을 가진다. 따라서 코드에 고정하기보다 display content 또는 promotion 도메인으로 분리하는 것이 좋다.

## 관리자 페이지 때문에 추가로 필요한 것

관리자 페이지가 있으면 사용자 앱에서 보이는 데이터만으로는 부족하다. 운영 상태, 노출 여부, 정렬 순서, 생성/수정 시각, 관리자 메모 같은 필드가 필요하다.

상품 예시:

```ts
type ProductAdminFields = {
  status: "draft" | "published" | "hidden" | "sold_out";
  stockQuantity: number;
  displayOrder: number;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
  adminMemo?: string;
};
```

주문 예시:

```ts
type OrderAdminFields = {
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  fulfillmentStatus: "preparing" | "shipped" | "delivered" | "canceled";
  trackingNumber?: string;
  shippingCompany?: string;
  adminMemo?: string;
};
```

## 사용자에게 받아야 할 자료와 답변

아래 항목은 이후 데이터 모델을 확정하기 위해 사용자가 답변하거나 자료로 제공해야 하는 내용이다.

### 1. 피그마 링크

필요 자료:

- 사용자 앱 화면
- 관리자 페이지 화면
- 상품 등록/수정 화면
- 주문 관리 화면
- 구독 관리 화면
- 회원 관리 화면

### 2. 관리자 페이지 메뉴 구조

확인할 메뉴 예시:

- 대시보드
- 상품 관리
- 주문 관리
- 구독 관리
- 회원 관리
- 리뷰 관리
- 클래스/예약 관리
- 배너 관리
- QR 관리

### 3. 실제 판매 상품 구조

확인할 내용:

- 원두만 판매하는지
- 드립백도 판매하는지
- 굿즈도 판매하는지
- 클래스도 상품처럼 취급하는지
- 구독 상품을 일반 상품과 같은 Product로 관리할지
- 옵션 종류는 무엇인지

옵션 예시:

- 용량
- 분쇄도
- 로스팅 정도
- 수량
- 배송 주기

### 4. 주문/결제 정책

확인할 내용:

- 무료배송 기준
- 쿠폰 정책
- 적립금 사용 여부
- 부분 취소 가능 여부
- 선택 상품만 구매 가능 여부
- 비회원 주문 가능 여부

### 5. 구독 정책

확인할 내용:

- 구독 주기
- 스킵 가능 여부
- 일시정지 가능 여부
- 상품 변경 가능 여부
- 결제 실패 시 처리 방식
- 다음 배송일 계산 방식

### 6. 회원/권한 정책

확인할 내용:

- 일반 회원만 있는지
- 관리자 권한이 여러 단계인지
- 소셜 로그인 여부
- 휴대폰 인증이 실제로 필요한지
- 이메일 인증이 실제로 필요한지

### 7. 백엔드 예정 API 방식

확인할 내용:

- 이미 백엔드가 있는지
- REST 방식인지 GraphQL 방식인지
- 응답 형식 규칙이 있는지
- pagination 방식
- 에러 응답 형식

## 권장 진행 순서

1. Product, ProductOption, CartItem, Order, Subscription, User 타입을 먼저 확정한다.
2. 사용자 앱과 관리자 페이지가 같은 타입을 공유할 수 있게 도메인별 types 파일을 정리한다.
3. mock 데이터가 확정된 타입을 만족하도록 수정한다.
4. page는 mock을 직접 import하지 않고 hook 또는 repository만 사용하게 만든다.
5. API adapter만 실제 서버로 교체할 수 있게 유지한다.

## 우선순위

가장 먼저 필요한 자료:

1. 관리자 페이지 피그마 링크
2. 관리자 메뉴 목록
3. 실제 상품 옵션 정책

이 세 가지가 있으면 프론트 전체 데이터 모델 초안을 더 정확하게 확정할 수 있다.
