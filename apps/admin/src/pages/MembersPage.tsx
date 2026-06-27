import { useEffect, useState } from "react";

import {
  deleteMember,
  fetchMembers,
  type AdminMember,
  type AdminMemberGrade,
  updateMemberGrade,
} from "@/services/api/adminApi";

const GRADE_OPTIONS: { value: AdminMemberGrade; label: string }[] = [
  { value: "SILVER", label: "Silver" },
  { value: "GOLD", label: "Gold" },
  { value: "BLACK", label: "Black" },
];

interface MemberFilters {
  email: string;
  grade: AdminMemberGrade | "";
  name: string;
}

function formatPrice(value?: number | null) {
  return new Intl.NumberFormat("ko-KR").format(value ?? 0);
}

function formatDate(value?: string | null) {
  if (!value) {
    return "-";
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString("ko-KR");
}

export function MembersPage() {
  const [members, setMembers] = useState<AdminMember[]>([]);
  const [filters, setFilters] = useState<MemberFilters>({
    email: "",
    grade: "",
    name: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [updatingGradeId, setUpdatingGradeId] = useState<number | null>(null);
  const [error, setError] = useState("");

  async function loadMembers() {
    setIsLoading(true);
    setError("");

    try {
      setMembers(await fetchMembers(filters));
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "회원 목록을 불러오지 못했습니다.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGradeChange(member: AdminMember, grade: AdminMemberGrade) {
    if (member.grade === grade) {
      return;
    }

    setUpdatingGradeId(member.id);
    setError("");

    try {
      await updateMemberGrade(member.id, grade);
      setMembers((currentMembers) =>
        currentMembers.map((currentMember) =>
          currentMember.id === member.id
            ? { ...currentMember, grade }
            : currentMember,
        ),
      );
    } catch (updateError) {
      setError(
        updateError instanceof Error
          ? updateError.message
          : "회원 등급 변경에 실패했습니다.",
      );
    } finally {
      setUpdatingGradeId(null);
    }
  }

  async function handleDeleteMember(member: AdminMember) {
    const shouldDelete = window.confirm(`${member.name} 회원을 탈퇴 처리할까요?`);

    if (!shouldDelete) {
      return;
    }

    setDeletingId(member.id);
    setError("");

    try {
      await deleteMember(member.id);
      setMembers((currentMembers) =>
        currentMembers.filter((currentMember) => currentMember.id !== member.id),
      );
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "회원 삭제에 실패했습니다.",
      );
    } finally {
      setDeletingId(null);
    }
  }

  useEffect(() => {
    async function loadInitialMembers() {
      setIsLoading(true);
      setError("");

      try {
        setMembers(await fetchMembers());
      } catch (loadError) {
        setError(
          loadError instanceof Error
            ? loadError.message
            : "회원 목록을 불러오지 못했습니다.",
        );
      } finally {
        setIsLoading(false);
      }
    }

    void loadInitialMembers();
  }, []);

  const gradeCounts = GRADE_OPTIONS.map((option) => ({
    ...option,
    count: members.filter((member) => member.grade === option.value).length,
  }));
  const totalSpent = members.reduce(
    (sum, member) => sum + (member.totalSpent ?? 0),
    0,
  );

  return (
    <div className="page-stack">
      <section className="metric-grid member-summary-grid">
        <article className="admin-card metric-card">
          <span>조회 회원</span>
          <strong>{isLoading ? "-" : `${members.length}명`}</strong>
          <small>현재 필터 기준</small>
        </article>
        <article className="admin-card metric-card">
          <span>누적 구매액</span>
          <strong>{isLoading ? "-" : `₩${formatPrice(totalSpent)}`}</strong>
          <small>조회 회원 합산</small>
        </article>
        {gradeCounts.map((grade) => (
          <article className="admin-card metric-card" key={grade.value}>
            <span>{grade.label}</span>
            <strong>{isLoading ? "-" : `${grade.count}명`}</strong>
            <small>회원 등급</small>
          </article>
        ))}
      </section>

      <section className="admin-card">
        <div className="section-heading">
          <div>
            <h2>회원 관리</h2>
            <p className="section-description">
              가입 회원을 검색하고 등급을 조정합니다. 비회원 주문자는 회원
              목록에 포함되지 않습니다.
            </p>
          </div>
        </div>

        <div className="admin-filter-bar">
          <label className="field">
            이름
            <input
              onChange={(event) =>
                setFilters((current) => ({
                  ...current,
                  name: event.target.value,
                }))
              }
              placeholder="고객명"
              value={filters.name}
            />
          </label>
          <label className="field">
            이메일
            <input
              onChange={(event) =>
                setFilters((current) => ({
                  ...current,
                  email: event.target.value,
                }))
              }
              placeholder="email@example.com"
              value={filters.email}
            />
          </label>
          <label className="field">
            등급
            <select
              onChange={(event) =>
                setFilters((current) => ({
                  ...current,
                  grade: event.target.value as AdminMemberGrade | "",
                }))
              }
              value={filters.grade}
            >
              <option value="">전체</option>
              {GRADE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <button
            className="primary-action compact align-end"
            onClick={() => void loadMembers()}
            type="button"
          >
            조회
          </button>
          <button
            className="secondary-action align-end"
            onClick={() => {
              setFilters({ email: "", grade: "", name: "" });
              void fetchMembers().then(setMembers);
            }}
            type="button"
          >
            초기화
          </button>
        </div>

        {error ? <p className="form-error">{error}</p> : null}

        <div className="simple-table admin-data-table members-table">
          <div className="table-row table-head">
            <span>ID</span>
            <span>고객</span>
            <span>연락처</span>
            <span>등급</span>
            <span>누적 구매</span>
            <span>가입/방문</span>
            <span>관리</span>
          </div>

          {isLoading ? (
            <div className="table-row table-empty">
              <span>회원 목록을 불러오는 중입니다.</span>
            </div>
          ) : members.length ? (
            members.map((member) => (
              <div className="table-row" key={member.id}>
                <span>{member.id}</span>
                <span>
                  <strong>{member.name}</strong>
                  <small>{member.email}</small>
                </span>
                <span>{member.phoneNumber || "-"}</span>
                <span>
                  <select
                    disabled={updatingGradeId === member.id}
                    onChange={(event) =>
                      void handleGradeChange(
                        member,
                        event.target.value as AdminMemberGrade,
                      )
                    }
                    value={member.grade ?? "SILVER"}
                  >
                    {GRADE_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </span>
                <span>₩{formatPrice(member.totalSpent)}</span>
                <span>
                  <strong>{formatDate(member.createdAt)}</strong>
                  <small>최근 {formatDate(member.lastVisitedAt)}</small>
                </span>
                <span>
                  <button
                    className="danger-action"
                    disabled={deletingId === member.id}
                    onClick={() => void handleDeleteMember(member)}
                    type="button"
                  >
                    {deletingId === member.id ? "삭제 중" : "탈퇴"}
                  </button>
                </span>
              </div>
            ))
          ) : (
            <div className="table-row table-empty">
              <span>등록된 회원이 없습니다.</span>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
