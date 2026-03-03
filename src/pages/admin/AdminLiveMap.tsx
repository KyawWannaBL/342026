// @ts-nocheck
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function AdminLiveMap() {
  const { t } = useLanguage();
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("Live Telemetry", "တိုက်ရိုက် တယ်လီမထရီ")}</CardTitle>
        <CardDescription>{t("Tracking map and operational overlays.", "ခြေရာခံမြေပုံနှင့် လုပ်ငန်းဆိုင်ရာ overlay များ။")}</CardDescription>
      </CardHeader>
      <CardContent className="text-xs font-mono text-slate-500">
        {t("Next: wire to realtime telemetry tables (fleet, riders, shipments).", "နောက်တစ်ဆင့်: realtime telemetry tables (ယာဉ်/မောင်းသူ/ပစ္စည်း) ချိတ်ပါ။")}
      </CardContent>
    </Card>
  );
}
