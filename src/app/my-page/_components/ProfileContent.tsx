import React, { useState, useEffect } from 'react'; // React와 관련된 훅을 임포트
import { browserSupabase } from '@/supabase/supabase-client'; // Supabase 클라이언트를 임포트

// 사용자 데이터를 나타내는 인터페이스 정의
interface User {
  id: string; // 사용자 ID
  user_name: string; // 사용자 이름
  phone_number: string; // 사용자 전화번호
  email: string; // 사용자 이메일
  role: string; // 사용자 역할 (예: "customer", "business")
  business_number: string | null; // 사업자 번호 (일반 사용자일 경우 null일 수 있음)
  created_at: string; // 계정 생성 날짜
}

// 컴포넌트에 전달될 props의 인터페이스 정의
interface ProfileContentProps {
  userId: string; // 현재 사용자 ID (외부에서 전달됨)
}

// ProfileContent 컴포넌트 정의
const ProfileContent: React.FC<ProfileContentProps> = ({ userId }) => {
  // 상태 관리
  const [user, setUser] = useState<User | null>(null); // 사용자 정보를 저장
  const [loading, setLoading] = useState(true); // 로딩 상태 관리
  const [error, setError] = useState<string | null>(null); // 에러 메시지 상태 관리
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // 성공 메시지 상태 관리

  // 사용자 정보를 가져오는 함수
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Supabase를 통해 'users' 테이블에서 해당 ID의 사용자 정보를 가져옴
        const { data, error } = await browserSupabase()
          .from('users')
          .select('id, user_name, phone_number, email, role, business_number, created_at')
          .eq('id', userId) // ID가 userId와 일치하는 행만 선택
          .single(); // 단일 결과만 반환

        if (error) throw error; // 에러가 발생하면 예외 처리

        setUser(data); // 가져온 사용자 정보를 상태에 저장
      } catch (err) {
        console.error('Error fetching user:', err); // 콘솔에 에러 출력
        setError('사용자 정보를 불러오는 중 오류가 발생했습니다.'); // 에러 메시지 설정
      } finally {
        setLoading(false); // 로딩 상태 해제
      }
    };

    fetchUser(); // 컴포넌트가 마운트될 때 사용자 정보를 가져옴
  }, [userId]); // userId가 변경될 때마다 재실행

  // 사용자 정보를 업데이트하는 함수
  const handleUpdate = async () => {
    if (!user) return; // 사용자 정보가 없으면 업데이트 작업을 수행하지 않음

    try {
      // Supabase를 통해 'users' 테이블의 정보를 업데이트
      const { error } = await browserSupabase()
        .from('users')
        .update({
          user_name: user.user_name, // 업데이트된 이름
          phone_number: user.phone_number, // 업데이트된 전화번호
        })
        .eq('id', userId); // 해당 사용자 ID만 업데이트

      if (error) throw error; // 에러가 발생하면 예외 처리

      setSuccessMessage('프로필이 성공적으로 업데이트되었습니다!'); // 성공 메시지 설정
    } catch (err) {
      console.error('Error updating profile:', err); // 콘솔에 에러 출력
      setError('프로필 업데이트 중 오류가 발생했습니다.'); // 에러 메시지 설정
    }
  };

  // 로딩 중일 때 표시할 메시지
  if (loading) return <p className="text-center text-gray-600">Loading...</p>;

  // 에러 발생 시 표시할 메시지
  if (error) return <p className="text-center text-red-500">{error}</p>;

  // 사용자 정보를 가져오지 못했을 때 표시할 메시지
  if (!user) return <p className="text-center text-red-500">사용자 정보를 불러올 수 없습니다.</p>;

  // 실제 렌더링될 UI
  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">프로필 관리</h2>
      {/* 성공 메시지 출력 */}
      {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
      {/* 에러 메시지 출력 */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* 사용자 정보 편집 폼 */}
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        {/* 사용자 이름 */}
        <div>
          <label className="block text-sm font-medium">이름</label>
          <input
            type="text"
            value={user.user_name} // 현재 이름 값
            onChange={(e) => setUser({ ...user, user_name: e.target.value })} // 이름 업데이트
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        {/* 전화번호 */}
        <div>
          <label className="block text-sm font-medium">휴대전화 번호</label>
          <input
            type="text"
            value={user.phone_number} // 현재 전화번호 값
            onChange={(e) => setUser({ ...user, phone_number: e.target.value })} // 전화번호 업데이트
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        {/* 이메일 (읽기 전용) */}
        <div>
          <label className="block text-sm font-medium">이메일</label>
          <input
            type="text"
            value={user.email} // 현재 이메일 값
            disabled
            className="mt-1 block w-full border-gray-300 rounded-md bg-gray-100"
          />
        </div>
        {/* 역할 (읽기 전용) */}
        <div>
          <label className="block text-sm font-medium">역할</label>
          <input
            type="text"
            value={user.role} // 현재 역할 값
            disabled
            className="mt-1 block w-full border-gray-300 rounded-md bg-gray-100"
          />
        </div>
        {/* 사업자 번호 (존재할 경우 표시) */}
        {user.business_number && (
          <div>
            <label className="block text-sm font-medium">사업자 번호</label>
            <input
              type="text"
              value={user.business_number} // 사업자 번호 값
              disabled
              className="mt-1 block w-full border-gray-300 rounded-md bg-gray-100"
            />
          </div>
        )}
        {/* 가입일 (읽기 전용) */}
        <div>
          <label className="block text-sm font-medium">가입일</label>
          <input
            type="text"
            value={new Date(user.created_at).toLocaleDateString()} // 날짜를 읽기 쉬운 형식으로 변환
            disabled
            className="mt-1 block w-full border-gray-300 rounded-md bg-gray-100"
          />
        </div>
        {/* 저장 버튼 */}
        <button
          type="button"
          onClick={handleUpdate}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          저장하기
        </button>
      </form>
    </div>
  );
};

export default ProfileContent;
