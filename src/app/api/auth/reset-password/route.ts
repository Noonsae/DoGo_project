import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: '이메일과 비밀번호는 필수입니다.' }, { status: 400 });
    }
    console.log('email', email);
    console.log('password', password);
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

    const { data: user, error: fetchError } = await supabase.from('users').select('id').eq('email', email).single();
    console.log('fetchError', fetchError);
    if (fetchError || !user) {
      return NextResponse.json({ error: '입력한 정보와 일치하는 계정을 찾을 수 없습니다.' }, { status: 404 });
    }

    // const { error: updateError } = await supabase.auth.admin.updateUser(user.id, { password });
    const { data: updateError, error } = await supabase.auth.updateUser({
      password: new_password
    });
    if (updateError) {
      console.error('Supabase 비밀번호 재설정 오류:', updateError.message);
      return NextResponse.json({ error: '비밀번호 재설정에 실패했습니다.' }, { status: 500 });
    }

    return NextResponse.json({ message: '비밀번호가 성공적으로 재설정되었습니다.' }, { status: 200 });
  } catch (error) {
    console.error('서버 오류:', error);
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
