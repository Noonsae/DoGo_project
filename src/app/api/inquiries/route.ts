'use server';

import { NextRequest, NextResponse } from 'next/server';
import { serverSupabase } from '@/supabase/supabase-server';

export async function POST(req: NextRequest) {
  try {
    const supabase = await serverSupabase();
    const { category, title, content, user_id, hotel_id } = await req.json();

    if (!category || !title || !content || !user_id) {
      return NextResponse.json({ error: '필수 입력값이 누락되었습니다.' }, { status: 400 });
    }

    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(user_id)) {
      return NextResponse.json({ error: '유효하지 않은 사용자 ID입니다.' }, { status: 400 });
    }

    const { data: user, error: userError } = await supabase.from('users').select('role').eq('id', user_id).single();

    if (userError || !user || user.role !== 'user') {
      return NextResponse.json({ error: '사업자는 문의를 등록할 수 없습니다.' }, { status: 403 });
    }

    let assignedTo = null;

    if (hotel_id) {
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
      const { data: admin, error: adminError } = await supabase
        .from('users')
        .select('id')
        .eq('role', 'admin')
        .maybeSingle();
      // 수파노바를 봤을때 관리하는 사람 입장에서 모호함
      // 관리자와 사업자 나눠서 관리하기⭐
      if (adminError || !admin) {
        return NextResponse.json({ error: '관리자를 찾을 수 없습니다.' }, { status: 404 });
      }
      assignedTo = admin.id;
    }

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

    if (!inquiry || inquiry.assigned_to === null) {
      return NextResponse.json({ error: '해당 문의를 찾을 수 없습니다.' }, { status: 404 });
    }

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
