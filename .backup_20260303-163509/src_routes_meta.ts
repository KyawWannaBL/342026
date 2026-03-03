import { PATHS, type AppPath } from "./paths";

export type RouteMeta = {
  path: AppPath;
  titleKey: string;
  navKey?: string;
};

export const ROUTE_META: RouteMeta[] = [
  { path: PATHS.commandCenter, titleKey: "commandCenter", navKey: "executiveOverview" },
  { path: PATHS.accountApprovals, titleKey: "accountApprovals", navKey: "accountApprovals" },
  { path: PATHS.shipmentControl, titleKey: "shipmentControl", navKey: "shipmentControl" },
  { path: PATHS.fleetCommand, titleKey: "fleetCommand", navKey: "fleetCommand" },
  { path: PATHS.globalFinance, titleKey: "globalFinance", navKey: "globalFinance" },
  { path: PATHS.liveTelemetry, titleKey: "liveTelemetry", navKey: "liveTelemetry" },
  { path: PATHS.systemTariffs, titleKey: "systemTariffs", navKey: "systemTariffs" },
  { path: PATHS.accountControl, titleKey: "accountControl" },
  { path: PATHS.hrPortal, titleKey: "hrPortal" }
];

export const ROUTE_ORDER: AppPath[] = ROUTE_META.map((m) => m.path);

export function getMetaByPath(pathname: string): RouteMeta | undefined {
  const normalized = pathname === "" ? "/" : pathname;
  return ROUTE_META.find((m) => m.path === (normalized as AppPath));
}
