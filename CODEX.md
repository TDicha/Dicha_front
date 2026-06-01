# ☕ Dicha Project — 백엔드 API 서버

Spring Boot + React 기반의 웹 애플리케이션 프로젝트의 백엔드 API 서버입니다.  
프론트엔드(React SPA)와 백엔드(Spring Boot REST API)를 완전히 분리한 구조로 설계되었습니다.

---

## 🚀 개발 진행 상황 (Backend)

> 담당 파트: 회원, 로그인, 게시판, 관리자, 마이페이지, 상품, 주문 등

- ✅ **1단계: 인증 시스템 완성**
    - [x] 비밀번호 암호화 (`Bcrypt`)
    - [x] 로그인/회원가입 API 구현
    - [x] JWT 발급 및 인증 필터 구현
    - [x] API 경로별 접근 제어 설정

- ✅ **2단계: 마이페이지 기능 구현**
    - [x] 내 정보 조회 API (`GET /api/members/me`)
    - [x] 내 정보 수정 API (`PUT /api/members/me`)
    - [x] 내가 쓴 게시글 목록 조회 API (`GET /api/members/me/boards`)

- ✅ **3단계: 게시판 기능 고도화**
    - [x] 게시글 작성자 정보 자동 연동 (JWT 기반)
    - [x] 게시글 수정/삭제 권한 검증
    - [x] 응답 데이터 DTO 분리 (`BoardResponseDto`)

- ✅ **4단계: 관리자 페이지 기능 구현**
    - [x] `Role` 기반 권한 관리 시스템 도입 (`USER`, `ADMIN`)
    - [x] 관리자용 회원/게시글 관리 API 구현 (`AdminController`)
    - [x] 관리자 API 접근 제어 설정 (`/api/admin/**`)

- ✅ **5단계: 상품 기능 구현**
    - [x] 카테고리 엔티티 및 CRUD API
    - [x] 상품 엔티티 및 CRUD API
    - [x] 상품 옵션, 검색, 필터 기능 구현

- ✅ **6단계: 커피 취향 테스트 기능 구현**
    - [x] 취향 테스트 API (`POST /api/taste-test`)
    - [x] 사용자 답변 기반 취향 분석 및 원두 추천 알고리즘 (유클리드 거리)
    - [x] 로그인 회원 취향 프로필 자동 저장

- ✅ **7단계: 장바구니 기능 구현**
    - [x] `CartItem` 엔티티 설계 및 CRUD API 구현
    - [x] 상품 중복 추가 시 수량 합산 로직 구현
    - [x] 아이템별 소유권 검증 로직 구현

- ✅ **8단계: 공통 인프라 및 편의 기능 구현**
    - [x] **인증 시스템 고도화**: Access Token(30분) + Refresh Token(7일, HttpOnly 쿠키) 이원화 및 Redis 연동.
    - [x] **안전한 로그아웃**: Redis의 Refresh Token 삭제 및 Access Token 블랙리스트 처리.
    - [x] **토큰 재발급 API**: `POST /api/members/refresh` 구현.
    - [x] **아이디/비밀번호 찾기**: 이메일 마스킹, 임시 비밀번호 발급 및 비동기 이메일 전송(`@Async`).
    - [x] **공용 이미지 업로드 API**: `POST /api/upload` 구현 및 `FileStorageService` 인터페이스화.

---

## 📌 목차

1. [프로젝트 개요](#1-프로젝트-개요)
2. [기술 스택](#2-기술-스택)
3. [시스템 아키텍처](#3-시스템-아키텍처)
4. [디렉터리 구조](#4-디렉터리-구조)
5. [초기 세팅 가이드](#5-초기-세팅-가이드)
6. [API 설계 방향](#6-api-설계-방향)
7. [DB 설계 개요](#7-db-설계-개요)

---

## 1. 프로젝트 개요

| 항목 | 내용 |
|------|------|
| 프로젝트명 | Dicha Project |
| 주제 | 로스팅 원두 커피 전문 쇼핑몰 |
| 아키텍처 | SPA + REST API (프론트엔드 / 백엔드 완전 분리) |
| 개발 환경 | Localhost (초기 개발 및 테스트) |
| 배포 환경 | Vercel (프론트엔드), AWS EC2 (백엔드), AWS RDS (DB) |

---

## 2. 기술 스택

### 프론트엔드
| 기술 | 버전 | 용도 |
|------|------|------|
| React | 18.x | SPA 프레임워크 |
| Vercel | - | 배포 및 호스팅 |

### 백엔드
| 기술 | 버전 | 용도 |
|------|------|------|
| Java | 17+ | 기반 언어 |
| Spring Boot | 3.2.x | REST API 서버 |
| Spring Data JPA | - | ORM / DB 연동 |
| Spring Security | - | 인증 / 인가 |
| Spring Boot Mail | - | 이메일 전송 |
| Lombok | - | 보일러플레이트 코드 제거 |
| JWT | 0.11.5 | 인증 토큰 |

### 데이터베이스 및 캐시
| 기술 | 버전 | 용도 |
|------|------|------|
| MySQL | 8.x | 관계형 DB |
| Redis | - | Refresh Token 저장, 캐싱 |
| AWS RDS | - | 운영 DB 호스팅 |

---

## 3. 시스템 아키텍처

```text
[사용자 브라우저]
      │
      ▼
[React SPA - Vercel]
      │  HTTP 요청 (REST API)
      ▼
[Spring Boot API 서버 - AWS EC2] ─── (Refresh Token 관리) ─── [Redis]
      │  JPA / SQL
      ▼
[MySQL - AWS RDS]
```

---

## 4. 디렉터리 구조

상세 설명은 `code_explanation.md` 파일 참조.

---

## 5. 초기 세팅 가이드 및 테스트

데이터베이스 설정 및 API 테스트 방법은 `database_setup.md`와 `api-test.http` 파일을 참조하세요.

---

## 6. API 설계 방향

모든 API는 `/api/` 접두사를 사용하며 RESTful 원칙을 따릅니다.  
**인증 방식**은 보안 강화를 위해 **Access Token(Body) + Refresh Token(HttpOnly Cookie)**을 사용합니다. (상세 내용은 `api_guide.md` 참조)

### 현재 구현된 API 목록

#### 회원 (`/api/members`)
| Method | URL | 권한 | 설명 |
|--------|-----|------|------|
| POST | `/signup` | 공개 | 회원가입 |
| POST | `/login` | 공개 | 로그인 (Access/Refresh Token 발급) |
| POST | `/logout` | 로그인 | 로그아웃 (토큰 비활성화) |
| POST | `/refresh` | 공개 | Access Token 재발급 |
| POST | `/find-email` | 공개 | 아이디(이메일) 찾기 |
| POST | `/find-password` | 공개 | 임시 비밀번호 발급 |
| GET | `/me` | 로그인 | 내 정보 조회 |
| PUT | `/me` | 로그인 | 내 정보 수정 |
| GET | `/me/boards` | 로그인 | 내가 쓴 게시글 목록 |

#### 공용 (`/api`)
| Method | URL | 권한 | 설명 |
|--------|-----|------|------|
| POST | `/upload` | 로그인 | 공용 이미지 업로드 |
| POST | `/taste-test` | 공개 | 커피 취향 테스트 및 추천 |

#### 게시판 (`/api/boards`)
| Method | URL | 권한 | 설명 |
|--------|-----|------|------|
| GET | `/` | 로그인 | 전체 게시글 목록 |
| GET | `/{id}` | 로그인 | 게시글 상세 조회 |
| POST | `/` | 로그인 | 게시글 작성 |
| PUT | `/{id}` | 작성자 | 게시글 수정 |
| DELETE | `/{id}` | 작성자 | 게시글 삭제 |

#### 카테고리 (`/api/categories`)
| Method | URL | 권한 | 설명 |
|--------|-----|------|------|
| GET | `/` | 공개 | 카테고리 목록 |
| POST | `/` | ADMIN | 카테고리 추가 |
| DELETE | `/{id}` | ADMIN | 카테고리 삭제 |

#### 상품 (`/api/products`)
| Method | URL | 권한 | 설명 |
|--------|-----|------|------|
| GET | `/` | 공개 | 판매 중 상품 전체 목록 |
| GET | `?categoryId={id}` | 공개 | 카테고리별 상품 목록 |
| GET | `?keyword={검색어}` | 공개 | 상품명 검색 |
| GET | `/{id}` | 공개 | 상품 상세 조회 |
| POST | `/` | ADMIN | 상품 추가 |
| PUT | `/{id}` | ADMIN | 상품 수정 |
| DELETE | `/{id}` | ADMIN | 상품 삭제 |

#### 장바구니 (`/api/cart`)
| Method | URL | 권한 | 설명 |
|--------|-----|------|------|
| GET | `/` | 로그인 | 내 장바구니 조회 |
| POST | `/items` | 로그인 | 상품 추가 (중복 시 수량 합산) |
| PUT | `/items/{id}` | 로그인 | 수량 변경 |
| DELETE | `/items/{id}` | 로그인 | 아이템 삭제 |
| DELETE | `/` | 로그인 | 장바구니 전체 비우기 |

---

## 7. DB 설계 개요

MySQL(`dicha_db`)에서 관리하는 주요 테이블과 Redis의 역할입니다.

| 저장소 | 관리 데이터 |
|----------|--------------|
| `member` | 회원 정보 (이메일, 비밀번호 암호화, 이름, Role) |
| `board`  | 커뮤니티 게시글 (제목, 내용, 작성자 FK) |
| `category` | 상품 카테고리 (name, slug, displayOrder) |
| `product` | 상품 정보 (이름, 가격, 이미지, 원산지, 로스팅 레벨, 판매 상태 등) |
| `product_option` | 상품 옵션 (이름, 추가 가격, 상품 FK) |
| `product_flavor_note` | 상품 향미 노트 목록 (`@ElementCollection`) |
| `product_badge` | 상품 뱃지 목록 — BEST / NEW / PICK (`@ElementCollection`) |
| `cart_item` | 장바구니 아이템 (회원 FK, 상품 FK, 옵션 FK, 수량) |
| **Redis** | **Refresh Token 저장**, **Access Token 블랙리스트** 관리 |

---

## 📝 개발 시 주의사항

- `spring.jpa.hibernate.ddl-auto` 설정
  - 개발 초기: `create` → 테이블 자동 생성
  - 이후 개발: `update` → 기존 데이터 유지하며 변경 반영
  - 운영 환경: `validate` 또는 `none` → 절대 `create` 사용 금지
- 비밀번호, JWT 비밀키, Redis/Email 접속 정보 등은 `application.properties`에 직접 작성하지 말고 환경 변수로 관리하는 것을 권장합니다.
- CORS `allowedOrigins`는 배포 시 반드시 운영 URL로 교체해야 합니다.

# Dicha 백엔드 API 연동 가이드

프론트엔드 개발자가 백엔드 API를 빠르게 연결할 수 있도록 작성한 문서입니다.

---

## 기본 정보

| 항목 | 내용 |
|------|------|
| Base URL | `http://localhost:8082` |
| 데이터 형식 | JSON (`Content-Type: application/json`) |
| 인증 방식 | JWT Bearer Token (Access Token + Refresh Token) |

---

## ADMIN 계정 테스트 방법

카테고리·상품 추가/수정/삭제는 ADMIN 권한이 필요합니다. 현재 회원가입 API는 무조건 `USER` 권한으로 생성되므로, ADMIN 테스트는 **DB에서 직접 권한을 변경**해야 합니다.

```sql
UPDATE member SET role = 'ADMIN' WHERE email = 'admin@example.com';
```

이후 해당 이메일로 로그인하면 ADMIN 토큰이 발급됩니다.

---

## ⭐️ 인증 방식 (Access + Refresh Token)

우리 프로젝트는 보안 강화를 위해 Access Token과 Refresh Token을 함께 사용하는 표준 인증 방식을 따릅니다.

- **Access Token**:
    - **유효기간**: 30분
    - **용도**: 실제 데이터 API를 호출할 때 사용.
    - **전달 방식**: `Authorization: Bearer {accessToken}` HTTP 헤더에 담아 전송.
    - **저장 위치**: 프론트엔드 메모리 (State 등)
- **Refresh Token**:
    - **유효기간**: 7일
    - **용도**: Access Token이 만료되었을 때, 새로운 Access Token을 발급받기 위해 사용.
    - **전달 방식**: 백엔드에서 `HttpOnly`, `Secure`, `SameSite=None` 쿠키로 자동 발급 및 관리. 프론트에서 직접 제어할 필요 없음.

### 인증 플로우

1.  **로그인**: 로그인 성공 시, 응답 Body로 `accessToken`을, 응답 헤더의 `Set-Cookie`로 `refreshToken`을 받습니다.
2.  **API 요청**: `accessToken`을 헤더에 담아 API를 호출합니다.
3.  **Access Token 만료 (401 에러)**: API 요청이 `401 Unauthorized` 에러를 반환하면, `/api/members/refresh` API를 호출합니다.
4.  **토큰 재발급**: `/refresh` API는 쿠키의 `refreshToken`을 검증하여 새로운 `accessToken`을 발급해줍니다.
5.  **재시도**: 새로 발급받은 `accessToken`으로 이전에 실패했던 API 요청을 다시 시도합니다.
6.  **Refresh Token 만료**: `/refresh` API 호출이 실패하면, 사용자는 다시 로그인해야 합니다.

### axios 인터셉터 설정 (강력 권장)

아래 설정은 토큰 관리 및 재발급 로직을 자동화하여 개발 편의성을 크게 높여줍니다.

```typescript
// src/services/api/client.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8082',
  withCredentials: true, // 쿠키를 주고받기 위해 필수!
});

// 요청 인터셉터: 모든 요청에 Access Token 자동 첨부
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken'); // 또는 state에서 가져오기
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 응답 인터셉터: 401 에러 발생 시 토큰 재발급 및 재요청 처리
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401 에러이고, 재시도한 요청이 아닐 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // 재시도 플래그 설정

      try {
        // 토큰 재발급 API 호출
        const res = await apiClient.post('/api/members/refresh');
        const newAccessToken = res.data.accessToken;

        // 새 토큰 저장
        localStorage.setItem('accessToken', newAccessToken);

        // 원래 요청의 헤더에 새 토큰 설정
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // 원래 요청 다시 보내기
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Refresh Token도 만료된 경우 (재발급 실패)
        localStorage.removeItem('accessToken');
        window.location.href = '/login'; // 로그인 페이지로 리디렉션
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
```

---

## 회원 API

### 로그인

```
POST /api/members/login
```
인증 불필요

**Request**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response** `200 OK`
- **Body**:
```json
{
  "accessToken": "eyJhbGci..."
}
```
- **Headers**:
```
Set-Cookie: refreshToken=eyJhbGci...; Path=/; Max-Age=604800; HttpOnly; Secure; SameSite=None
```

```typescript
const loginRes = await apiClient.post('/api/members/login', { email, password });
localStorage.setItem('accessToken', loginRes.data.accessToken);
// refreshToken은 브라우저가 쿠키로 자동 관리
```

---

### 로그아웃

```
POST /api/members/logout
```
인증 필요

**Response** `200 OK`
- **Headers**:
```
Set-Cookie: refreshToken=; Path=/; Max-Age=0
```
> 서버의 Redis에서 Refresh Token을 삭제하고, 클라이언트의 쿠키를 만료시킵니다.

```typescript
await apiClient.post('/api/members/logout');
localStorage.removeItem('accessToken');
```

---

### Access Token 재발급

```
POST /api/members/refresh
```
인증 불필요 (쿠키에 담긴 Refresh Token으로 인증)

**Response** `200 OK`
```json
{
  "accessToken": "eyJhbGci... (새로운 토큰)"
}
```
> 위 `axios` 인터셉터 사용 시 직접 호출할 일은 거의 없습니다.

---

### 아이디(이메일) 찾기

```
POST /api/members/find-email
```
인증 불필요

**Request**
```json
{
  "name": "홍길동",
  "phoneNumber": "010-1234-5678"
}
```

**Response** `200 OK`
```json
{
  "maskedEmail": "tes***@example.com"
}
```
> - 이름과 전화번호가 일치하는 회원이 없으면 `404 Not Found` 에러가 발생합니다.
> - 이메일의 `@` 앞 3자리를 제외하고 마스킹 처리됩니다.

---

### 임시 비밀번호 발급

```
POST /api/members/find-password
```
인증 불필요

**Request**
```json
{
  "email": "test@example.com",
  "name": "홍길동"
}
```

**Response** `200 OK`
```
"이메일로 임시 비밀번호가 발송되었습니다."
```
> - 이메일과 이름이 일치하는 회원이 없으면 `404 Not Found` 에러가 발생합니다.
> - 해당 이메일로 10자리의 임시 비밀번호가 발송되며, DB에도 암호화되어 업데이트됩니다.
> - 메일 발송은 비동기로 처리되어 API 응답 속도에 영향을 주지 않습니다.

---

### 회원가입

```
POST /api/members/signup
```
인증 불필요

**Request**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "홍길동"
}
```

**Response** `201 Created`
```json
{
  "id": 1,
  "email": "user@example.com",
  "name": "홍길동"
}
```

---

### 내 정보 조회

```
GET /api/members/me
```
인증 필요

**Response** `200 OK`
```json
{
  "id": 1,
  "email": "user@example.com",
  "name": "홍길동"
}
```

---

### 내 정보 수정

```
PUT /api/members/me
```
인증 필요

**Request**
```json
{
  "name": "새이름",
  "password": "newpassword123"
}
```

> 변경할 필드만 보내면 됩니다. 이름만 바꾸려면 `name`만, 비밀번호만 바꾸려면 `password`만 포함하세요.

**Response** `200 OK`
```json
{
  "id": 1,
  "email": "user@example.com",
  "name": "새이름"
}
```

---

### 내 게시글 목록 조회

```
GET /api/members/me/boards
```
인증 필요

**Response** `200 OK`
```json
[
  {
    "id": 1,
    "title": "게시글 제목",
    "content": "내용",
    "authorName": "홍길동"
  }
]
```

---

## 🖼️ 공용 이미지 업로드 API

게시판, 리뷰, 프로필 사진 등 모든 종류의 이미지 업로드에 공통으로 사용됩니다.

```
POST /api/upload
```
인증 필요

**Request**
- **Type**: `multipart/form-data`
- **Fields**:
    - `file`: 업로드할 이미지 파일
    - `directory`: 저장할 하위 폴더명 (e.g., `reviews`, `profiles`, `products`)

**Response** `200 OK`
```json
{
  "imageUrl": "/uploads/reviews/a1b2c3d4_image.jpg"
}
```
> 반환된 `imageUrl`은 `baseURL`과 조합하여 `<img>` 태그의 `src`로 바로 사용할 수 있습니다.

**HTML Form 예시**
```html
<form action="/api/upload" method="post" enctype="multipart/form-data">
  <input type="file" name="file" />
  <input type="hidden" name="directory" value="profiles" />
  <button type="submit">업로드</button>
</form>
```

**Axios 예시**
```typescript
const uploadImage = async (file: File, directory: string) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('directory', directory);

  const res = await apiClient.post('/api/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return res.data.imageUrl; // "/uploads/profiles/uuid_image.jpg"
};
```

---

## 커피 취향 테스트 API

### 취향 테스트 실행 및 원두 추천

```
POST /api/taste-test
```
인증 불필요 (비회원도 사용 가능)

**Request**
```json
{
  "answers": [
    { "questionId": "q1_acidity", "answerValue": "높은 산미" },
    { "questionId": "q2_body", "answerValue": "묵직한 바디감" },
    { "questionId": "q3_sweetness", "answerValue": "은은한 단맛" },
    { "questionId": "q4_flavor", "answerValue": "FRUITY" }
  ]
}
```

**Request 필드 (`answers[]`)**

| 필드 | 타입 | 설명 | 예시 값 |
|---|---|---|---|
| `questionId` | string | 질문 식별자 | `q1_acidity`, `q2_body`, `q3_sweetness`, `q4_flavor` |
| `answerValue` | string | 사용자의 답변 | `높은 산미`, `적당한 산미`, `낮은 산미`, `FRUITY`, `FLORAL` 등 |

> `q4_flavor`의 `answerValue`는 **Enum의 이름과 대소문자까지 정확히 일치**해야 합니다. (예: `FRUITY`, `NUTTY`)

**Response** `200 OK`
```json
{
  "userTasteProfile": {
    "acidity": 5,
    "body": 5,
    "sweetness": 4,
    "primaryFlavorNote": "FRUITY"
  },
  "recommendedProducts": [
    {
      "id": 1,
      "name": "에티오피아 예가체프",
      "subtitle": "플로럴한 향의 싱글 오리진",
      "price": 18000,
      "imageUrl": null,
      "acidity": 5,
      "body": 2,
      "sweetness": 4,
      "primaryFlavorNote": "FRUITY"
    }
  ]
}
```

**Response 필드**

| 필드 | 타입 | 설명 |
|---|---|---|
| `userTasteProfile` | object | 분석된 사용자의 취향 프로필 |
| `userTasteProfile.acidity` | number | 산미 점수 (1~5) |
| `userTasteProfile.body` | number | 바디감 점수 (1~5) |
| `userTasteProfile.sweetness` | number | 단맛 점수 (1~5) |
| `userTasteProfile.primaryFlavorNote` | string | 주요 향미 노트 Enum 이름 |
| `recommendedProducts` | array | 추천 상품 목록 (최대 3개) |

> ℹ️ **로그인 상태**에서 이 API를 호출하면, 분석된 `userTasteProfile`이 **회원 정보에 자동으로 저장**됩니다.

---

## 카테고리 API

### 카테고리 목록 조회

```
GET /api/categories
```
인증 불필요

**Response** `200 OK`
```json
[
  {
    "id": 1,
    "name": "원두",
    "slug": "blend",
    "displayOrder": 1
  },
  {
    "id": 2,
    "name": "드립백",
    "slug": "drip-bag",
    "displayOrder": 2
  }
]
```

| 필드 | 타입 | 설명 |
|------|------|------|
| `id` | number | 카테고리 ID (상품 추가 시 `categoryId`로 사용) |
| `name` | string | 한글명 |
| `slug` | string | 프론트 필터/라우팅용 영문 식별자 |
| `displayOrder` | number | 노출 순서 (낮을수록 먼저) |

```typescript
const categoriesRes = await apiClient.get('/api/categories');
const categories = categoriesRes.data; // [{ id, name, slug, displayOrder }, ...]
```

---

### 카테고리 추가 `ADMIN`

```
POST /api/categories
Authorization: Bearer {token}
```

**Request**
```json
{
  "name": "굿즈",
  "slug": "goods",
  "displayOrder": 3
}
```

**Response** `201 Created`
```json
{
  "id": 3,
  "name": "굿즈",
  "slug": "goods",
  "displayOrder": 3
}
```

> slug는 중복 불가. 이미 존재하는 slug로 요청 시 `500` 반환.

---

### 카테고리 삭제 `ADMIN`

```
DELETE /api/categories/{id}
Authorization: Bearer {token}
```

**Response** `204 No Content`

---

## 상품 API

### 상품 목록 조회

```
GET /api/products
```
인증 불필요 — 판매 중(`onSale: true`)인 상품만 반환

**Response** `200 OK`
```json
[
  {
    "id": 1,
    "name": "에티오피아 예가체프",
    "subtitle": "플로럴한 향의 싱글 오리진",
    "description": "상세 설명 텍스트",
    "price": 18000,
    "imageUrl": null,
    "origin": "에티오피아",
    "roastLevel": "LIGHT",
    "categoryId": 1,
    "categoryName": "원두",
    "onSale": true,
    "stockQuantity": 50,
    "rating": 0.0,
    "reviewCount": 0,
    "flavorNotes": ["자스민", "복숭아", "레몬"],
    "badges": ["NEW"],
    "options": [
      { "id": 1, "name": "200g", "description": null, "extraPrice": 0 },
      { "id": 2, "name": "400g", "description": null, "extraPrice": 5000 }
    ],
    "acidity": 5,
    "body": 2,
    "sweetness": 4,
    "primaryFlavorNote": "FRUITY"
  }
]
```

### 카테고리 필터

```
GET /api/products?categoryId=1
```

### 키워드 검색

```
GET /api/products?keyword=에티오피아
```

```typescript
// 전체 목록
const productsRes = await apiClient.get('/api/products');

// 카테고리 필터
const productsByCatRes = await apiClient.get('/api/products', { params: { categoryId: 1 } });

// 검색
const searchRes = await apiClient.get('/api/products', { params: { keyword: '에티오피아' } });
```

---

### 상품 상세 조회

```
GET /api/products/{id}
```
인증 불필요

**Response** `200 OK` — 목록 조회와 동일한 구조, 단건 반환

```typescript
const productRes = await apiClient.get(`/api/products/${id}`);
const product = productRes.data;
```

---

### 상품 추가 `ADMIN`

```
POST /api/products
Authorization: Bearer {token}
```

**Request**
```json
{
  "name": "에티오피아 예가체프",
  "subtitle": "플로럴한 향의 싱글 오리진",
  "description": "상세 설명",
  "price": 18000,
  "imageUrl": null,
  "origin": "에티오피아",
  "roastLevel": "LIGHT",
  "categoryId": 1,
  "onSale": true,
  "stockQuantity": 50,
  "flavorNotes": ["자스민", "복숭아", "레몬"],
  "badges": ["NEW"],
  "options": [
    { "name": "200g", "description": null, "extraPrice": 0 },
    { "name": "400g", "description": null, "extraPrice": 5000 }
  ],
  "acidity": 5,
  "body": 2,
  "sweetness": 4,
  "primaryFlavorNote": "FRUITY"
}
```

**Request 필드**

| 필드 | 타입 | 필수 | 설명 |
|------|------|:----:|------|
| `name` | string | ✅ | 상품명 |
| `price` | number | ✅ | 기본 가격 (원) |
| `acidity` | number | ✅ | 산미 (1~5) |
| `body` | number | ✅ | 바디감 (1~5) |
| `sweetness` | number | ✅ | 단맛 (1~5) |
| `primaryFlavorNote` | string | ✅ | 주요 향미 노트 Enum 이름 |
| `options[].name` | string | ✅ | 옵션명 (예: 200g, 중분쇄) |
| `subtitle` | string | | 카드 부제목 |
| `description` | string | | 상세 설명 |
| `imageUrl` | string | | 이미지 URL (현재 null, 업로드 미구현) |
| `origin` | string | | 원산지 |
| `roastLevel` | string | | `LIGHT` / `MEDIUM` / `DARK` |
| `categoryId` | number | | 카테고리 ID |
| `onSale` | boolean | | 판매 상태 (기본값 `true`) |
| `stockQuantity` | number | | 재고 수량 (`null`이면 무제한) |
| `flavorNotes` | string[] | | 향미 노트 |
| `badges` | string[] | | `BEST` / `NEW` / `PICK` |
| `options[].description` | string | | 옵션 설명 |
| `options[].extraPrice` | number | | 추가 금액 (기본 `0`) |

**Response** `201 Created` — 추가된 상품 전체 데이터 반환

---

### 상품 수정 `ADMIN`

```
PUT /api/products/{id}
Authorization: Bearer {token}
```

**Request** — 추가 요청과 동일한 구조

**Response** `200 OK` — 수정된 상품 전체 데이터 반환

> ⚠️ 상품 수정 시 `options` 배열은 **기존 옵션 전체 삭제 후 새로 교체**됩니다. 옵션 일부만 수정하려 해도 전체 옵션을 다시 보내야 합니다.

---

### 상품 삭제 `ADMIN`

```
DELETE /api/products/{id}
Authorization: Bearer {token}
```

**Response** `204 No Content`

---

## 에러 응답

에러 발생 시 아래 형태의 JSON이 반환됩니다.

```json
{
  "timestamp": "2026-05-12T00:00:00.000+00:00",
  "status": 403,
  "error": "Forbidden",
  "path": "/api/products"
}
```

| 상태코드 | 의미 | 주요 발생 상황 |
|---------|------|-------------|
| `400` | 잘못된 요청 | 필수 필드 누락 |
| `401` | 토큰 만료 | 토큰이 만료된 경우 → 재로그인 필요 |
| `403` | 권한 없음 | 토큰 없음, ADMIN 전용 API를 일반 유저가 호출 |
| `404` | 데이터 없음 | 존재하지 않는 ID 조회 |
| `500` | 서버 오류 | 중복 slug, 중복 카테고리명 등 |

---

## 데이터 정의서 대비 현재 구현 차이

프론트 연동 시 알아야 할 현재 구현과 원래 정의서의 차이점입니다.

| 항목 | 정의서 | 현재 구현 | 연동 시 주의 |
|------|--------|---------|------------|
| 로그인 ID | 휴대폰 번호 | 이메일 | `email` 필드 사용 |
| 이미지 저장 | BLOB | URL string | `image` 필드는 현재 `null`, 이미지 업로드 구현 후 URL 반환 예정 |
| 로스팅 정도 | 옵션으로 분류 | 상품 고정 필드 | 응답의 `roastLevel` 필드로 표시, 추후 옵션 이전 검토 |
| 향미 노트 | 코드(number) 관리 | 문자열 배열 | `notes: ["자스민", "복숭아"]` 형태로 사용 |

---

## 장바구니 API

> 모든 장바구니 API는 **JWT 인증 필요** (로그인한 회원만 사용 가능)

### 장바구니 조회

```
GET /api/cart
Authorization: Bearer {token}
```

**Response** `200 OK`
```json
[
  {
    "cartItemId": 1,
    "productId": 1,
    "productName": "에티오피아 예가체프",
    "productImageUrl": null,
    "productOptionId": 2,
    "productOptionName": "400g",
    "basePrice": 18000,
    "extraPrice": 5000,
    "unitPrice": 23000,
    "quantity": 2,
    "subtotal": 46000
  }
]
```

| 응답 필드 | 타입 | 설명 |
|----------|------|------|
| `cartItemId` | number | 장바구니 아이템 ID (수정/삭제 시 사용) |
| `productId` | number | 상품 ID |
| `productName` | string | 상품명 |
| `productImageUrl` | string \| null | 상품 이미지 URL |
| `productOptionId` | number \| null | 선택한 옵션 ID (옵션 없으면 `null`) |
| `productOptionName` | string \| null | 선택한 옵션명 |
| `basePrice` | number | 상품 기본 가격 |
| `extraPrice` | number | 옵션 추가 금액 (옵션 없으면 `0`) |
| `unitPrice` | number | 실제 단가 (`basePrice + extraPrice`) |
| `quantity` | number | 수량 |
| `subtotal` | number | 소계 (`unitPrice × quantity`) |

```typescript
const res = await apiClient.get('/api/cart');
const cartItems = res.data;
const totalPrice = cartItems.reduce((sum, item) => sum + item.subtotal, 0);
```

---

### 장바구니 상품 추가

```
POST /api/cart/items
Authorization: Bearer {token}
```

**Request**
```json
{
  "productId": 1,
  "productOptionId": 2,
  "quantity": 2
}
```

| 필드 | 타입 | 필수 | 설명 |
|------|------|:----:|------|
| `productId` | number | ✅ | 추가할 상품 ID |
| `productOptionId` | number | | 선택한 옵션 ID (옵션 없으면 생략 또는 `null`) |
| `quantity` | number | ✅ | 추가 수량 (1 이상) |

**Response** `201 Created` — 추가된 장바구니 아이템 반환

> - 같은 상품 + 옵션 조합이 이미 장바구니에 있으면 **수량이 합산**됩니다.
> - `onSale: false`인 판매 중지 상품은 추가 불가 (`400` 반환).
> - 존재하지 않는 `productId` 또는 해당 상품에 속하지 않는 `productOptionId` 입력 시 에러 반환.

```typescript
await apiClient.post('/api/cart/items', {
  productId: 1,
  productOptionId: 2,
  quantity: 1,
});
```

---

### 장바구니 수량 변경

```
PUT /api/cart/items/{cartItemId}
Authorization: Bearer {token}
```

**Request**
```json
{
  "quantity": 5
}
```

**Response** `200 OK` — 수정된 아이템 반환

> `quantity`는 1 이상이어야 합니다. 0 이하 입력 시 `400` 반환.

```typescript
await apiClient.put(`/api/cart/items/${cartItemId}`, { quantity: 5 });
```

---

### 장바구니 아이템 삭제

```
DELETE /api/cart/items/{cartItemId}
Authorization: Bearer {token}
```

**Response** `204 No Content`

```typescript
await apiClient.delete(`/api/cart/items/${cartItemId}`);
```

---

### 장바구니 전체 비우기

```
DELETE /api/cart
Authorization: Bearer {token}
```

**Response** `204 No Content`

```typescript
await apiClient.delete('/api/cart');
```

---

## 미구현 API (연동 예정)

| API | 엔드포인트 | 일정 |
|-----|-----------|------|
| 주문 | `/api/orders` | 1차 개발 |
| 결제 | `/api/payments` | 1차 개발 |
| 배송지 관리 | `/api/addresses` | 1차 개발 |
| 이미지 업로드 | `/api/upload` | 1차 개발 |

| 구독 | `/api/subscriptions` | 2차 개발 (5/30 이후) |
=======
| 구독 | `/api/subscriptions` | 2차 개발 |
| 취향 테스트 | `/api/taste-test` | 2차 개발 |
| 클래스 예약 | `/api/reservations` | 2차 개발 |
| QR / O2O | `/api/qr` | 2차 개발 |
