import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import AdminUsers from "./pages/AdminUsers";
import AdminUserCreate from "./pages/AdminUserCreate";
import AdminAudit from "./pages/AdminAudit";

import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedRouteByRole from "./components/ProtectedRouteByRole";
import DashboardLayout from "./layout/DashboardLayout";

export default function App() {
  return (
    <Routes>
      {/* 🔑 RUTA BASE */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* LOGIN */}
      <Route path="/login" element={<Login />} />

      {/* RUTAS PROTEGIDAS */}
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />

        <Route
          path="/admin"
          element={
            <ProtectedRouteByRole role={1}>
              <Admin />
            </ProtectedRouteByRole>
          }
        />

        <Route
          path="/admin/users"
          element={
            <ProtectedRouteByRole role={1}>
              <AdminUsers />
            </ProtectedRouteByRole>
          }
        />

        <Route
          path="/admin/users/create"
          element={
            <ProtectedRouteByRole role={1}>
              <AdminUserCreate />
            </ProtectedRouteByRole>
          }
        />

        {/* 🧾 ADMIN - AUDITORÍA */}
        <Route
          path="/admin/audit"
          element={
            <ProtectedRouteByRole role={1}>
              <AdminAudit />
            </ProtectedRouteByRole>
          }
        />
      </Route>
    </Routes>
  );
}
