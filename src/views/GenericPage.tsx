import { Link } from "react-router-dom";
import { PATHS } from "../routes/paths";
import { useI18n } from "../state/i18n";
export default function GenericPage({ titleKey }: { titleKey: string }) {
  const { t } = useI18n();
  return (
    <section className="page">
      <div className="card">
        <div className="cardTitle">{t(titleKey)}</div>
        <div className="muted">Dashboard metrics and controls will mount here.</div>
        <Link className="link" to={PATHS.commandCenter}>← {t("backToCommandCenter")}</Link>
      </div>
    </section>
  );
}
