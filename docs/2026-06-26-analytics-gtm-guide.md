# 2026-06-26 Dicha Analytics / GTM 작업 기록

## 목적

Dicha client에서 사용자의 상품 탐색, 취향 테스트, 장바구니, 구매, 비회원 주문, 구독자 행동 차이를 GA4에서 분석할 수 있도록 Google Tag Manager 기반 이벤트 수집 구조를 설계하고 1차 구현했다.

핵심 분석 질문:

- 사람들이 어떤 상품을 많이 보는가?
- 취향 테스트가 구매로 이어지는가?
- 비회원 구매가 실제로 쓰이는가?
- 홈의 어떤 섹션이 상품 클릭을 만드는가?
- 구독 상태인 사용자가 상품 구매도 하는가?

## 사용 ID

- GTM Container ID: `GTM-MZ49S52B`
- GA4 Measurement ID: `G-WR772CRB4Q`

## 오늘 만든 문서/파일

### GTM/GA4 설계 문서

`docs/gtm/dicha-ga4-event-spec.md`

역할:

- 사람이 읽는 이벤트 설계서
- 어떤 이벤트를 언제 보내는지 정리
- 이벤트별 파라미터, 검색어 처리, 홈 섹션 이름, 구매 이벤트 기준 등을 기록

### GTM Import JSON

`docs/gtm/dicha-ga4-container-import.json`

역할:

- GTM 화면에서 `Admin > Import Container`로 올리는 파일
- GA4 Measurement ID 상수 변수 생성
- dataLayer 변수 생성
- Dicha analytics custom event trigger 생성
- GA4 event router tag 생성

주의:

- 이 JSON은 기존 `GTM-MZ49S52B` 컨테이너에 `Merge` 방식으로 import하는 용도다.
- import 후 바로 publish하지 말고 Preview와 GA4 DebugView에서 먼저 확인해야 한다.

## GTM Import 방법

1. Google Tag Manager에서 `GTM-MZ49S52B` 컨테이너 접속
2. `Admin > Import Container` 이동
3. `docs/gtm/dicha-ga4-container-import.json` 업로드
4. Workspace는 새 workspace 생성 권장
5. Import option은 `Merge` 선택
6. 태그/트리거/변수가 정상 생성되는지 확인
7. `Preview` 실행
8. Dicha client에서 이벤트가 들어오는지 확인
9. GA4 DebugView에서 이벤트 확인
10. 정상 확인 후 Publish

## Import 중 발생했던 에러와 해결

### 1. `Unrecognized value [template]`

원인:

GTM import JSON의 parameter type enum은 대문자를 요구하는데, 처음 만든 JSON에는 `template`, `integer`, `boolean`, `list`, `map`처럼 소문자가 들어가 있었다.

해결:

- `template` -> `TEMPLATE`
- `integer` -> `INTEGER`
- `boolean` -> `BOOLEAN`
- `list` -> `LIST`
- `map` -> `MAP`
- `matchRegex` -> `MATCH_REGEX`

### 2. `measurementIdOverride: 값을 입력해야 합니다`

원인:

GA4 Event 태그(`gaawe`)의 measurement ID parameter key가 `measurementId`가 아니라 `measurementIdOverride`여야 했다.

해결:

`docs/gtm/dicha-ga4-container-import.json`에서 key를 `measurementIdOverride`로 변경했다.

현재 값:

```json
{
  "type": "TEMPLATE",
  "key": "measurementIdOverride",
  "value": "{{Constant - GA4 Measurement ID}}"
}
```

## client 코드 작업

### 1. 직접 `gtag.js` 제거

수정 파일:

- `apps/client/index.html`

처리 내용:

- 직접 GA4 `gtag.js` 스크립트 제거
- GTM 스니펫만 유지
- `noscript` iframe을 `<body>` 첫 부분으로 이동

이유:

GTM과 직접 `gtag.js`를 동시에 쓰면 page_view나 이벤트가 중복 수집될 수 있다. 이번 구조는 GTM import 방식으로 GA4 이벤트를 보낼 것이므로 GTM만 남겼다.

### 2. analytics helper 추가

추가 파일:

- `apps/client/src/services/analytics/analytics.ts`
- `apps/client/src/services/analytics/AnalyticsContextProvider.tsx`
- `apps/client/src/services/analytics/index.ts`

주요 역할:

- `window.dataLayer.push(...)` 래핑
- 공통 사용자 컨텍스트 관리
- GA4 ecommerce item shape 변환
- 검색어 개인정보 redaction
- 검색어 2글자 이상 조건 처리

대표 사용 예:

```ts
trackAnalyticsEvent("add_to_cart", {
  currency: "KRW",
  value: totalPrice,
  items: [toAnalyticsItem(product)],
});
```

### 3. AnalyticsContextProvider 연결

수정 파일:

- `apps/client/src/app/providers/AppProviders.tsx`

처리 내용:

- `QueryProvider` 내부에서 `AnalyticsContextProvider`로 라우터를 감쌈
- 로그인 상태와 구독 상태를 전역 analytics context로 유지
- 로그인/세션 복원/구독 상태 확인 시 `user_context_set` 이벤트 전송

공통 컨텍스트:

```ts
{
  user_id,
  login_status: "anonymous" | "member",
  user_tier,
  is_subscription_active
}
```

개인정보 주의:

- `user_id`는 내부 회원 id만 사용
- 이메일, 이름, 전화번호는 GA4/GTM으로 보내지 않음

## 구현한 이벤트

### 사용자/구독 컨텍스트

- `user_context_set`

발생 시점:

- anonymous 상태 확정
- 로그인/세션 복원 성공
- 구독 조회 완료 후 context 갱신

### 상품 탐색

- `view_item_list`
- `select_item`
- `view_item`

적용 위치:

- 상품 목록 페이지
- 검색 결과
- 홈 베스트 상품
- 홈 로스터 추천
- 상품 상세 페이지

`item_list_name` 예시:

- `product_list`
- `product_search_results`
- `search_results`
- `home_best_products`
- `home_roaster_pick`
- `product_best_selection`
- `product_owner_pick`

### 검색

- `search`

조건:

- 검색 결과 로딩 완료 후
- 검색어 2글자 이상
- 같은 페이지 체류 중 같은 검색어 중복 발행 방지
- 이메일/전화번호처럼 보이면 `[redacted]`

파라미터:

```ts
{
  search_term,
  result_count
}
```

### 장바구니

- `add_to_cart`
- `view_cart`
- `remove_from_cart`

적용 위치:

- 상품 상세 장바구니 추가
- 장바구니 페이지 진입/아이템 변경
- 장바구니 아이템 삭제/선택 삭제

### 구매

- `begin_checkout`
- `add_shipping_info`
- `add_payment_info`
- `order_created`
- `guest_order_created`
- `purchase`

현재 기준:

- `purchase`는 주문 생성 성공 시점에 발행
- 실제 결제 연동이 붙으면 `purchase`는 결제 성공 시점으로 옮기고, `order_created`는 주문 생성 성공 시점에 그대로 둔다.

비회원 주문 성공 시:

```txt
order_created
guest_order_created
purchase
```

세 이벤트를 모두 보낸다.

### 홈 섹션 클릭

- `home_section_click`

섹션 이름:

- `hero`
- `quick_links`
- `best_products`
- `roaster_pick`
- `story`
- `review`
- `bottom_tab`
- `header`

현재 적용:

- hero CTA
- home best products
- roaster pick
- story card
- header search/cart
- bottom tab

### 취향 테스트

- `taste_test_start`
- `taste_test_answer`
- `taste_test_complete`

답변 이벤트:

```ts
{
  question_id,
  question_key,
  answer_value,
  step_index
}
```

완료 이벤트:

```ts
{
  acidity,
  body,
  sweetness,
  primary_flavor_note,
  recommended_item_ids
}
```

답변은 화면 문구가 아니라 코드값을 보낸다.

## 검증 결과

타입 체크:

```bash
pnpm --filter @dicha/client exec tsc --noEmit
```

결과:

- 통과

린트:

```bash
pnpm --filter @dicha/client lint
```

결과:

- 실패
- 원인은 이번 analytics 작업 파일이 아니라 기존 `apps/client/src/features/my-page/components/MyTasteProfileCard.tsx`의 `react-hooks/static-components` 에러

해당 에러:

- `getFlavorIcon(...)` 결과를 렌더 중 컴포넌트로 생성하는 패턴 때문에 발생
- analytics 작업과 직접 관련 없음

## 다음 작업

1. GTM import 재시도
2. GTM Preview에서 `dataLayer` 이벤트 확인
3. GA4 DebugView에서 이벤트 수집 확인
4. 중복 page_view/event 발생 여부 확인
5. `MyTasteProfileCard.tsx` 기존 lint 에러 수정
6. 필요하면 `quick_links`, `review` 섹션 이벤트도 추가 보강
7. 실제 결제 연동 시 `purchase` 발행 시점을 결제 성공으로 이동

## 운영 주의사항

- GA4로 이메일, 이름, 전화번호 등 개인정보를 보내지 않는다.
- 검색어는 email/phone 패턴이면 `[redacted]`로 보낸다.
- GTM import 후 바로 Publish하지 않고 Preview에서 먼저 검증한다.
- 직접 `gtag.js`를 다시 추가하지 않는다. 현재 구조는 GTM 단일 진입 방식이다.
- `purchase` 이벤트는 GA4 전자상거래 핵심 이벤트라 중복 발행 여부를 반드시 확인한다.

## Google Tag Manager 사용 방법

GTM은 코드에 직접 GA4 태그를 계속 추가하지 않고, 웹 화면에서 태그/트리거/변수를 관리하는 도구다. Dicha client는 `index.html`에 GTM 스니펫만 두고, React 코드에서는 `window.dataLayer.push(...)`로 이벤트를 보낸다.

### 기본 흐름

1. client 코드에서 이벤트 발생
2. `trackAnalyticsEvent(...)`가 `dataLayer.push(...)` 실행
3. GTM이 dataLayer event를 감지
4. GTM trigger가 실행
5. GTM tag가 GA4로 이벤트 전송
6. GA4에서 이벤트/전환/보고서로 확인

### Preview로 확인하는 법

1. GTM에서 `Preview` 클릭
2. Dicha client URL 입력
3. 새 창에서 사이트가 열리면 실제 사용자처럼 행동
4. Tag Assistant 화면에서 왼쪽 이벤트 목록 확인
5. `add_to_cart`, `search`, `purchase` 같은 이벤트가 뜨는지 확인
6. 해당 이벤트 클릭 후 Tags 탭에서 GA4 태그가 Fired 되었는지 확인
7. Variables 탭에서 `items`, `value`, `user_id`, `login_status` 값이 잘 들어왔는지 확인

### Import JSON 적용 방법

1. GTM `Admin` 이동
2. `Import Container` 클릭
3. `docs/gtm/dicha-ga4-container-import.json` 업로드
4. 새 Workspace 선택 권장
5. `Merge` 선택
6. 충돌이 나오면 기존 태그를 덮어쓸지 새로 만들지 확인
7. Import 후 Preview로 먼저 검증
8. 문제가 없을 때만 Submit/Publish

### 태그를 수정해야 할 때

GA4 Measurement ID를 바꾸고 싶으면:

- Variables
- `Constant - GA4 Measurement ID`
- 값을 새 `G-...` ID로 수정

이벤트 파라미터를 추가하고 싶으면:

- Variables에서 Data Layer Variable 추가
- `GA4 - Dicha dataLayer event router` 태그 열기
- Event Parameters에 새 parameter 추가
- Preview로 확인 후 Publish

새 이벤트명을 추가하고 싶으면:

- `CE - Dicha analytics events` trigger 열기
- 정규식에 새 이벤트명 추가
- client 코드에서 같은 이벤트명으로 `trackAnalyticsEvent(...)` 호출
- Preview로 확인

예:

```txt
^(...|subscribe_start|subscribe_complete)$
```

### Publish할 때 적을 내용

GTM Publish 전 Version Name과 Description을 남기면 나중에 추적하기 쉽다.

예:

```txt
Version Name: Dicha GA4 ecommerce events v1
Description: Added GA4 event router for product, search, cart, checkout, taste test, and user context events.
```

## Google Analytics 4 사용 방법

GA4는 GTM이 보낸 이벤트를 보고 분석하는 곳이다. GTM은 보내는 도구, GA4는 보는 도구라고 생각하면 된다.

### 실시간 이벤트 확인

1. GA4 속성 접속
2. `Reports > Realtime` 이동
3. 사이트에서 상품 보기, 검색, 장바구니 추가 등을 실행
4. Realtime에서 이벤트 이름이 들어오는지 확인

더 자세한 디버깅:

1. GA4 `Admin` 이동
2. `DebugView` 이동
3. GTM Preview 상태로 사이트 조작
4. 이벤트 타임라인에서 `view_item`, `add_to_cart`, `purchase` 확인
5. 이벤트를 클릭해서 parameter 값 확인

### 이벤트 목록 확인

1. GA4 `Admin`
2. `Data display > Events` 또는 `Events` 메뉴
3. 수집된 이벤트 이름 확인

확인할 주요 이벤트:

- `view_item`
- `select_item`
- `add_to_cart`
- `view_cart`
- `begin_checkout`
- `purchase`
- `search`
- `home_section_click`
- `taste_test_start`
- `taste_test_answer`
- `taste_test_complete`
- `user_context_set`

### 전환으로 설정할 이벤트

초기 추천:

- `purchase`
- 필요하면 `begin_checkout`
- 필요하면 `taste_test_complete`

전환 설정 방법:

1. GA4 `Admin`
2. `Events`
3. 원하는 이벤트를 `Mark as key event` 또는 전환 이벤트로 설정

`purchase`는 실제 매출 분석과 연결되므로 가장 중요하다.

### 전자상거래 보고서 확인

GA4 전자상거래 보고서에서 보려면 `items`, `value`, `currency`, `transaction_id` 같은 값이 잘 들어가야 한다.

확인 위치:

- `Reports > Monetization`
- `Ecommerce purchases`

주요 확인 값:

- 상품별 조회
- 상품별 클릭
- 장바구니 추가
- 구매
- 총 매출 또는 주문 금액

현재 Dicha는 실제 결제 전이므로 `purchase`는 주문 생성 성공 기준이다. 나중에 결제가 붙으면 `purchase` 발행 시점을 결제 성공으로 옮긴다.

### Exploration에서 분석하는 법

GA4 기본 보고서보다 자세히 보려면 Exploration을 쓴다.

예시 1: 취향 테스트가 구매로 이어지는지

1. `Explore > Funnel exploration`
2. Step 1: `taste_test_complete`
3. Step 2: `view_item`
4. Step 3: `add_to_cart`
5. Step 4: `purchase`

예시 2: 비회원 구매가 얼마나 쓰이는지

1. `Explore > Free form`
2. Dimension: `orderer_type`
3. Metric: Event count, Purchase revenue 또는 Total users
4. Event filter: `purchase`

예시 3: 홈 섹션별 상품 클릭

1. `Explore > Free form`
2. Dimension: `section_name`
3. Metric: Event count
4. Event filter: `home_section_click`

예시 4: 구독자와 비구독자 구매 비교

1. Dimension: `is_subscription_active`
2. Metric: Event count, Total users, Purchase revenue
3. Event filter: `purchase`

### Custom dimensions 등록

GA4에서 커스텀 파라미터를 보고서 차원으로 쓰려면 Custom dimension 등록이 필요하다.

추천 등록 항목:

- `login_status`
- `user_tier`
- `is_subscription_active`
- `orderer_type`
- `section_name`
- `search_term`
- `result_count`
- `payment_type`
- `checkout_mode`
- `primary_flavor_note`

등록 방법:

1. GA4 `Admin`
2. `Custom definitions`
3. `Create custom dimension`
4. Dimension name 입력
5. Scope는 대부분 `Event`
6. Event parameter에 동일한 parameter 이름 입력

예:

```txt
Dimension name: Section Name
Scope: Event
Event parameter: section_name
```

`user_tier`, `is_subscription_active`는 user property로도 볼 수 있다. 다만 이벤트마다 같이 보내고 있으므로 Event scope custom dimension으로도 분석 가능하다.

### 자주 보는 체크리스트

- GTM Preview에서 태그가 Fired 되는가?
- GA4 DebugView에서 이벤트가 보이는가?
- `items` 배열이 비어 있지 않은가?
- `purchase`가 한 주문에 한 번만 찍히는가?
- 검색어에 이메일/전화번호가 들어오면 `[redacted]` 되는가?
- `user_id`에 이메일이 아니라 내부 id가 들어오는가?
- `is_subscription_active` 값이 로그인 사용자에게 정상 반영되는가?
