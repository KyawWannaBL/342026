import { Link } from "react-router-dom";
import { PATHS } from "../routes/paths";
import { useI18n } from "../state/i18n";
export default function HRPortalPage() {
  const { t } = useI18n();
  return (
    <section className="page">
      <div className="card"><div className="cardTitle">{t("hrPortal")}</div><div className="muted">{t("hrPortalDesc")}</div><Link className="link" to={PATHS.commandCenter}>← {t("backToCommandCenter")}</Link></div>
    </section>
  );
}
