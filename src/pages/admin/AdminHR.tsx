// @ts-nocheck
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function AdminHR() {
  const { t } = useLanguage();
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("HR Portal", "ဝန်ထမ်း ပေါ်တယ်")}</CardTitle>
        <CardDescription>{t("Employee records, shifts, assignments.", "ဝန်ထမ်းမှတ်တမ်း/shift/တာဝန်ခွဲဝေမှု။")}</CardDescription>
      </CardHeader>
      <CardContent className="text-xs font-mono text-slate-500">—</CardContent>
    </Card>
  );
}
