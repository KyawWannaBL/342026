// @ts-nocheck
import React from "react";
import { LanguageProvider as CoreLanguageProvider, useLanguage } from "@/contexts/LanguageContext";

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <CoreLanguageProvider>{children}</CoreLanguageProvider>;
};

export const useLanguageContext = () => {
  const { lang, toggleLang, t } = useLanguage();
  const setLanguage = (next: "en" | "my") => {
    if (next !== lang) toggleLang();
  };
  return { language: lang, setLanguage, t };
};
