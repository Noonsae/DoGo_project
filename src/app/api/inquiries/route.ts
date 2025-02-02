'use server';

import { NextRequest, NextResponse } from 'next/server';
import { serverSupabase } from '@/supabase/supabase-server';

export async function POST(req: NextRequest) {
  try {
    const supabase = await serverSupabase();
    const { category, title, content, user_id, hotel_id } = await req.json();

    console.log('요청데이터', { category, title, content, user_id, hotel_id });

    // ✅ 필수값 체크
    if (!category || !title || !content || !user_id) {
      return NextResponse.json({ error: '필수 입력값이 누락되었습니다.' }, { status: 400 });
    }

    // ✅ `user_id`가 UUID 형식인지 검증
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(user_id)) {
      return NextResponse.json({ error: '유효하지 않은 사용자 ID입니다.' }, { status: 400 });
    }

    // ✅ `users` 테이블에서 role 확인 (user만 문의 가능)
    const { data: user, error: userError } = await supabase.from('users').select('role').eq('id', user_id).single();

    if (userError || !user || user.role !== 'user') {
      return NextResponse.json({ error: '사업자는 문의를 등록할 수 없습니다.' }, { status: 403 });
    }

    let assignedTo = null;

    if (hotel_id) {
      // ✅ 객실 상세 페이지에서 문의 등록 → 호텔 등록한 사업자에게 할당
      const { data: hotel, error: hotelError } = await supabase
        .from('hotels')
        .select('user_id')
        .eq('id', hotel_id)
        .single();

      if (hotelError || !hotel) {
        return NextResponse.json({ error: '해당 호텔을 찾을 수 없습니다.' }, { status: 404 });
      }

      assignedTo = hotel.user_id;
    } else {
      // ✅ `hotel_id`가 없는 경우 → 관리자에게 문의 배정
      const { data: admin, error: adminError } = await supabase.from('users').select('id').eq('role', 'admin').single();

      if (adminError || !admin) {
        return NextResponse.json({ error: '관리자를 찾을 수 없습니다.' }, { status: 404 });
      }

      assignedTo = admin.id;
    }

    // ✅ Supabase에 데이터 삽입 (사업자 또는 관리자에게 문의 배정)
    const { data, error } = await supabase
      .from('inquiries')
      .insert([{ category, title, content, user_id, status: '대기', assigned_to: assignedTo }]);

    if (error) throw error;

    return NextResponse.json({ message: '문의가 성공적으로 등록되었습니다.', data }, { status: 201 });
  } catch (error) {
    console.error('문의 등록 오류:', error);
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const supabase = await serverSupabase();
    const { inquiry_id, business_reply, user_id } = await req.json();

    if (!inquiry_id || !business_reply || !user_id) {
      return NextResponse.json({ error: '필수 입력값이 누락되었습니다.' }, { status: 400 });
    }

    const { data: user, error: userError } = await supabase.from('users').select('role').eq('id', user_id).single();

    if (userError || !user || user.role !== 'business') {
      return NextResponse.json({ error: '문의 답변은 사업자만 가능합니다.' }, { status: 403 });
    }

    const { data: inquiry, error: inquiryError } = await supabase
      .from('inquiries')
      .select('assigned_to')
      .eq('id', inquiry_id)
      .single();

    console.log('📌 가져온 문의 데이터:', inquiry);

    if (!inquiry || inquiry.assigned_to === null) {
      return NextResponse.json({ error: '해당 문의를 찾을 수 없습니다.' }, { status: 404 });
    }
    console.log('📌 문의의 assigned_to 값:', inquiry?.assigned_to);
    console.log('📌 현재 유저 ID:', user_id);

    if (inquiry.assigned_to !== user_id) {
      return NextResponse.json({ error: '다른 사업자의 문의에는 답변할 수 없습니다.' }, { status: 403 });
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
