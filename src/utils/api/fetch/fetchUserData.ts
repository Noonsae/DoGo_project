import { browserSupabase } from '@/supabase/supabase-client';

// 로그인 상태 유저의 정보를 가져오는 함수
const fetchUserQuery = async (userId: string | null) => {
  if (!userId) return null; // userId가 없으면 요청하지 않음

  const { data, error } = await browserSupabase().from('users').select('email, phone_number, user_name').eq('id', userId).single();

  if (error) {
    console.error('유저 정보를 불러오는 중 오류 발생:', error.message);
    return null;
  }

  return data;
};

export default fetchUserQuery;
