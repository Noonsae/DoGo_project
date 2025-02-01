import { serverSupabase } from '@/supabase/supabase-server';

export default async function testSupabaseConnection() {
  try {
    const supabaseAdmin = await serverSupabase();
    const { data, error } = await supabaseAdmin.from('users').select('id').limit(1);

    if (error) throw error;
    console.log('✅ Supabase 연결 성공:', data);
  } catch (err) {
    console.error('❌ Supabase 연결 실패:', err);
  }
}
