import { createClient } from '@supabase/supabase-js';

// Vite strictly requires import.meta.env, not process.env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_PROJECT_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('🚨 CONFIG ERROR: VITE_ variables are not reaching the browser.');
}

// Passing placeholders prevents the fatal React crash (White Screen)
export const supabase = createClient(
  supabaseUrl || 'https://placeholder-project.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key'
);
