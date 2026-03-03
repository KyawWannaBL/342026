// @ts-nocheck
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function AdminSettings() {
  const { t } = useLanguage();
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("System Tariffs", "စနစ် အခွန်အကောက်")}</CardTitle>
        <CardDescription>{t("Rates, zones, surcharges.", "နှုန်းထား/ဇုန်/အပိုကြေး။")}</CardDescription>
      </CardHeader>
      <CardContent className="text-xs font-mono text-slate-500">—</CardContent>
    </Card>
  );
}
