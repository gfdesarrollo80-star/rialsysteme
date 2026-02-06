import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedRouteByRole from "./components/ProtectedRouteByRole";
import DashboardLayout from "./layout/DashboardLayout";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

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
            <ProtectedRouteByRole role="admin">
              <Admin />
            </ProtectedRouteByRole>
          }
        />
      </Route>
    </Routes>
  );
}
