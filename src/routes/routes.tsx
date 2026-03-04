import React, { Suspense, lazy } from "react";
import { RequireAuth } from "../state/auth";
import AppLayout from "../ui/AppLayout";

// Standard views
const Login = lazy(() => import("../views/auth/Login"));
const AdminDashboard = lazy(() => import("@/pages/AdminDashboard"));
const AccountControl = lazy(() => import("@/pages/AccountControl"));
const AccountingHome = lazy(() => import("@/pages/AccountingHome"));
const WayManagement = lazy(() => import("@/pages/WayManagement"));

const Loading = () => (
  <div className="min-h-screen bg-[#05080F] flex items-center justify-center text-emerald-500 font-mono tracking-widest uppercase">
    [ INITIALIZING L5 SECURE MODULE... ]
  </div>
);

export const routes: any = [
  { path: "/login", element: <Suspense fallback={<Loading />}><Login /></Suspense> },
  {
    path: "/",
    element: <RequireAuth><AppLayout /></RequireAuth>,
    children: [
      { index: true, element: <Suspense fallback={<Loading />}><AdminDashboard /></Suspense> },
      { path: "account-control", element: <Suspense fallback={<Loading />}><AccountControl /></Suspense> },
      { path: "global-finance", element: <Suspense fallback={<Loading />}><AccountingHome /></Suspense> },
      { path: "shipment-control", element: <Suspense fallback={<Loading />}><WayManagement /></Suspense> },
      { path: "*", element: <Navigate to="/" replace /> }
    ]
  }
];
