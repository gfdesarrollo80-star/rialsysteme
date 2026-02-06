import { Navigate } from "react-router-dom";

export default function ProtectedRouteByRole({ children, allowedRoles }) {
  const token = localStorage.getItem("token");
  const rol = Number(localStorage.getItem("rol"));

  // Si no hay token → login
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Si el rol NO está permitido → dashboard
  if (!allowedRoles.includes(rol)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
