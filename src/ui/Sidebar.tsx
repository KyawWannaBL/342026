import { NavLink } from "react-router-dom";
import { PATHS } from "../routes/paths";
import { useI18n } from "../state/i18n";
import { cx } from "./controls";

const NAV_ITEMS = [
  { key: "executiveOverview", to: PATHS.commandCenter },
  { key: "accountApprovals", to: PATHS.accountApprovals },
  { key: "shipmentControl", to: PATHS.shipmentControl },
  { key: "fleetCommand", to: PATHS.fleetCommand },
  { key: "globalFinance", to: PATHS.globalFinance },
  { key: "liveTelemetry", to: PATHS.liveTelemetry },
  { key: "systemTariffs", to: PATHS.systemTariffs }
] as const;

export default function Sidebar() {
  const { t } = useI18n();

  return (
    <aside className="sidebar" aria-label="Primary Navigation">
      <div className="brand">
        <div className="brandBadge" aria-hidden="true" />
        <div className="brandTitle">
          <div className="brandName">{t("brand")}</div>
          <div className="brandLvl">{t("level")}</div>
        </div>
      </div>
      <nav className="nav">
        {NAV_ITEMS.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.to === PATHS.commandCenter} className={({ isActive }) => cx("navItem", isActive && "navItemActive")}>
            <span className="navDot" aria-hidden="true" />
            <span>{t(item.key)}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
