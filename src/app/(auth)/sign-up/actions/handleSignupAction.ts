'use server';

import { serverSupabase } from '@/supabase/supabase-server';

// 1. KAKAO 로그인을 위해서 trigger 는 필요하다. -> users 테이블에 id랑 email은 넣어야 하니까
// 2. 일반 회원가입 -> trigger -> role, user_name, nickname, ... -> 활용해서 users 테이블에 삽입 -> GOOD
// 3. 문제: KAKAO 에서 user_name을 제외한 role, nickname, phone_number는 존재하지 않는다 -> 에러 발생 -> SQL 문법 수정 후에도 에러 발생
// 해결책
// 1. trigger는 그대로 두되, id, email 만 trigger로 users 테이블에 추가
// 2. kakao 회원가입 혹은 일반 회원가입 후 users 테이블을 update 한다.
// 커밋용
export default async function handleSignupAction({
  email,
  password,
  name,
  phone,
  businessNumber,
  nickname,
  role
}: {
  email: string;
  password: string;
  name: string;
  phone: string;
  businessNumber?: string;
  nickname?: string;
  role: string;
}) {
  const supabaseAdmin = await serverSupabase();

  try {
    const { data: authData, error: authError } = await supabaseAdmin.auth.signUp({
      email,
      password
      // 1. trigger에서 사용할 수 있게 회원가입 정보를 넣는다.
      // options: {
      //   data: {
      //     phone_number: phone,
      //     role: role,
      //     user_name: name,
      //     business_number: role === 'business' ? businessNumber : null,
      //     nickname: role === 'user' ? name : null
      //   }
      // }
    });

    if (authError) {
      throw new Error(authError.message);
    }

    console.log('authData', authData);
    const userId = authData.user?.id;
    if (!userId) {
      throw new Error('사용자 생성에 실패했습니다.');
    }

    const insertData = {
      id: userId,
      email,
      phone_number: phone,
      role,
      user_name: name,
      business_number: role === 'business' ? businessNumber : null,
      nickname: role === 'user' ? name : null
    };

    // // TODO: trigger 완성 후 지우기
    const { error: insertError } = await supabaseAdmin.from('users').insert([insertData]);

    // trigger 때문에 이미 Users 정보는 들어가졌다.
    // update만 하자 -> trigger가 완료(users테이블에 인서트 되기 전에)가 되기 전에
    // await supabaseAdmin.from('users).update({ role, phone_number: phone, ... })

    // 로그인 완료 후 모달 띄워서 추가 정보 받기

    if (insertError) {
      throw new Error(insertError.message);
    }

    return { success: true, message: `${name} 회원가입 성공` };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
