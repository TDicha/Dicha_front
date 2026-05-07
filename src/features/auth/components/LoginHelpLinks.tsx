import { Search } from "lucide-react";
import { Link } from "react-router-dom";

import { ROUTES } from "@/shared/constants/routes";

export function LoginHelpLinks() {
  return (
    <>
      <div className="mt-5 flex items-center justify-center gap-3 text-[0.82rem] text-[var(--palette-666)]">
        <button className="type-button" type="button">
          아이디 찾기
        </button>
        <span className="h-3.5 w-px bg-[var(--palette-cccccc)]" />
        <button className="type-button" type="button">
          비밀번호 찾기
        </button>
        <span className="h-3.5 w-px bg-[var(--palette-cccccc)]" />
        <Link className="font-medium text-[var(--color-primary-green)]" to={ROUTES.signup}>
          회원가입
        </Link>
      </div>

      <Link className="mt-6 flex items-center justify-center gap-2 text-sm text-[var(--color-muted)]" to={ROUTES.search}>
        <Search className="size-4" />
        둘러보기로 계속하기
      </Link>
    </>
  );
}
