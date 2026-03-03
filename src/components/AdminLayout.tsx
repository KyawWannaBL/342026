// @ts-nocheck
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Globe, LayoutDashboard, Landmark, LogOut, Map, PackageSearch, Settings, ShieldCheck, Truck, UserCircle2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { lang, toggleLang } = useLanguage();
  const { user, displayName, role, logout, isMock } = useAuth();
  const t = (en: string, my: string) => (lang === "en" ? en : my);

  const routes = useMemo(() => [
    { id: "dash", path: "/admin/dashboard", icon: <LayoutDashboard />, navLabel: { en: "Executive Overview", my: "အနှစ်ချုပ်" }, title: { en: "COMMAND CENTER", my: "ရုံးချုပ်" } },
    { id: "approvals", path: "/admin/approvals", icon: <ShieldCheck />, navLabel: { en: "Account Approvals", my: "အကောင့်အတည်ပြုချက်များ" }, title: { en: "ACCOUNT APPROVALS", my: "အကောင့် အတည်ပြုမှုများ" } },
    { id: "accounts", path: "/admin/accounts", navLabel: { en: "Account Control", my: "အကောင့် ထိန်းချုပ်မှု" }, title: { en: "ACCOUNT CONTROL", my: "အကောင့် ထိန်းချုပ်မှု" } },
    { id: "hr", path: "/admin/hr", navLabel: { en: "HR Portal", my: "ဝန်ထမ်း ပေါ်တယ်" }, title: { en: "HR PORTAL", my: "ဝန်ထမ်း ပေါ်တယ်" } },
    { id: "ship", path: "/admin/shipments", icon: <PackageSearch />, navLabel: { en: "Shipment Control", my: "ပို့ဆောင်မှု ထိန်းချုပ်ရေး" }, title: { en: "SHIPMENT CONTROL", my: "ပို့ဆောင်မှု ထိန်းချုပ်မှု" } },
    { id: "fleet", path: "/admin/fleet", icon: <Truck />, navLabel: { en: "Fleet Command", my: "ယာဉ်တန်း ကွပ်ကဲမှု" }, title: { en: "FLEET COMMAND", my: "ယာဉ်တန်း ကွပ်ကဲမှု" } },
    { id: "fin", path: "/admin/omni-finance", icon: <Landmark />, navLabel: { en: "Global Finance", my: "ကမ္ဘာလုံးဆိုင်ရာ ဘဏ္ဍာရေး" }, title: { en: "GLOBAL FINANCE", my: "ကမ္ဘာလုံးဆိုင်ရာ ဘဏ္ဍာရေး" } },
    { id: "map", path: "/admin/live-map", icon: <Map />, navLabel: { en: "Live Telemetry", my: "တိုက်ရိုက် မြေပုံ" }, title: { en: "LIVE TELEMETRY", my: "တိုက်ရိုက် တယ်လီမထရီ" } },
    { id: "sets", path: "/admin/settings", icon: <Settings />, navLabel: { en: "System Tariffs", my: "စနစ် သတ်မှတ်ချက်များ" }, title: { en: "SYSTEM TARIFFS", my: "စနစ် အခွန်အကောက်" } },
  ], []);

  const sidebarItems = useMemo(() => routes.filter((r) => r.icon), [routes]);
  const orderedPaths = useMemo(() => routes.map((r) => r.path), [routes]);
  const currentIdx = orderedPaths.indexOf(location.pathname);
  const prevPath = currentIdx > 0 ? orderedPaths[currentIdx - 1] : null;
  const nextPath = currentIdx >= 0 && currentIdx < orderedPaths.length - 1 ? orderedPaths[currentIdx + 1] : null;

  const currentTitle = useMemo(() => {
    const hit = routes.find((r) => r.path === location.pathname);
    return hit ? t(hit.title.en, hit.title.my) : t("COMMAND CENTER", "ရုံးချုပ်");
  }, [location.pathname, routes, lang]);

  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) setAccountOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const doSignOut = async () => { await logout(); navigate("/login", { replace: true }); };

  return (
    <div className="flex h-screen bg-[#0B101B] overflow-hidden font-sans text-slate-300">
      <aside className="w-80 bg-[#05080F]/80 backdrop-blur-xl border-r border-white/5 flex flex-col p-8 z-20">
        <div className="mb-12 flex items-center gap-3">
          <div className="h-10 w-10 bg-emerald-500 rounded-xl flex items-center justify-center"><ShieldCheck className="text-white" /></div>
          <span className="text-xl font-black text-white uppercase">Britium <span className="text-emerald-500">L5</span></span>
        </div>
        <nav className="flex-1 space-y-2 overflow-y-auto pr-2">
          {sidebarItems.map((item) => (
            <button key={item.id} onClick={() => navigate(item.path)} className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all group ${location.pathname === item.path ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "text-slate-500 hover:bg-white/5 hover:text-white"}`}>
              <div className="flex items-center gap-4 text-sm font-bold"><span className={location.pathname === item.path ? "text-emerald-400" : "group-hover:text-emerald-500"}>{item.icon}</span>{t(item.navLabel.en, item.navLabel.my)}</div>
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 flex flex-col relative overflow-hidden">
        <header className="h-20 bg-[#05080F]/50 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-10 z-10">
          <div className="min-w-0">
            <div className="text-[10px] font-mono tracking-widest text-slate-500 uppercase">
              {t("AUTHORIZED USER • SESSION ACTIVE", "အတည်ပြုထားသော အသုံးပြုသူ • ဆက်ရှင် လှုပ်ရှားနေသည်")}
              {isMock ? `  •  ${t("MOCK MODE", "MOCK မုဒ်")}` : ""}
            </div>
            <div className="mt-1 text-white font-black tracking-[0.22em] text-sm sm:text-base truncate">{currentTitle}</div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => prevPath && navigate(prevPath)} disabled={!prevPath} className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold border transition-all ${prevPath ? "bg-white/5 hover:bg-white/10 border-white/10 text-white" : "bg-white/5 border-white/10 text-slate-600 cursor-not-allowed"}`}><ChevronLeft className="h-4 w-4 text-emerald-500" /> {t("Previous", "ယခင်")}</button>
            <button onClick={() => nextPath && navigate(nextPath)} disabled={!nextPath} className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold border transition-all ${nextPath ? "bg-white/5 hover:bg-white/10 border-white/10 text-white" : "bg-white/5 border-white/10 text-slate-600 cursor-not-allowed"}`}>{t("Next", "နောက်")} <ChevronRight className="h-4 w-4 text-emerald-500" /></button>
            <button onClick={toggleLang} className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold text-white transition-all"><Globe className="h-4 w-4 text-emerald-500" /> {lang === "en" ? "EN / MY" : "မြန်မာ / EN"}</button>
            
            <div className="relative" ref={accountRef}>
              <button onClick={() => setAccountOpen(!accountOpen)} className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold text-white transition-all">
                <UserCircle2 className="h-4 w-4 text-emerald-500" />
                <span className="max-w-[180px] truncate">{displayName ?? user?.email ?? "—"}</span>
                {role && <span className="ml-1 text-[10px] text-slate-400">{String(role).toUpperCase()}</span>}
              </button>
              {accountOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-white/10 bg-[#05080F]/95 backdrop-blur-xl shadow-2xl overflow-hidden">
                  <button onClick={() => (setAccountOpen(false), navigate("/admin/accounts"))} className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm text-slate-200 hover:bg-white/5"><ShieldCheck className="h-4 w-4 text-emerald-500" /> {t("Account Control", "အကောင့် ထိန်းချုပ်မှု")}</button>
                  <button onClick={() => (setAccountOpen(false), navigate("/admin/hr"))} className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm text-slate-200 hover:bg-white/5"><Map className="h-4 w-4 text-purple-400" /> {t("HR Portal", "ဝန်ထမ်း ပေါ်တယ်")}</button>
                  <div className="h-px bg-white/10" />
                  <button onClick={() => (setAccountOpen(false), void doSignOut())} className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm text-rose-300 hover:bg-rose-500/10"><LogOut className="h-4 w-4" /> {t("Sign out", "ထွက်ရန်")}</button>
                </div>
              )}
            </div>
            <button onClick={() => void doSignOut()} className="flex items-center gap-2 px-4 py-2 bg-rose-500/10 hover:bg-rose-500/15 border border-rose-500/20 rounded-xl text-xs font-bold text-rose-200 transition-all"><LogOut className="h-4 w-4" /> {t("Sign out", "ထွက်ရန်")}</button>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-10"><Outlet /></div>
      </main>
    </div>
  );
}
