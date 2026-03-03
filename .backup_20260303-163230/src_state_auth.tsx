import * as React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { PATHS } from "../routes/paths";

export type User = { id: string; name: string; };
type AuthContextValue = { user: User | null; signIn: (name: string) => void; signOut: () => void; };

const AuthContext = React.createContext<AuthContextValue | null>(null);
const STORAGE_KEY = "britium.user";

export function AuthProvider(props: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { id: "u_1", name: "Aung Min" };
    try {
      const parsed = JSON.parse(raw) as User;
      return parsed?.id && parsed?.name ? parsed : { id: "u_1", name: "Aung Min" };
    } catch { return { id: "u_1", name: "Aung Min" }; }
  });

  const signIn = React.useCallback((name: string) => {
    const next = { id: "u_1", name: name.trim() || "Aung Min" };
    setUser(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }, []);

  const signOut = React.useCallback(() => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return <AuthContext.Provider value={{ user, signIn, signOut }}>{props.children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export function RequireAuth(props: { children: React.ReactNode }) {
  const { user } = useAuth();
  const location = useLocation();
  if (!user) return <Navigate to={PATHS.login} replace state={{ from: location.pathname }} />;
  return <>{props.children}</>;
}

export function useSignOutAndRedirect() {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  return React.useCallback(() => {
    signOut();
    navigate(PATHS.login, { replace: true });
  }, [navigate, signOut]);
}
