import { useEffect, useState } from "react";

import {
  deleteMember,
  fetchMembers,
  type AdminMember,
} from "@/services/api/adminApi";

export function MembersPage() {
  const [members, setMembers] = useState<AdminMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [error, setError] = useState("");

  async function loadMembers() {
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
    void loadMembers();
  }, []);

  return (
    <div className="page-stack">
      <section className="admin-card">
        <div className="section-heading">
          <div>
            <h2>회원 목록</h2>
            <p className="section-description">가입한 회원을 조회하고 관리합니다.</p>
          </div>
          <button onClick={() => void loadMembers()} type="button">
            새로고침
          </button>
        </div>

        {error ? <p className="form-error">{error}</p> : null}

        <div className="simple-table admin-data-table members-table">
          <div className="table-row table-head">
            <span>ID</span>
            <span>이름</span>
            <span>이메일</span>
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
                <span>{member.name}</span>
                <span>{member.email}</span>
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
