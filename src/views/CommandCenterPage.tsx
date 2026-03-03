import * as React from "react";
import { Link } from "react-router-dom";
import { PATHS } from "../routes/paths";
import { useI18n } from "../state/i18n";

function Stat({ value, label }: { value: string | number; label: string }) {
  return <div className="stat"><div className="statValue">{value}</div><div className="statLabel">{label}</div></div>;
}

function ActionCard({ title, desc, to, cta }: { title: string; desc: string; to: string; cta: string }) {
  return (
    <Link to={to} className="card cardLink">
      <div className="cardTitle">{title}</div><div className="cardDesc">{desc}</div><div className="cardCta">{cta} →</div>
    </Link>
  );
}

export default function CommandCenterPage() {
  const { t } = useI18n();
  const [stats, setStats] = React.useState({ 
    personnel: "-" as string | number, 
    activeRiders: "-" as string | number, 
    securityEvents: "-" as string | number, 
    rotationRequired: "-" as string | number 
  });
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    let isMounted = true;
    async function fetchDashboardStats() {
      try {
        await new Promise(resolve => setTimeout(resolve, 600));
        if (isMounted) {
          setStats({ personnel: 1, activeRiders: 0, securityEvents: 0, rotationRequired: 0 });
        }
      } catch (err) {
        console.error("Failed to load dashboard stats", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    fetchDashboardStats();
    return () => { isMounted = false; };
  }, []);

  return (
    <section className="page">
      <div className="gridStats" style={{ opacity: isLoading ? 0.6 : 1, transition: 'opacity 0.3s' }}>
        <Stat value={stats.personnel} label={t("totalPersonnel")} />
        <Stat value={stats.activeRiders} label={t("activeRiders")} />
        <Stat value={stats.securityEvents} label={t("securityEvents")} />
        <Stat value={stats.rotationRequired} label={t("rotationRequired")} />
      </div>
      <div className="sectionTitle">{t("quickActions")}</div>
      <div className="grid2">
        <ActionCard title={t("accountControl")} desc={t("accountControlDesc")} to={PATHS.accountControl} cta={t("launchModule")} />
        <ActionCard title={t("hrPortal")} desc={t("hrPortalDesc")} to={PATHS.hrPortal} cta={t("launchModule")} />
      </div>
      <div className="sectionTitle">{t("liveAuditFeed")}</div>
      <div className="card"><div className="muted">{t("noAuditEvents")}</div></div>
    </section>
  );
}
