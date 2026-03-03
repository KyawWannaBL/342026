// @ts-nocheck
import React from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, ShieldCheck, PackageSearch, Truck, Landmark, Map, Settings, Users } from "lucide-react";

type Portal = {
  id: string;
  title: string;
  desc: string;
  to: string;
  icon: React.ReactNode;
};

export default function SuperAdminDashboard() {
  const nav = useNavigate();
  const { t } = useLanguage();

  const portals: Portal[] = [
    { id: "approvals", icon: <ShieldCheck className="text-emerald-400" />, title: t("Account Approvals", "အကောင့် အတည်ပြုမှုများ"), desc: t("Approve/reject access requests.", "ဝင်ရောက်ခွင့်တောင်းဆိုမှုကို အတည်ပြု/ပယ်ချပါ။"), to: "/admin/approvals" },
    { id: "accounts", icon: <Users className="text-blue-400" />, title: t("Account Control", "အကောင့် ထိန်းချုပ်မှု"), desc: t("Roles, clearances, rotation.", "ရာထူး/ခွင့်ပြုချက်/စကားဝှက်ပြောင်းရန်။"), to: "/admin/accounts" },
    { id: "shipments", icon: <PackageSearch className="text-blue-400" />, title: t("Shipment Control", "ပို့ဆောင်မှု ထိန်းချုပ်မှု"), desc: t("Backlog, exceptions, dispatch.", "တင်နေသေးမှု/အရေးပေါ်/ဖြန့်ချိ။"), to: "/admin/shipments" },
    { id: "fleet", icon: <Truck className="text-amber-400" />, title: t("Fleet Command", "ယာဉ်တပ် စီမံခန့်ခွဲမှု"), desc: t("Vehicles, maintenance, readiness.", "ယာဉ်/ပြင်ဆင်/အသင့်ဖြစ်မှု။"), to: "/admin/fleet" },
    { id: "finance", icon: <Landmark className="text-emerald-400" />, title: t("Global Finance", "ကမ္ဘာလုံးဆိုင်ရာ ငွေကြေး"), desc: t("Revenue, COD, reconciliation.", "ဝင်ငွေ/COD/ညှိနှိုင်းမှု။"), to: "/admin/omni-finance" },
    { id: "live-map", icon: <Map className="text-emerald-400" />, title: t("Live Telemetry", "တိုက်ရိုက် တယ်လီမထရီ"), desc: t("Tracking map, signals, alerts.", "ခြေရာခံမြေပုံ/သတိပေး/စနစ်။"), to: "/admin/live-map" },
    { id: "settings", icon: <Settings className="text-slate-300" />, title: t("System Tariffs", "စနစ် အခွန်အကောက်"), desc: t("Rates and configuration.", "နှုန်းထားနှင့် သတ်မှတ်ချက်များ။"), to: "/admin/settings" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs font-mono text-slate-500 uppercase tracking-widest">
          {t("Authorized user • Session active", "အတည်ပြုထားသော အသုံးပြုသူ • ဆက်ရှင် လှုပ်ရှားနေသည်")}
        </div>
        <div className="mt-2 text-3xl font-black text-white tracking-widest uppercase">
          {t("Command Center", "အမိန့်ဗဟို")}
        </div>
        <div className="mt-2 text-xs font-mono text-slate-500">
          {t("Unified Super-Admin dashboard for operations, finance, security, and portals.", "လုပ်ငန်း/ငွေကြေး/လုံခြုံရေးနှင့် ပေါ်တယ်များကို တစ်နေရာတည်းမှ ထိန်းချုပ်ရန်။")}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <Kpi title={t("Personnel", "ဝန်ထမ်း")} value="—" icon={<Users size={18} />} />
        <Kpi title={t("Shipments", "ပို့ဆောင်မှု")} value="—" icon={<PackageSearch size={18} />} />
        <Kpi title={t("Finance", "ငွေကြေး")} value="—" icon={<Landmark size={18} />} />
        <Kpi title={t("Status", "အခြေအနေ")} value={t("NOMINAL", "ပုံမှန်")} icon={<LayoutDashboard size={18} />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {portals.map((p) => (
          <Card key={p.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5">{p.icon}</div>
                <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">{t("ENTER", "ဝင်ရန်")}</div>
              </div>
              <CardTitle className="mt-4">{p.title}</CardTitle>
              <CardDescription className="mt-2">{p.desc}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button data-testid={`portal-${p.id}`} onClick={() => nav(p.to)} className="w-full">
                {t("Launch Module", "မော်ဂျူး ဖွင့်ရန်")}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Kpi(props: { title: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="p-6 rounded-2xl bg-[#0B101B] border border-white/5">
      <div className="p-3 rounded-xl bg-white/5 border border-white/5 w-fit text-emerald-300">{props.icon}</div>
      <div className="mt-4 text-3xl font-black text-white">{props.value}</div>
      <div className="mt-1 text-[10px] font-mono uppercase tracking-widest text-slate-500">{props.title}</div>
    </div>
  );
}
