import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useI18n } from "../state/i18n";
import { useAuth, useSignOutAndRedirect } from "../state/auth";
import { ROUTE_ORDER, getMetaByPath } from "../routes/meta";
import { AppButton, cx, IconPill } from "./controls";
import { PATHS, type AppPath } from "../routes/paths";
import { ChevronDown, UserIcon } from "./icons";

function usePrevNext(pathname: string) {
  const idx = ROUTE_ORDER.findIndex((p) => p === (pathname as AppPath));
  return { 
    prev: idx > 0 ? ROUTE_ORDER[idx - 1] : null, 
    next: idx >= 0 && idx < ROUTE_ORDER.length - 1 ? ROUTE_ORDER[idx + 1] : null 
  };
}

export default function TopBar() {
  const { t, toggleLang } = useI18n();
  const { user } = useAuth();
  const signOutAndGo = useSignOutAndRedirect();
  const location = useLocation();
  const navigate = useNavigate();

  const { prev, next } = usePrevNext(location.pathname);
  const meta = getMetaByPath(location.pathname);
  const pageTitle = meta?.titleKey ? t(meta.titleKey) : "";

  const [menuOpen, setMenuOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  return (
    <header className="topbar">
      <div className="topbarLeft">
        <div className="topbarKicker">{t("authorizedSession")}</div>
        <div className="topbarTitle">{pageTitle}</div>
      </div>
      <div className="topbarCenter">
        <AppButton onClick={() => prev && navigate(prev)} disabled={!prev} className={cx("btnSmall", !prev && "btnDisabled")}>{t("previous")}</AppButton>
        <AppButton onClick={() => next && navigate(next)} disabled={!next} className={cx("btnSmall", !next && "btnDisabled")}>{t("next")}</AppButton>
      </div>
      <div className="topbarRight">
        <IconPill className="statusPill"><span className="statusLabel">{t("systemStatus")}</span><span className="statusOk">{t("allSystemsNominal")}</span></IconPill>
        <AppButton onClick={toggleLang} className="btnSmall btnGhost">{t("languageToggle")}</AppButton>
        <div className="accountWrap" ref={menuRef}>
          <button type="button" className="accountBtn" onClick={() => setMenuOpen(!menuOpen)}>
            <span className="avatar"><UserIcon /></span>
            <span className="accountName">{user?.name ?? "—"}</span>
            <span className="accountLabel">{t("account")}</span>
            <ChevronDown />
          </button>
          {menuOpen && (
            <div className="menu" role="menu">
              <button type="button" className="menuItem" onClick={() => (setMenuOpen(false), navigate(PATHS.accountControl))}>{t("manageAccount")}</button>
              <button type="button" className="menuItem" onClick={() => (setMenuOpen(false), navigate(PATHS.hrPortal))}>{t("viewProfile")}</button>
              <div className="menuSep" />
              <button type="button" className="menuItem danger" onClick={() => (setMenuOpen(false), signOutAndGo())}>{t("signOut")}</button>
            </div>
          )}
        </div>
        <AppButton onClick={signOutAndGo} className="btnSmall btnDanger">{t("signOut")}</AppButton>
      </div>
    </header>
  );
}
