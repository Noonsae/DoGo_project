'use client';
import React, { useState, useEffect } from 'react';
import { browserSupabase } from '@/supabase/supabase-client';

// 사용자 프로필 데이터를 정의하는 인터페이스
interface UserProfile {
  id: string; // 사용자 고유 ID
  user_name: string; // 사용자 이름
  email: string; // 사용자 이메일
  phone_number: string; // 사용자 전화번호
  role: string; // 사용자 역할 (예: "customer", "business")
  business_number: string | null; // 사업자 번호 (일반 사용자일 경우 null일 수 있음)
  created_at: string; // 계정 생성 날짜
}

// ProfileManagement 컴포넌트 정의
const ProfileManagement: React.FC = () => {
  // 사용자 정보 상태
  const [user, setUser] = useState<UserProfile | null>(null); // 사용자 정보를 저장
  const [loading, setLoading] = useState(true); // 데이터 로딩 상태 관리
  const [error, setError] = useState<string | null>(null); // 에러 메시지 상태 관리
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // 성공 메시지 상태 관리

  // 사용자 프로필 데이터를 가져오는 useEffect 훅
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Supabase를 통해 현재 로그인된 사용자 정보를 가져옴
        const { data, error } = await browserSupabase()
          .from('users') // 'users' 테이블에서 데이터 가져오기
          .select('id, user_name, email, phone_number, role, business_number, created_at') // 필요한 필드만 선택
          .single(); // 단일 결과 반환 (현재 사용자 정보)

        if (error) throw error; // 에러 발생 시 예외 처리

        setUser(data); // 사용자 정보를 상태에 저장
      } catch (err) {
        console.error('Error fetching user profile:', err); // 에러를 콘솔에 출력
        setError('프로필 데이터를 불러오는 중 오류가 발생했습니다.'); // 에러 메시지 상태 업데이트
      } finally {
        setLoading(false); // 로딩 상태 해제
      }
    };

    fetchUserProfile(); // 컴포넌트가 마운트될 때 사용자 정보를 가져옴
  }, []); // 의존성 배열이 비어 있으므로 컴포넌트가 처음 렌더링될 때만 실행

  // 사용자 정보를 업데이트하는 함수
  const handleUpdate = async () => {
    if (!user) return; // 사용자 정보가 없으면 실행하지 않음

    try {
      // Supabase를 통해 사용자 정보를 업데이트
      const { error } = await browserSupabase()
        .from('users') // 'users' 테이블에서
        .update({
          user_name: user.user_name, // 업데이트된 이름
          phone_number: user.phone_number, // 업데이트된 전화번호
        })
        .eq('id', user.id); // 해당 사용자 ID와 일치하는 행만 업데이트

      if (error) throw error; // 에러 발생 시 예외 처리

      setSuccessMessage('프로필이 성공적으로 업데이트되었습니다.'); // 성공 메시지 설정
    } catch (err) {
      console.error('Error updating profile:', err); // 에러를 콘솔에 출력
      setError('프로필 업데이트 중 오류가 발생했습니다.'); // 에러 메시지 상태 업데이트
    }
  };

  // 로딩 상태일 때 표시할 컴포넌트
  if (loading) return <p className="text-center text-gray-600">Loading...</p>;

  // 에러 상태일 때 표시할 컴포넌트
  if (error) return <p className="text-center text-red-500">{error}</p>;

  // 사용자 정보가 없을 때 표시할 컴포넌트
  if (!user) return <p className="text-center text-red-500">사용자 정보를 불러올 수 없습니다.</p>;

  // 사용자 프로필 관리 UI 렌더링
  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">프로필 관리</h2>
      {/* 성공 메시지 표시 */}
      {successMessage && <p className="mt-4 text-center text-green-500">{successMessage}</p>}
      {/* 에러 메시지 표시 */}
      {error && <p className="mt-4 text-center text-red-500">{error}</p>}

      {/* 사용자 정보 편집 폼 */}
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        {/* 사용자 이름 입력 필드 */}
        <div>
          <label className="block text-sm font-medium">이름</label>
          <input
            type="text"
            value={user?.user_name || ''} // 현재 사용자 이름 값
            onChange={(e) =>
              setUser({ ...user, user_name: e.target.value } as UserProfile) // 이름 상태 업데이트
            }
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>

        {/* 이메일 입력 필드 (읽기 전용) */}
        <div>
          <label className="block text-sm font-medium">이메일</label>
          <input
            type="email"
            value={user?.email || ''} // 현재 이메일 값
            disabled // 이메일은 수정할 수 없음
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-100"
          />
        </div>

        {/* 전화번호 입력 필드 */}
        <div>
          <label className="block text-sm font-medium">휴대전화 번호</label>
          <input
            type="text"
            value={user?.phone_number || ''} // 현재 전화번호 값
            onChange={(e) =>
              setUser({ ...user, phone_number: e.target.value } as UserProfile) // 전화번호 상태 업데이트
            }
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>

        {/* 역할 필드 (읽기 전용) */}
        <div>
          <label className="block text-sm font-medium">역할</label>
          <input
            type="text"
            value={user?.role || ''} // 현재 역할 값
            disabled // 역할은 수정할 수 없음
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-100"
          />
        </div>

        {/* 사업자 번호 필드 (사업자 사용자일 경우만 표시) */}
        {user?.business_number && (
          <div>
            <label className="block text-sm font-medium">사업자 번호</label>
            <input
              type="text"
              value={user.business_number} // 사업자 번호 값
              disabled // 수정할 수 없음
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-100"
            />
          </div>
        )}

        {/* 가입일 필드 (읽기 전용) */}
        <div>
          <label className="block text-sm font-medium">가입일</label>
          <input
            type="text"
            value={user?.created_at ? new Date(user.created_at).toLocaleDateString() : ''} // 가입일을 읽기 쉬운 형식으로 변환
            disabled // 수정할 수 없음
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-100"
          />
        </div>

        {/* 저장 버튼 */}
        <button
          type="button"
          onClick={handleUpdate} // 업데이트 함수 호출
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          저장하기
        </button>
      </form>
    </div>
  );
};

export default ProfileManagement;
