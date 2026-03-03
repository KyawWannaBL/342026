import { Link } from "react-router-dom";
import { PATHS } from "../routes/paths";
import { useI18n } from "../state/i18n";
export default function NotFoundPage() {
  const { t } = useI18n();
  return (
    <section className="page">
      <div className="card"><div className="cardTitle">{t("notFound")}</div><div className="muted">{t("routeMissing")}</div><Link className="link" to={PATHS.commandCenter}>← {t("backToCommandCenter")}</Link></div>
    </section>
  );
}
