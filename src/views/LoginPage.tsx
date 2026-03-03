import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../state/auth";
import { useI18n } from "../state/i18n";
import { PATHS } from "../routes/paths";

export default function LoginPage() {
  const { login } = useAuth();
  const { t } = useI18n();
  const navigate = useNavigate();
  const location = useLocation() as unknown as { state?: { from?: string } };
  
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    const res = await login(email, password);
    if (res.success) {
      navigate(location.state?.from ?? PATHS.commandCenter, { replace: true });
    } else {
      setError(res.error || "Authentication failed. Please verify your credentials.");
      setIsLoading(false);
    }
  }

  return (
    <div className="loginWrap">
      <div className="loginCard">
        <div className="loginTitle">{t("loginTitle")}</div>
        <div className="muted">{t("loginDesc")}</div>
        
        {error && <div style={{ color: '#ff7878', marginTop: '14px', fontSize: '13px', fontWeight: 'bold' }}>{error}</div>}
        
        <form onSubmit={onSubmit} className="loginForm">
          <label className="label">
            <span className="labelText">{t("email") || "EMAIL"}</span>
            <input required type="email" placeholder="admin@britium.com" className="input" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLoading} />
          </label>
          <label className="label">
            <span className="labelText">{t("password") || "PASSWORD"}</span>
            <input required type="password" placeholder="••••••••" className="input" value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoading} />
          </label>
          <button type="submit" className="btn btnPrimary" disabled={isLoading}>
            {isLoading ? (t("loggingIn") || "Authenticating...") : t("signIn")}
          </button>
        </form>
      </div>
    </div>
  );
}
