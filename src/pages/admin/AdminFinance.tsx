// @ts-nocheck
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function AdminFinance() {
  const { t } = useLanguage();
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("Global Finance", "ကမ္ဘာလုံးဆိုင်ရာ ငွေကြေး")}</CardTitle>
        <CardDescription>{t("Revenue, COD, reconciliation, risk signals.", "ဝင်ငွေ/COD/ညှိနှိုင်းမှု/အန္တရာယ် သတိပေး။")}</CardDescription>
      </CardHeader>
      <CardContent className="text-xs font-mono text-slate-500">—</CardContent>
    </Card>
  );
}
