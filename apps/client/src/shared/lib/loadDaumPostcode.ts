const DAUM_POSTCODE_SRC =
  "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";

export interface DaumPostcodeResult {
  /** 우편번호 (5자리 신주소 기준) */
  zonecode: string;
  /** 도로명 주소 */
  roadAddress: string;
  /** 지번 주소 */
  jibunAddress: string;
  /** 사용자가 선택한 주소 타입 ("R": 도로명, "J": 지번) */
  userSelectedType: "R" | "J";
  /** 도로명/지번 중 기본 주소 */
  address: string;
  buildingName: string;
  apartment: "Y" | "N";
}

interface DaumPostcodeOptions {
  oncomplete: (data: DaumPostcodeResult) => void;
  onclose?: () => void;
  width?: string | number;
  height?: string | number;
}

interface DaumPostcodeConstructor {
  new (options: DaumPostcodeOptions): { open: () => void };
}

declare global {
  interface Window {
    daum?: {
      Postcode: DaumPostcodeConstructor;
    };
  }
}

let loaderPromise: Promise<void> | null = null;

/**
 * 카카오(다음) 우편번호 서비스 스크립트를 동적으로 로드한다.
 * 별도의 API 키가 필요 없고, npm 의존성 없이 한 번만 로드 후 재사용한다.
 */
export function loadDaumPostcode(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Daum 우편번호는 브라우저에서만 사용할 수 있습니다."));
  }

  if (window.daum?.Postcode) {
    return Promise.resolve();
  }

  if (loaderPromise) {
    return loaderPromise;
  }

  loaderPromise = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = DAUM_POSTCODE_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      loaderPromise = null;
      reject(new Error("우편번호 서비스를 불러오지 못했습니다."));
    };
    document.head.appendChild(script);
  });

  return loaderPromise;
}

/**
 * 우편번호 검색 팝업을 띄우고 선택 결과를 Promise 로 돌려준다.
 * 사용자가 닫으면 null 을 반환한다.
 */
export async function openDaumPostcode(): Promise<DaumPostcodeResult | null> {
  await loadDaumPostcode();

  return new Promise((resolve) => {
    let settled = false;

    const postcode = new window.daum!.Postcode({
      oncomplete: (data) => {
        settled = true;
        resolve(data);
      },
      onclose: () => {
        if (!settled) {
          resolve(null);
        }
      },
    });

    postcode.open();
  });
}
