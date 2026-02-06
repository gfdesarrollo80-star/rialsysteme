import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import AdminUsers from "./pages/AdminUsers";

import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedRouteByRole from "./components/ProtectedRouteByRole";
import DashboardLayout from "./layout/DashboardLayout";

export default function App() {
  return (
    <Routes>
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

        {/* ADMIN HOME */}
        <Route
          path="/admin"
          element={
            <ProtectedRouteByRole role={1}>
              <Admin />
            </ProtectedRouteByRole>
          }
        />

        {/* ADMIN - USUARIOS */}
        <Route
          path="/admin/users"
          element={
            <ProtectedRouteByRole role={1}>
              <AdminUsers />
            </ProtectedRouteByRole>
          }
        />
      </Route>
    </Routes>
  );
}
