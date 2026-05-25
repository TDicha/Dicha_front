import { Search } from "lucide-react";
import { Link } from "react-router-dom";

import { ROUTES } from "@/shared/constants/routes";

export function LoginHelpLinks() {
  return (
      <div className="mt-5 flex items-center justify-center gap-3 text-[0.82rem] text-[var(--text-muted-compact)]">
        {/* <button className="type-button" type="button">
          아이디 찾기
        </button>
        <span className="h-3.5 w-px bg-[var(--border-neutral)]" />
        <button className="type-button" type="button">
          비밀번호 찾기
        </button> */}
        {/* <span className="h-3.5 w-px bg-[var(--border-neutral)]" /> */}
        <Link className="font-medium text-[var(--brand-primary)]" to={ROUTES.signup}>
          회원가입
        </Link>
      </div>
  );
}
