import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { supabase } from "../supabase"; (pointing to your singleton instance in supabase.ts);
import { hasSupabaseEnv, isMockMode } from "@/lib/mode";

type Profile = {
  id: string; role: string | null; must_change_password: boolean | null;
  permissions?: string[] | null; full_name?: string | null;
};

type AuthCtx = {
  user: { id: string; email?: string } | null;
  displayName: string | null; role: string | null;
  permissions: string[]; mustChangePassword: boolean;
  isAuthenticated: boolean; loading: boolean; isMock: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>; refresh: () => Promise<void>;
};

const Ctx = createContext<AuthCtx | null>(null);
const MOCK_STORAGE_KEY = "btx_mock_session_v1";

function normalizeRole(role?: string | null) {
  if (!role) return null;
  const clean = role.trim().toUpperCase();
  if (clean === "SUPER_A") return "SUPER_ADMIN";
  return clean;
}

function deriveDisplayName(email?: string | null) {
  const v = String(email ?? "").trim();
  if (!v) return null;
  const head = v.split("@")[0]?.trim();
  return head || v;
}

async function loadProfile(userId: string): Promise<Profile | null> {
  const trySelect = async (sel: string) => supabase.from("profiles").select(sel).eq("id", userId).maybeSingle();
  const selects = [
    "id, role, must_change_password, permissions, full_name",
    "id, role, must_change_password, permissions",
    "id, role, must_change_password, full_name",
    "id, role, must_change_password",
  ];
  let lastError: any = null;
  for (const sel of selects) {
    const { data, error } = await trySelect(sel);
    if (!error) return (data as any) ?? null;
    lastError = error;
    if ((error as any).code !== "42703") break;
  }
  return null;
}

function readMockSession() {
  const raw = localStorage.getItem(MOCK_STORAGE_KEY);
  if (!raw) return null;
  try {
    const v = JSON.parse(raw);
    return v?.email ? { email: String(v.email), role: String(v.role ?? "SUPER_ADMIN") } : null;
  } catch { return null; }
}

function writeMockSession(email: string, role: string) { localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify({ email, role, at: Date.now() })); }
function clearMockSession() { localStorage.removeItem(MOCK_STORAGE_KEY); }

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthCtx["user"]>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [permissions, setPermissions] = useState<string[]>([]);
  const [mustChangePassword, setMustChangePassword] = useState(false);
  const [loading, setLoading] = useState(true);

  const isMock = isMockMode() || !hasSupabaseEnv();

  const setLoggedOut = () => {
    setUser(null); setDisplayName(null); setRole(null);
    setPermissions([]); setMustChangePassword(false); setLoading(false);
  };

  const hydrateSupabase = async (session: any) => {
    if (!session?.user) return setLoggedOut();
    const u = session.user;
    setUser({ id: u.id, email: u.email });
    const profile = await loadProfile(u.id);
    setRole(normalizeRole(profile?.role) || normalizeRole(u?.app_metadata?.role) || normalizeRole(u?.user_metadata?.role));
    setDisplayName(profile?.full_name || u?.user_metadata?.full_name || u?.user_metadata?.name || deriveDisplayName(u?.email));
    setPermissions(Array.isArray(profile?.permissions) ? (profile!.permissions as any) ?? [] : []);
    setMustChangePassword(Boolean(profile?.must_change_password));
    setLoading(false);
  };

  const refresh = async () => {
    setLoading(true);
    if (isMock) {
      const sess = readMockSession();
      if (!sess) return setLoggedOut();
      setUser({ id: "mock", email: sess.email });
      setDisplayName(deriveDisplayName(sess.email));
      setRole(normalizeRole(sess.role) ?? "SUPER_ADMIN");
      setPermissions(["MOCK"]);
      setMustChangePassword(false); setLoading(false);
      return;
    }
    const { data } = await supabase.auth.getSession();
    await hydrateSupabase(data?.session);
  };

  useEffect(() => {
    void refresh();
    if (isMock) return;
    const { data } = supabase.auth.onAuthStateChange((_, session) => { void hydrateSupabase(session); });
    return () => data?.subscription?.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    if (isMock) {
      if (!email.trim()) { setLoading(false); return { success: false, message: "Missing email." }; }
      writeMockSession(email.trim(), "SUPER_ADMIN");
      await refresh(); return { success: true, message: "OK" };
    }
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error || !data?.session) { setLoading(false); return { success: false, message: "Invalid credentials." }; }
    await hydrateSupabase(data.session);
    return { success: true, message: "OK" };
  };

  const logout = async () => {
    if (isMock) clearMockSession(); else await supabase.auth.signOut();
    await refresh();
  };

  const value = useMemo(() => ({ user, displayName, role, permissions, mustChangePassword, isAuthenticated: !!user, loading, isMock, login, logout, refresh }), [user, displayName, role, permissions, mustChangePassword, loading, isMock]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAuth must be used within AuthProvider");
  return v;
}
