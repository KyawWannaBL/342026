import React, { createContext, useContext, useState, ReactNode } from 'react';
import { translations } from '../lib/translations';

const LanguageContext = createContext<any>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<'en' | 'my'>('en');
  const toggleLang = () => setLang(prev => (prev === 'en' ? 'my' : 'en'));
  const t = (key: string) => translations[lang][key as keyof typeof translations.en] || key;

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
