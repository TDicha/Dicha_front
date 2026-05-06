# Pages 컴포넌트 분리 계획

## 목표

`src/pages` 아래의 page 파일은 라우팅 단위의 조립 역할만 맡도록 정리한다.

page에는 다음 책임만 남긴다.

- route param, navigate, location 같은 라우터 연결
- store, feature hook, mutation 연결
- page 단위 상태와 이벤트 핸들러
- loading, error, empty 같은 큰 상태 분기
- feature 컴포넌트를 배치하는 최상위 레이아웃

화면의 실제 섹션 UI는 기본적으로 각 feature의 `components` 아래로 분리한다. 이 계획은 `ProductDetailPage`를 포함한 전체 `src/pages`를 대상으로 한다.

## 분리 기준

### page에 남길 것

- `useParams`, `useNavigate`, `useLocation` 사용
- `useAuthStore`, `useCartStore`, `useCheckoutStore` 같은 앱 상태 연결
- `useProducts`, `useOrders`, `useCreateOrder` 같은 feature hook 호출
- 선택된 tab/filter/step/input 같은 page workflow 상태
- submit, navigate, create draft, mutation 실행 같은 orchestration handler
- 각 섹션 컴포넌트에 필요한 props를 계산해서 넘기는 일

### feature 컴포넌트로 분리할 것

- `<section>` 안에 들어가는 의미 있는 UI 블록
- section 내부에서 반복되는 card, row, item
- page 안에서만 쓰이지만 도메인 의미가 있는 UI
- page를 읽을 때 로직보다 마크업이 길어지게 만드는 영역

### feature hook 또는 repository로 이동할 것

- page의 `@/mock/*` 직접 import
- mock data filtering, sorting, lookup
- 화면 밖에서도 의미가 있는 data transform

### 분리하지 않을 것

- 1회성이고 매우 짧은 wrapper
- page의 상태 흐름을 오히려 숨기는 과도한 컴포넌트
- 스타일만 비슷하고 의미가 다른 UI를 억지로 common화하는 것

## 공통 컴포넌트 승격 기준

`components/common`은 진짜 공용 UI만 받는다.

다음 조건을 모두 만족할 때만 common으로 올린다.

- 2개 이상의 page 또는 feature에서 거의 같은 마크업으로 반복된다.
- domain data 타입에 직접 의존하지 않는다.
- label, icon, selected, disabled, onClick 같은 일반 props로 설명된다.
- common으로 올렸을 때 이름이 도메인 단어가 아니라 UI 패턴 이름이 된다.

common 후보 예시는 다음과 같다.

- `QuantityStepper`: 수량 증가/감소 버튼
- `SelectableChip`: 검색어, 카테고리, 필터 chip
- `FilterSegment`: 전체/진행중/완료 같은 단일 선택 필터
- `ActionRow`: label, value, chevron을 가진 행
- `RatingText`: 별점 텍스트 표시

반대로 상품명, 주문번호, 배송지, 구독권 같은 도메인 의미를 가진 컴포넌트는 feature 안에 둔다.

## 컴포넌트 위치 규칙

- 상품: `src/features/products/components/...`
- 장바구니: `src/features/cart/components/...`
- checkout: `src/features/checkout/components/...`
- 주문: `src/features/orders/components/...`
- 인증: `src/features/auth/components/...`
- 홈: `src/features/home/components/...`
- 마이페이지: `src/features/my-page/components/...`
- 예약: `src/features/reservation/components/...`
- 구독: `src/features/subscription/components/...`
- 취향 테스트: `src/features/taste-test/components/...`
- QR: `src/features/qr/components/...`
- 공용 UI: `src/components/common/...`

## 우선순위

### 1순위

- `ProductDetailPage`
- `PurchasePage`
- `SignupPage`
- `TasteTestPage`
- `CartPage`
- `OrderListPage`

긴 page이고 상태, 섹션, 반복 UI가 많이 섞여 있다. 먼저 분리하면 이후 feature 구조 기준을 잡기 쉽다.

### 2순위

- `SubscriptionPage`
- `HomePage`
- `QrPage`
- `ProductListPage`

섹션이 명확하고 재사용 가능한 카드/필터 UI 후보가 있다.

### 3순위

- `ReservationPage`
- `MyBlendPage`
- `LoginPage`
- `SearchPage`
- `MyPage`
- `ClassReservationPage`
- `GuestOrderLookupPage`
- `AccountSectionPage`
- `NotFoundPage`

상대적으로 짧거나 page 자체가 단순하다. 다만 도메인별 feature 컴포넌트 위치를 맞추기 위해 후속 정리를 진행한다.

## 페이지별 분리 계획

### ProductDetailPage

현재 문제:

- 상품 조회, 옵션 선택, 장바구니/바로구매 생성, 섹션 마크업이 한 파일에 섞여 있다.
- hero, summary, option, brewing guide, notes, story, review, bottom action bar, bottom sheet가 모두 page에 있다.
- `SectionRow`, `getRatingText`, note chip 색상 같은 내부 UI helper가 page에 있다.

분리할 feature 컴포넌트:

- `ProductDetailHeader`
- `ProductHeroSection`
- `ProductSummarySection`
- `ProductOptionSection`
- `ProductBrewingGuideSection`
- `ProductFlavorNotesSection`
- `ProductStorySection`
- `ProductReviewSection`
- `ProductBottomActionBar`
- `ProductOptionBottomSheet`
- `ProductDetailActionRow`

common 추출 후보:

- `QuantityStepper`
- `ActionRow`
- `RatingText`
- `SelectableChip` 또는 `ColorChip`

page에 남길 책임:

- `productId` param 읽기
- `useProduct`, `useProductOptions` 호출
- selected option, quantity 상태 관리
- `handleAddToCart`, `handlePurchase` 실행
- loading/error/empty 분기

검증 포인트:

- 옵션 미선택 시 바텀시트가 열린다.
- 장바구니 담기와 바로구매 동작이 유지된다.
- 없는 상품 id에서 empty 상태가 유지된다.

### PurchasePage

현재 문제:

- checkout draft 조회, 주문 생성 mutation, 완료 상태, 배송지/결제/상품/금액 UI가 한 파일에 있다.
- 회원/비회원 payload 생성 로직과 UI 마크업이 섞여 있다.
- 주문 완료 화면과 checkout 화면이 같은 page 안에서 길게 분기된다.

분리할 feature 컴포넌트:

- `PurchaseEmptyState`
- `PurchaseCompleteView`
- `PurchaseHeaderSection`
- `ShippingAddressSection`
- `PaymentMethodSection`
- `PurchaseItemsSection`
- `PurchasePricingSection`
- `PurchaseBottomActionBar`

common 추출 후보:

- `PaymentOptionRow`
- `PricingSummary`
- `RadioSelectRow`

page에 남길 책임:

- checkout draft 읽기
- auth user/status 읽기
- payment method 상태 관리
- 주문 payload 생성
- `useCreateOrder` 실행
- cart item 제거와 draft 초기화

검증 포인트:

- draft가 없으면 장바구니 이동 안내가 보인다.
- 주문 생성 후 주문번호와 금액이 유지된다.
- cart 구매는 구매한 item만 제거된다.

### SignupPage

현재 문제:

- 약관, 정보 입력, 완료 화면이 한 파일에 모두 있다.
- password validation, agreement state, phone/email 인증 UI가 섞여 있다.
- 반복되는 입력 row와 check row가 page 내부에 직접 작성되어 있다.

분리할 feature 컴포넌트:

- `SignupProgressHeader`
- `SignupTermsStep`
- `SignupDetailsStep`
- `SignupCompleteStep`
- `AgreementRow`
- `PasswordRuleList`
- `VerificationFieldGroup`

common 추출 후보:

- `AuthInputRow`
- `CheckRow`
- `ProgressBar`

page에 남길 책임:

- signup step 상태
- agreement/form state
- password validation 계산
- `signUp` 실행
- step 이동 handler

검증 포인트:

- 필수 약관 동의 전 다음 버튼 disabled 유지
- 비밀번호 8자 이상 및 3종 이상 조합 검증 유지
- 회원가입 성공 시 완료 step 표시

### TasteTestPage

현재 문제:

- 테스트 진행 화면, 질문/옵션, 결과 화면, 추천 상품 섹션이 한 파일에 있다.
- progress, selected answer, result summary, recommendation UI가 섞여 있다.
- mock product 추천 조회가 page에 직접 남아 있다.

분리할 feature 컴포넌트:

- `TasteTestIntroView`
- `TasteQuestionView`
- `TasteOptionCard`
- `TasteProgressHeader`
- `TasteResultView`
- `TasteProfileSummary`
- `TasteScoreBars`
- `TasteRecommendedProducts`

common 추출 후보:

- `ProgressBar`
- `MetricBar`
- `SelectableCard`

page에 남길 책임:

- 현재 질문 index
- 답변 상태
- 결과 계산 호출
- 다시하기/다음 질문 handler

검증 포인트:

- 질문 진행 순서가 유지된다.
- 모든 답변 완료 후 결과 화면으로 전환된다.
- 추천 상품 링크가 유지된다.

### CartPage

현재 문제:

- empty state, 추천 상품, 전체 선택, cart item list, 가격 요약, bottom action bar가 한 파일에 있다.
- cart item card 내부 마크업이 길고 선택/수량/삭제 로직과 섞여 있다.
- 추천 상품을 위해 page가 mock product를 직접 본다.

분리할 feature 컴포넌트:

- `CartEmptyState`
- `CartRecommendedProducts`
- `CartSelectToolbar`
- `CartItemList`
- `CartItemCard`
- `CartPricingSection`
- `CartBottomCheckoutBar`

common 추출 후보:

- `QuantityStepper`
- `SelectBoxButton`
- `PricingSummary`
- `ProductMiniCard`

page에 남길 책임:

- cart store 연결
- selected items 계산
- checkout draft 생성
- 전체 선택/해제, 선택 삭제 handler
- 구매 페이지 이동

검증 포인트:

- 같은 상품의 다른 옵션이 별도 item으로 표시된다.
- 전체 선택/해제와 선택 삭제가 동작한다.
- 선택 상품이 없으면 구매 버튼 disabled 유지

### OrderListPage

현재 문제:

- filter 상태, 주문 조회 hook, 주문 카드, empty 추천 상품 UI가 한 파일에 있다.
- 주문 status meta와 카드 UI가 page에 직접 들어 있다.
- 추천 상품 조회를 위해 page가 mock product를 직접 본다.

분리할 feature 컴포넌트:

- `OrderFilterTabs`
- `OrderList`
- `OrderCard`
- `OrderEmptyState`
- `RecommendedProductGrid`

common 추출 후보:

- `FilterSegment`
- `StatusBadge`
- `ProductMiniCard`

page에 남길 책임:

- filter 상태
- `useOrders` 호출
- filtered orders 계산
- loading/error/empty/list 분기

검증 포인트:

- 전체/진행중/완료 필터가 유지된다.
- 주문번호, 상태, 금액이 정상 표시된다.
- 주문이 없을 때 추천 상품이 표시된다.

### SubscriptionPage

현재 문제:

- 구독 plan 선택, plan summary, perk list, cycle option, delivery history가 한 파일에 있다.
- mock subscription detail 조회가 page에 있다.
- 반복되는 option card와 history row가 page에 직접 있다.

분리할 feature 컴포넌트:

- `SubscriptionHeroSection`
- `SubscriptionPlanTabs`
- `SubscriptionPlanSummary`
- `SubscriptionPerkList`
- `SubscriptionCycleSection`
- `SubscriptionDeliveryHistory`
- `SubscriptionBottomActionBar`

common 추출 후보:

- `SelectableCard`
- `TimelineRow`
- `FeatureList`

page에 남길 책임:

- selected plan/cycle 상태
- subscription detail 조회 hook 연결
- 신청/변경 handler

검증 포인트:

- plan 변경 시 표시 정보가 바뀐다.
- cycle 선택 UI가 유지된다.
- 배송 이력 표시가 유지된다.

### HomePage

현재 문제:

- hero, quick links, best products, roaster pick, reviews가 한 파일에 있다.
- mock home/product/review 데이터를 page가 직접 본다.
- home 전용 카드와 섹션이 page에 직접 있다.

분리할 feature 컴포넌트:

- `HomeHeroSection`
- `HomeQuickLinks`
- `HomeBestProductsSection`
- `HomeRoasterPickSection`
- `HomeReviewSection`

common 추출 후보:

- `SectionTitle` 확장
- `ProductMiniCard`
- `ReviewCard`

page에 남길 책임:

- home data hook 호출
- 섹션 순서 조립
- route link 연결

검증 포인트:

- 홈 첫 화면 구성과 링크가 유지된다.
- 인기 상품과 리뷰가 정상 표시된다.

### QrPage

현재 문제:

- QR hero, scanner placeholder, use case cards, result preview, guide 영역이 page에 있다.
- QR resolve 상태와 화면 마크업이 섞여 있다.

분리할 feature 컴포넌트:

- `QrHeroSection`
- `QrScannerPanel`
- `QrUseCaseGrid`
- `QrResultPreview`
- `QrGuideSection`

common 추출 후보:

- `IconInfoCard`
- `ActionPanel`

page에 남길 책임:

- QR input/result 상태
- resolve handler
- result target navigation

검증 포인트:

- QR resolve mock 흐름이 유지된다.
- 상품 상세/나의 블렌드 이동이 유지된다.

### ProductListPage

현재 문제:

- 검색 input, category filter, sort filter, grid, 더보기가 page에 있다.
- category와 sort UI가 common화 후보로 보인다.
- page가 product list 조회와 화면 마크업을 함께 가진다.

분리할 feature 컴포넌트:

- `ProductListSearchBar`
- `ProductCategoryFilter`
- `ProductSortTabs`
- `ProductGrid`
- `ProductLoadMoreButton`

common 추출 후보:

- `FilterChipList`
- `SortSegment`

page에 남길 책임:

- query/category/sort/visible count 상태
- `useProducts` 호출
- 정렬 및 visible products 계산

검증 포인트:

- 검색, 카테고리, 정렬, 더보기가 유지된다.
- loading/error/empty 상태가 유지된다.

### ReservationPage

현재 문제:

- hero, plan selection, plan cards, reservation CTA가 page에 있다.
- plan card 반복 UI가 page 내부에 있다.

분리할 feature 컴포넌트:

- `ReservationHeroSection`
- `ReservationPlanList`
- `ReservationPlanCard`
- `ReservationNoticeSection`
- `ReservationBottomActionBar`

common 추출 후보:

- `SelectableCard`
- `PriceLabel`

page에 남길 책임:

- selected plan 상태
- 예약 진행 handler

검증 포인트:

- plan 선택 상태가 유지된다.
- 가격 표시와 CTA가 유지된다.

### MyBlendPage

현재 문제:

- empty/login 안내, profile summary, blend card list가 한 파일에 있다.
- mock blend data를 page가 직접 본다.
- blend card 내부 링크와 설명 UI가 길다.

분리할 feature 컴포넌트:

- `MyBlendEmptyState`
- `MyBlendSummaryCard`
- `MyBlendCardList`
- `MyBlendCard`

common 추출 후보:

- `TagList`
- `InfoCard`

page에 남길 책임:

- auth 상태 확인
- blend data hook 호출
- route 조립

검증 포인트:

- 로그인 전/후 표시가 유지된다.
- blend별 상품 상세 링크가 유지된다.

### LoginPage

현재 문제:

- 소셜 로그인 버튼, 이메일 로그인 form, 링크 영역이 page에 있다.
- auth input 스타일이 SignupPage와 중복될 가능성이 있다.

분리할 feature 컴포넌트:

- `LoginBrandHeader`
- `SocialLoginButtons`
- `EmailLoginForm`
- `LoginHelpLinks`

common 추출 후보:

- `AuthInputRow`
- `SocialLoginButton`

page에 남길 책임:

- email/password/rememberId 상태
- `signIn` 실행
- 로그인 성공 후 이전 route 복귀

검증 포인트:

- 로그인 성공 후 `location.state.from` 복귀가 유지된다.
- 오류 메시지 표시가 유지된다.

### SearchPage

현재 문제:

- 검색 input, 추천 검색어, 최근 검색, 결과 grid, empty/loading/error가 page에 있다.
- keyword chip 반복 UI가 page에 있다.

분리할 feature 컴포넌트:

- `SearchHeader`
- `RecommendedKeywordSection`
- `RecentKeywordSection`
- `SearchResultSummary`
- `SearchResultGrid`

common 추출 후보:

- `KeywordChip`
- `IconListRow`

page에 남길 책임:

- search query store 연결
- `useProducts({ query })` 호출
- 검색 여부 분기

검증 포인트:

- 추천/최근 검색어 클릭 시 query가 바뀐다.
- 검색 결과/없음/loading/error 상태가 유지된다.

### MyPage

현재 문제:

- profile, stats, account sections, quick links가 page에 있다.
- section row와 quick link row가 반복된다.

분리할 feature 컴포넌트:

- `MyPageProfileSection`
- `MyPageStatsGrid`
- `AccountSectionList`
- `MyPageQuickLinks`

common 추출 후보:

- `IconMenuRow`
- `StatGrid`

page에 남길 책임:

- auth user 연결
- sign out handler
- route link 조립

검증 포인트:

- 계정 관리 링크 이동이 유지된다.
- 로그아웃 동작이 유지된다.

### ClassReservationPage

현재 문제:

- 클래스 소개, 시간 슬롯, 포함 항목, 예약 CTA가 page에 있다.
- slot card와 included item이 반복된다.

분리할 feature 컴포넌트:

- `ClassReservationSummary`
- `ClassSlotList`
- `ClassSlotCard`
- `ClassIncludedItems`
- `ClassReservationBottomBar`

common 추출 후보:

- `SelectableCard`
- `IconInfoItem`

page에 남길 책임:

- 선택 슬롯 상태
- 예약 신청 handler

검증 포인트:

- 슬롯 선택 UI가 유지된다.
- 예약 CTA disabled/enabled 조건이 유지된다.

### GuestOrderLookupPage

현재 문제:

- lookup form, mutation 실행, 결과/없음 상태가 한 파일에 있다.
- input group과 result panel이 page에 직접 있다.

분리할 feature 컴포넌트:

- `GuestOrderLookupForm`
- `GuestOrderLookupResult`
- `GuestOrderLookupEmptyResult`

common 추출 후보:

- `FormField`
- `ResultPanel`

page에 남길 책임:

- form state
- `useLookupGuestOrder` mutation 실행
- 결과 분기

검증 포인트:

- 필수값 없을 때 조회 버튼 disabled 유지
- 주문번호/전화번호 일치 시 결과가 표시된다.

### AccountSectionPage

현재 문제:

- section lookup, item list, unknown section 상태가 한 파일에 있다.
- account item row가 반복된다.

분리할 feature 컴포넌트:

- `AccountSectionHeader`
- `AccountSectionItemList`
- `AccountSectionItemRow`
- `AccountSectionFallback`

common 추출 후보:

- `InfoListRow` 재사용 검토

page에 남길 책임:

- `sectionId` param 읽기
- section lookup
- navigate handler

검증 포인트:

- 유효한 section에서 item list 표시
- 없는 section에서 fallback 표시

### NotFoundPage

현재 문제:

- 단순한 static page라 큰 문제는 없다.
- 다만 empty/error page 패턴과 일관성을 맞출 수 있다.

분리할 feature 컴포넌트:

- 별도 feature 컴포넌트 분리는 필수 아님
- 기존 `EmptyState` 또는 app-level `NotFoundView`로 정리 가능

common 추출 후보:

- 없음

page에 남길 책임:

- 홈 이동 링크 제공

검증 포인트:

- 잘못된 route에서 표시된다.
- 홈 이동 링크가 유지된다.

## 단계별 작업 순서

### Step 1. 기준 컴포넌트부터 만든다

`ProductDetailPage`를 먼저 분리해서 feature 컴포넌트 위치, props 기준, index export 방식을 확정한다.

### Step 2. 상품 탐색 계열을 분리한다

`ProductListPage`, `SearchPage`, `HomePage`를 products/home feature 기준으로 나눈다.

완료 기준:
- 상품 카드, 상품 grid, 검색어 chip, category/sort filter 기준이 확정된다.
- 이후 Cart/Order에서 쓸 상품 미니 카드 공통 후보가 보인다.

### Step 3. 구매 흐름 페이지를 분리한다

`CartPage`, `PurchasePage`, `OrderListPage`, `GuestOrderLookupPage`를 checkout/order/cart feature 기준으로 나눈다.

완료 기준:
- 장바구니 선택 구매, 바로구매, 주문 생성, 주문 조회 흐름이 유지된다.
- 가격 요약, 수량 조절, 주문 카드 공통 후보가 확정된다.

### Step 4. 인증과 상태 진행형 페이지를 분리한다

`SignupPage`, `LoginPage`, `TasteTestPage`를 분리한다.

완료 기준:
- 인증 input 계열 common 후보가 확정된다.
- 취향 테스트 진행/결과 상태가 기존과 동일하다.

### Step 5. 나머지 도메인 페이지를 정리한다

`SubscriptionPage`, `ReservationPage`, `ClassReservationPage`, `MyPage`, `MyBlendPage`, `AccountSectionPage`, `QrPage`, `NotFoundPage`를 정리한다.

완료 기준:
- 모든 page가 같은 구조 규칙을 따른다.
- feature별 component 폴더가 일관되게 생긴다.

## 검증 계획

각 page 리팩터링 단위마다 아래를 실행한다.

```txt
pnpm run lint
pnpm run build
```

수동 확인 route:

```txt
/
/products
/products/ethiopia-yirgacheffe
/search
/cart
/purchase
/orders
/guest-orders
/login
/signup
/taste-test
/subscription
/reservation
/reservation/class
/mypage
/my-blend
/qr
```

기능 확인:

- 화면의 시각적 구성은 기존과 동일하다.
- 버튼, 링크, 선택 상태, disabled 상태가 유지된다.
- loading/error/empty 상태가 유지된다.
- page에서 mock 직접 import가 늘어나지 않는다.
- 새 common 컴포넌트가 도메인 타입에 의존하지 않는다.

## 완료 기준

- `src/pages`의 긴 JSX 섹션이 feature 컴포넌트로 이동했다.
- page 파일은 라우트 단위 조립과 상태 orchestration 중심으로 읽힌다.
- feature 컴포넌트는 도메인별 폴더에 모여 있다.
- 반복 UI 중 진짜 공용인 것만 `components/common`에 있다.
- 모든 변경 후 `pnpm run lint`, `pnpm run build`가 통과한다.
- 주요 라우트 수동 확인에서 기존 동작과 화면이 유지된다.
