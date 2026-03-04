import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Debug warning so we know exactly what Vercel is doing
if (!supabaseUrl) {
  console.warn("⚠️ ALERT: Vercel did not inject VITE_SUPABASE_URL during the build process.");
}

// Your perfect Singleton instance
export const supabase = createClient(
  supabaseUrl || 'https://dltavabvjwocknkyvwgz.supabase.co',
  supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsdGF2YWJ2andvY2tua3l2d2d6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExMTMxOTQsImV4cCI6MjA4NjY4OTE5NH0.7-9BK6L9dpCYIB-pp1WOeQxCI1DVxnSykoTRXNUHYIo',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  }
);
