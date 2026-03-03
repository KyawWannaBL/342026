import * as React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { PATHS } from "../routes/paths";
import { supabase } from "../lib/supabase";

export type User = { id: string; email: string; name: string; role?: string; };

type AuthContextValue = { 
  user: User | null; 
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>; 
  logout: () => Promise<void>; 
};

const AuthContext = React.createContext<AuthContextValue | null>(null);

export function AuthProvider(props: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let mounted = true;
    
    // Auto Mock mode logic if bypass is active
    const isMock = import.meta.env.VITE_MOCK_MODE === '1';

    async function initSession() {
      if (isMock) {
        setUser({ id: "mock", email: "admin@britium.com", name: "System Admin" });
        setLoading(false);
        return;
      }

      const { data: { session } } = await supabase.auth.getSession();
      if (mounted) {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || "",
            name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || "User",
            role: session.user.user_metadata?.role || "SUPER_ADMIN"
          });
        }
        setLoading(false);
      }
    }
    
    initSession();

    if (!isMock) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || "",
            name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || "User",
            role: session.user.user_metadata?.role || "SUPER_ADMIN"
          });
        } else {
          setUser(null);
        }
        setLoading(false);
      });
      return () => { mounted = false; subscription.unsubscribe(); };
    }
  }, []);

  const login = React.useCallback(async (email: string, password: string) => {
    if (import.meta.env.VITE_MOCK_MODE === '1') {
      setUser({ id: "mock", email, name: email.split('@')[0] });
      return { success: true };
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { success: false, error: error.message };
    return { success: true };
  }, []);

  const logout = React.useCallback(async () => {
    if (import.meta.env.VITE_MOCK_MODE === '1') {
      setUser(null);
    } else {
      await supabase.auth.signOut();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export function RequireAuth(props: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return <div style={{ padding: '20px', color: '#e7eefc' }}>Initializing Secure Session...</div>;
  if (!user) return <Navigate to={PATHS.login} replace state={{ from: location.pathname }} />;
  return <>{props.children}</>;
}

export function useSignOutAndRedirect() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  return React.useCallback(async () => {
    await logout();
    navigate(PATHS.login, { replace: true });
  }, [navigate, logout]);
}
