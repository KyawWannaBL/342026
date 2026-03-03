export const PATHS = {
  login: "/login",
  commandCenter: "/",
  accountApprovals: "/account-approvals",
  shipmentControl: "/shipment-control",
  fleetCommand: "/fleet-command",
  globalFinance: "/global-finance",
  liveTelemetry: "/live-telemetry",
  systemTariffs: "/system-tariffs",
  accountControl: "/account-control",
  hrPortal: "/hr-portal"
} as const;

export type AppPath = (typeof PATHS)[keyof typeof PATHS];
