import React, { Suspense, lazy } from "react";
import { RequireAuth } from "../state/auth";
import AppLayout from "../ui/AppLayout";
import { PATHS } from "./paths";

// Define lazy components OUTSIDE the routes array
const AdminDashboard = lazy(() => import("@/pages/AdminDashboard"));
const AccountControl = lazy(() => import("@/pages/AccountControl"));
const AccountingHome = lazy(() => import("@/pages/AccountingHome"));
const WayManagement = lazy(() => import("@/pages/WayManagement"));
const LoginPage = lazy(() => import("../views/LoginPage"));
const NotFoundPage = lazy(() => import("../views/NotFoundPage"));

const Loading = () => (
  <div style={{ display: 'flex', height: '100vh', width: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0B101B', color: '#0ea5e9', fontFamily: 'monospace' }}>
    [ INITIALIZING L5 SECURE MODULE... ]
  </div>
);

export const routes: any = [
  { 
    path: PATHS.login, 
    element: <Suspense fallback={<Loading />}><LoginPage /></Suspense> 
  },
  {
    path: PATHS.commandCenter,
    element: <RequireAuth><AppLayout /></RequireAuth>,
    children: [
      { index: true, element: <Suspense fallback={<Loading />}><AdminDashboard /></Suspense> },
      { path: "account-control", element: <Suspense fallback={<Loading />}><AccountControl /></Suspense> },
      { path: "global-finance", element: <Suspense fallback={<Loading />}><AccountingHome /></Suspense> },
      { path: "shipment-control", element: <Suspense fallback={<Loading />}><WayManagement /></Suspense> },
      { 
        path: "*", 
        element: <Suspense fallback={<Loading />}><NotFoundPage /></Suspense> 
      }
    ]
  }
];