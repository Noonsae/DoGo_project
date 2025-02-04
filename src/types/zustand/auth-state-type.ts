import { User } from '@supabase/supabase-js';

export interface AuthStateFace {
  user: User | null;
  setAuth: (user: User | null) => void;
}
