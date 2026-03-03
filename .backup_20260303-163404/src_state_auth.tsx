import * as React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { PATHS } from "../routes/paths";

export type User = { id: string; name: string };

type AuthContextValue = {
  user: User | null;
  signIn: (name: string) => void;
  signOut: () => void;
};

const AuthContext = React.createContext<AuthContextValue | null>(null);
const STORAGE_KEY = "britium.user";

function safeParseUser(raw: string | null): User | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<User>;
    if (!parsed?.id || !parsed?.name) return null;
    return { id: String(parsed.id), name: String(parsed.name) };
  } catch {
    return null;
  }
}

export function AuthProvider(props: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(() => safeParseUser(localStorage.getItem(STORAGE_KEY)));

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

type LocationState = { from?: string };

export function RequireAuth(props: { children: React.ReactNode }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    const from = location.pathname + location.search + location.hash;
    return <Navigate to={PATHS.login} replace state={{ from } satisfies LocationState} />;
  }

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
