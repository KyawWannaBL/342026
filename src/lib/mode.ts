export function isMockMode(): boolean {
  const raw = String(import.meta.env.VITE_MOCK_MODE ?? "").trim().toLowerCase();
  return raw === "1" || raw === "true" || raw === "yes" || raw === "on";
}

export function hasSupabaseEnv(): boolean {
  const url = String(import.meta.env.VITE_SUPABASE_URL ?? "").trim();
  const key = String(import.meta.env.VITE_SUPABASE_ANON_KEY ?? "").trim();
  return Boolean(url && key);
}
