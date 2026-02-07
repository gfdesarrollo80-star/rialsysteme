import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRouteByRole({ children, role }) {
  const { user, loading } = useAuth();

  if (loading) return <p>Cargando...</p>;

  if (!user) return <Navigate to="/login" />;

  if (user.rol_id !== role) {
    return <Navigate to="/dashboard" />;
  }

  return children;
}
