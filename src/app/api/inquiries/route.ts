'use server';

import { NextRequest, NextResponse } from 'next/server';
import { serverSupabase } from '@/supabase/supabase-server';

// ✅ 문의 등록 API (POST)
export async function POST(req: NextRequest) {
  try {
    const supabase = await serverSupabase();
    const { category, title, content, user_id } = await req.json();
    console.log('요청데이터', { category, title, content, user_id });
    // ✅ 유효성 검사
    if (!category || !title || !content || !user_id) {
      return NextResponse.json({ error: '필수 입력값이 누락되었습니다.' }, { status: 400 });
    }

    // ✅ `user_id`가 UUID 형식인지 검증
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(user_id)) {
      return NextResponse.json({ error: '유효하지 않은 사용자 ID입니다.' }, { status: 400 });
    }

    // ✅ Supabase에 데이터 삽입
    const { data, error } = await supabase
      .from('inquiries')
      .insert([{ category, title, content, user_id, status: '대기' }]);

    if (error) throw error;

    return NextResponse.json({ message: '문의가 성공적으로 등록되었습니다.', data }, { status: 201 });
  } catch (error) {
    console.error('문의 등록 오류:', error);
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}

// ✅ 문의 조회 API (GET)
export async function GET() {
  try {
    const supabase = await serverSupabase(); // ✅ `await` 추가
    const { data, error } = await supabase.from('inquiries').select('*');

    if (error) throw error;

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error('문의 조회 오류:', error);
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}

// ✅ 사업자 답변 API (PATCH)
export async function PATCH(req: NextRequest) {
  try {
    const supabase = await serverSupabase(); // ✅ `await` 추가
    const { inquiry_id, business_reply } = await req.json();

    if (!inquiry_id || !business_reply) {
      return NextResponse.json({ error: '필수 입력값이 누락되었습니다.' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('inquiries')
      .update({ business_reply, status: '답변 완료', reply_created_at: new Date().toISOString() })
      .match({ id: inquiry_id });

    if (error) throw error;

    return NextResponse.json({ message: '답변이 등록되었습니다.', data }, { status: 200 });
  } catch (error) {
    console.error('사업자 답변 오류:', error);
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
