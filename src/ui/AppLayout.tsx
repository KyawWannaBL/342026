import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

export default function AppLayout() {
  return (
    <div className="app">
      <Sidebar />
      <div className="contentWrap">
        <TopBar />
        <main className="content" role="main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
