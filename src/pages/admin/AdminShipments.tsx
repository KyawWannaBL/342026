// @ts-nocheck
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function AdminShipments() {
  const { t } = useLanguage();
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("Shipment Control", "ပို့ဆောင်မှု ထိန်းချုပ်မှု")}</CardTitle>
        <CardDescription>{t("Backlog, exceptions, dispatch planning.", "တင်နေသေးမှု/အရေးပေါ်/ဖြန့်ချိ စီမံကိန်း။")}</CardDescription>
      </CardHeader>
      <CardContent className="text-xs font-mono text-slate-500">—</CardContent>
    </Card>
  );
}
