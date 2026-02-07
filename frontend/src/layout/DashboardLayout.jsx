import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function DashboardLayout() {
  return (
    <div className="layout">
      <div className="main">
        <Navbar />
        <div className="content">
          {/* 🔑 ESTO ES OBLIGATORIO */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}
