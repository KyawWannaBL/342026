import React, { createContext, useContext, useEffect, useState } from "react";

type Language = "en" | "my";
type Ctx = { lang: Language; setLanguage: (l: Language) => void; t: (en: string, my: string) => string; };

const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("btx_lang") as Language;
    if (saved === "en" || saved === "my") setLang(saved);
  }, []);

  const setLanguage = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem("btx_lang", newLang);
  };

  const t = (en: string, my: string) => (lang === "en" ? en : my);

  return <LanguageContext.Provider value={{ lang, setLanguage, t }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const v = useContext(LanguageContext);
  if (!v) throw new Error("useLanguage must be used within LanguageProvider");
  return v;
}
