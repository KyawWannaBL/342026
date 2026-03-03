import * as React from "react";

export type Lang = "en" | "my";

type I18nContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  t: (key: string) => string;
};

const I18nContext = React.createContext<I18nContextValue | null>(null);
const STORAGE_KEY = "britium.lang";

const TRANSLATIONS: Record<Lang, Record<string, string>> = {
  en: {
    brand: "BRITIUM", level: "L5", authorizedSession: "AUTHORIZED USER • SESSION ACTIVE",
    systemStatus: "SYSTEM STATUS", allSystemsNominal: "● ALL SYSTEMS NOMINAL",
    languageToggle: "EN / MY", previous: "Previous", next: "Next", signOut: "Sign out",
    account: "Account", accountMenu: "Account menu", viewProfile: "View profile",
    manageAccount: "Manage account", executiveOverview: "Executive Overview",
    commandCenter: "COMMAND CENTER", accountApprovals: "ACCOUNT APPROVALS",
    shipmentControl: "SHIPMENT CONTROL", fleetCommand: "FLEET COMMAND",
    globalFinance: "GLOBAL FINANCE", liveTelemetry: "LIVE TELEMETRY",
    systemTariffs: "SYSTEM TARIFFS", quickActions: "QUICK ACTIONS",
    launchModule: "LAUNCH MODULE", liveAuditFeed: "LIVE AUDIT FEED",
    noAuditEvents: "No audit events found.", totalPersonnel: "TOTAL PERSONNEL",
    activeRiders: "ACTIVE RIDERS", securityEvents: "SECURITY EVENTS",
    rotationRequired: "ROTATION REQUIRED", accountControl: "Account Control",
    accountControlDesc: "Manage personnel clearances, roles, and system access levels.",
    hrPortal: "HR Portal", hrPortalDesc: "Review employee records, shifts, and departmental assignments.",
    notFound: "NOT FOUND", routeMissing: "ROUTE MISSING",
    backToCommandCenter: "Back to Command Center", loginTitle: "Sign in",
    loginDesc: "Enter your corporate credentials.", signIn: "Authenticate",
    email: "Email Address", password: "Password", loggingIn: "Authenticating..."
  },
  my: {
    brand: "BRITIUM", level: "L5", authorizedSession: "အတည်ပြုထားသော အသုံးပြုသူ • ဆက်ရှင် လှုပ်ရှားနေသည်",
    systemStatus: "စနစ် အခြေအနေ", allSystemsNominal: "● စနစ်အားလုံး ပုံမှန်",
    languageToggle: "EN / MY", previous: "ယခင်", next: "နောက်", signOut: "ထွက်ရန်",
    account: "အကောင့်", accountMenu: "အကောင့် မီနူး", viewProfile: "ပရိုဖိုင် ကြည့်ရန်",
    manageAccount: "အကောင့် စီမံရန်", executiveOverview: "အုပ်ချုပ်ရေး အနှစ်ချုပ်",
    commandCenter: "ဗဟိုထိန်းချုပ်မှု", accountApprovals: "အကောင့် အတည်ပြုမှုများ",
    shipmentControl: "ပို့ဆောင်မှု ထိန်းချုပ်မှု", fleetCommand: "ယာဉ် စီမံခန့်ခွဲမှု",
    globalFinance: "ကမ္ဘာလုံးဆိုင်ရာ ငွေကြေး", liveTelemetry: "တိုက်ရိုက် တယ်လီမထရီ",
    systemTariffs: "စနစ် အခွန်အကောက်", quickActions: "အမြန် လုပ်ဆောင်ချက်များ",
    launchModule: "မော်ဂျူး ဖွင့်ရန်", liveAuditFeed: "တိုက်ရိုက် စစ်ဆေးမှု စီးကြောင်း",
    noAuditEvents: "စစ်ဆေးမှု ဖြစ်ရပ် မတွေ့ပါ။", totalPersonnel: "စုစုပေါင်း ဝန်ထမ်း",
    activeRiders: "လှုပ်ရှားနေသူများ", securityEvents: "လုံခြုံရေး ဖြစ်ရပ်",
    rotationRequired: "လဲလှယ်ရန် လိုအပ်", accountControl: "အကောင့် ထိန်းချုပ်မှု",
    accountControlDesc: "အခွင့်အရေးများ၊ အခန်းကဏ္ဍများနှင့် စနစ်ဝင်ရောက်ခွင့်များကို စီမံရန်။",
    hrPortal: "လူမှုရေး/ဝန်ထမ်း ပေါ်တယ်", hrPortalDesc: "ဝန်ထမ်းမှတ်တမ်းများ၊ တာဝန်ချိန်များနှင့် ဌာနချထားမှုများကို စစ်ဆေးရန်။",
    notFound: "မတွေ့ပါ", routeMissing: "လမ်းကြောင်း မရှိ",
    backToCommandCenter: "ရုံးချုပ်သို့ ပြန်သွားရန်", loginTitle: "ဝင်ရောက်ရန်",
    loginDesc: "သင့်ကော်ပိုရိတ်အချက်အလက်များထည့်ပါ။", signIn: "ဝင်ရောက်ရန်",
    email: "အီးမေးလ်", password: "စကားဝှက်", loggingIn: "ဝင်ရောက်နေသည်..."
  }
};

export function I18nProvider(props: { children: React.ReactNode }) {
  const [lang, setLangState] = React.useState<Lang>(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw === "my" ? "my" : "en";
  });

  const setLang = React.useCallback((next: Lang) => {
    setLangState(next);
    localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const toggleLang = React.useCallback(() => {
    setLangState((prev) => {
        const next = prev === "en" ? "my" : "en";
        localStorage.setItem(STORAGE_KEY, next);
        return next;
    });
  }, []);

  const t = React.useCallback(
    (key: string) => TRANSLATIONS[lang][key] ?? TRANSLATIONS.en[key] ?? key,
    [lang]
  );

  return <I18nContext.Provider value={{ lang, setLang, toggleLang, t }}>{props.children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = React.useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
