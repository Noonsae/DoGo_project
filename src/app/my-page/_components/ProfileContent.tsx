import React, { useState, useEffect } from 'react';
import { browserSupabase } from '@/supabase/supabase-client';

interface ProfileContentProps {
  userId: string;
}

const ProfileContent: React.FC<ProfileContentProps> = ({ userId }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const supabase = browserSupabase();

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.from('users').select('*').eq('id', userId).single();
      if (error) console.error(error);
      setUser(data);
      setLoading(false);
    };

    fetchUser();
  }, [userId]);

  const handleUpdate = async () => {
    const { error } = await supabase
      .from('users')
      .update({
        user_name: user.user_name,
        phone_number: user.phone_number,
      })
      .eq('id', userId);

    if (error) console.error(error);
    else alert('프로필이 업데이트되었습니다!');
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">프로필 관리</h2>
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="block text-sm font-medium">이름</label>
          <input
            type="text"
            value={user.user_name}
            onChange={(e) => setUser({ ...user, user_name: e.target.value })}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">휴대전화 번호</label>
          <input
            type="text"
            value={user.phone_number}
            onChange={(e) => setUser({ ...user, phone_number: e.target.value })}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
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
