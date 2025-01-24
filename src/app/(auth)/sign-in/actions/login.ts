'use server';

import { serverSupabase } from '@/supabase/supabase-server';

export const login = async ({ email, password }: { email: string; password: string }) => {
  const supabase = await serverSupabase();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  return { data, error };
};
