import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function DashboardLayout() {
  return (
    <div className="layout">
      {/* Sidebar fijo */}
      <Sidebar />

      {/* Contenido principal */}
      <div className="main" style={{ marginLeft: 260 }}>
        <Navbar />
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
