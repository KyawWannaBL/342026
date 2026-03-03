import { Link } from "react-router-dom";
import { PATHS } from "../routes/paths";
import { useI18n } from "../state/i18n";
export default function AccountControlPage() {
  const { t } = useI18n();
  return (
    <section className="page">
      <div className="card"><div className="cardTitle">{t("accountControl")}</div><div className="muted">{t("accountControlDesc")}</div><Link className="link" to={PATHS.commandCenter}>← {t("backToCommandCenter")}</Link></div>
    </section>
  );
}
