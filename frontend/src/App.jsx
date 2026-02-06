import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";

import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedRouteByRole from "./components/ProtectedRouteByRole";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRouteByRole allowedRoles={[1]}>
              <Admin />
            </ProtectedRouteByRole>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
